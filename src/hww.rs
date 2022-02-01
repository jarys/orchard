//! Functionalities for hardware wallets.

use ff::Field;
use pasta_curves::pallas;
use rand::RngCore;

use crate::{
    address::Address,
    bundle::Authorization,
    keys::{FullViewingKey, OutgoingViewingKey, Scope, SpendValidatingKey, SpendingKey},
    note::{self, Note, TransmittedNoteCiphertext},
    note_encryption::OrchardNoteEncryption,
    value::{NoteValue, ValueCommitTrapdoor, ValueCommitment},
    Action,
};

/// Serializes a note
pub fn serialize_note(note: Note) -> [u8; 115] {
    let mut result = [0u8; 115];
    result[0..43].clone_from_slice(&note.recipient().to_raw_address_bytes()[..]);
    result[43..51].copy_from_slice(&note.value().to_bytes());
    result[51..83].copy_from_slice(&note.rho().to_bytes());
    result[83..115].copy_from_slice(note.rseed().as_bytes());
    result
}

// TODO: tohle je taaaak zprasené !!! :/
/// Deserializes a note
pub fn deserialize_note(bytes: [u8; 115]) -> Option<Note> {
    let mut recipient = [0u8; 43];
    recipient.copy_from_slice(&bytes[0..43]);
    let recipient = Option::from(Address::from_raw_address_bytes(&recipient))?;
    let mut value = [0u8; 8];
    value.copy_from_slice(&bytes[43..51]);
    let value = NoteValue::from_bytes(value);
    let mut rho = [0u8; 32];
    rho.copy_from_slice(&bytes[51..83]);
    let rho = Option::from(note::Nullifier::from_bytes(&rho))?;
    let mut rseed = [0u8; 32];
    rseed.copy_from_slice(&bytes[83..115]);
    let rseed = Option::from(note::RandomSeed::from_bytes(rseed, &rho))?;

    Some(Note::from_parts(recipient, value, rho, rseed))
}

/// Information about a specific note to be spent in an [`Action`].
#[derive(Debug)]
struct SpendInfo {
    dummy_sk: Option<SpendingKey>,
    fvk: FullViewingKey,
    note: Note,
}

impl SpendInfo {
    /// Defined in [Zcash Protocol Spec § 4.8.3: Dummy Notes (Orchard)][orcharddummynotes].
    ///
    /// [orcharddummynotes]: https://zips.z.cash/protocol/nu5.pdf#orcharddummynotes
    fn dummy(rng: &mut impl RngCore) -> Self {
        let (sk, fvk, note) = Note::dummy(rng, None);

        SpendInfo {
            dummy_sk: Some(sk),
            fvk,
            note,
        }
    }
}

/// Information about a specific recipient to receive funds in an [`Action`].
#[derive(Debug)]
struct RecipientInfo {
    ovk: Option<OutgoingViewingKey>,
    recipient: Address,
    value: NoteValue,
    memo: Option<[u8; 512]>,
}

impl RecipientInfo {
    /// Defined in [Zcash Protocol Spec § 4.8.3: Dummy Notes (Orchard)][orcharddummynotes].
    ///
    /// [orcharddummynotes]: https://zips.z.cash/protocol/nu5.pdf#orcharddummynotes
    fn dummy(rng: &mut impl RngCore) -> Self {
        let fvk: FullViewingKey = (&SpendingKey::random(rng)).into();
        let recipient = fvk.address_at(0u64, Scope::External);

        RecipientInfo {
            ovk: None,
            recipient,
            value: NoteValue::zero(),
            memo: None,
        }
    }
}

/// The parts needed to sign an [`Action`].
#[derive(Debug)]
pub struct SigningMetadata {
    /// The spend validating key for this action. Used to match spend authorizing keys to
    /// actions they can create signatures for.
    pub ak: SpendValidatingKey,
    /// The randomization needed to derive the actual signing key for this note.
    pub alpha: pallas::Scalar,
}

impl Authorization for SigningMetadata {
    type SpendAuth = Self;
}

/// Shields an Action
pub fn shield(
    spend: Option<(FullViewingKey, Note)>,
    output: Option<(
        Option<OutgoingViewingKey>,
        Address,
        NoteValue,
        Option<[u8; 512]>,
    )>,
    mut rng: impl RngCore,
) -> Action<SigningMetadata> {
    let rcv = ValueCommitTrapdoor::random(&mut rng);
    let spend = match spend {
        Some((fvk, note)) => SpendInfo {
            dummy_sk: None,
            fvk,
            note,
        },
        None => SpendInfo::dummy(&mut rng),
    };
    let output = match output {
        Some((ovk, recipient, value, memo)) => RecipientInfo {
            ovk,
            recipient,
            value,
            memo,
        },
        None => RecipientInfo::dummy(&mut rng),
    };
    let v_net = spend.note.value() - output.value;
    let cv_net = ValueCommitment::derive(v_net, rcv.clone());

    let nf_old = spend.note.nullifier(&spend.fvk);
    let ak: SpendValidatingKey = spend.fvk.clone().into();
    let alpha = pallas::Scalar::random(&mut rng);
    let rk = ak.randomize(&alpha);

    let note = Note::new(output.recipient, output.value, nf_old, &mut rng);
    let cm_new = note.commitment();
    let cmx = cm_new.into();

    let encryptor = OrchardNoteEncryption::new(
        output.ovk,
        note,
        output.recipient,
        output.memo.unwrap_or_else(|| {
            let mut memo = [0; 512];
            memo[0] = 0xf6;
            memo
        }),
    );

    let encrypted_note = TransmittedNoteCiphertext {
        epk_bytes: encryptor.epk().to_bytes().0,
        enc_ciphertext: encryptor.encrypt_note_plaintext(),
        out_ciphertext: encryptor.encrypt_outgoing_plaintext(&cv_net, &cmx, &mut rng),
    };

    Action::from_parts(
        nf_old,
        rk,
        cmx,
        encrypted_note,
        cv_net,
        SigningMetadata { ak, alpha },
    )
}

/// get dummy merkle path
pub fn get_dummy_merkle_path(mut rng: &mut impl RngCore) -> crate::tree::MerklePath {
    crate::tree::MerklePath::dummy(&mut rng)
}
