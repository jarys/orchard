//! Data structures used for note construction.
use core::fmt;

use group::GroupEncoding;
use pasta_curves::pallas;
use rand::RngCore;
use std::convert::TryInto;
use subtle::CtOption;

use crate::{
    keys::{EphemeralSecretKey, FullViewingKey, Scope, SpendingKey},
    spec::{to_base, to_scalar, NonZeroPallasScalar, PrfExpand},
    value::NoteValue,
    Address,
};

pub(crate) mod commitment;
pub use self::commitment::{ExtractedNoteCommitment, NoteCommitment};

pub(crate) mod nullifier;
pub use self::nullifier::Nullifier;

/// The ZIP 212 seed randomness for a note.
#[derive(Copy, Clone, Debug)]
pub(crate) struct RandomSeed([u8; 32]);

impl RandomSeed {
    pub(crate) fn random(rng: &mut impl RngCore, rho: &Nullifier) -> Self {
        loop {
            let mut bytes = [0; 32];
            rng.fill_bytes(&mut bytes);
            let rseed = RandomSeed::from_bytes(bytes, rho);
            if rseed.is_some().into() {
                break rseed.unwrap();
            }
        }
    }

    pub(crate) fn from_bytes(rseed: [u8; 32], rho: &Nullifier) -> CtOption<Self> {
        let rseed = RandomSeed(rseed);
        let esk = rseed.esk_inner(rho);
        CtOption::new(rseed, esk.is_some())
    }

    pub(crate) fn as_bytes(&self) -> &[u8; 32] {
        &self.0
    }

    /// Defined in [Zcash Protocol Spec § 4.7.3: Sending Notes (Orchard)][orchardsend].
    ///
    /// [orchardsend]: https://zips.z.cash/protocol/nu5.pdf#orchardsend
    pub(crate) fn psi(&self, rho: &Nullifier) -> pallas::Base {
        to_base(PrfExpand::Psi.with_ad(&self.0, &rho.to_bytes()[..]))
    }

    /// Defined in [Zcash Protocol Spec § 4.7.3: Sending Notes (Orchard)][orchardsend].
    ///
    /// [orchardsend]: https://zips.z.cash/protocol/nu5.pdf#orchardsend
    fn esk_inner(&self, rho: &Nullifier) -> CtOption<NonZeroPallasScalar> {
        NonZeroPallasScalar::from_scalar(to_scalar(
            PrfExpand::Esk.with_ad(&self.0, &rho.to_bytes()[..]),
        ))
    }

    /// Defined in [Zcash Protocol Spec § 4.7.3: Sending Notes (Orchard)][orchardsend].
    ///
    /// [orchardsend]: https://zips.z.cash/protocol/nu5.pdf#orchardsend
    fn esk(&self, rho: &Nullifier) -> NonZeroPallasScalar {
        // We can't construct a RandomSeed for which this unwrap fails.
        self.esk_inner(rho).unwrap()
    }

    /// Defined in [Zcash Protocol Spec § 4.7.3: Sending Notes (Orchard)][orchardsend].
    ///
    /// [orchardsend]: https://zips.z.cash/protocol/nu5.pdf#orchardsend
    pub(crate) fn rcm(&self, rho: &Nullifier) -> commitment::NoteCommitTrapdoor {
        commitment::NoteCommitTrapdoor(to_scalar(
            PrfExpand::Rcm.with_ad(&self.0, &rho.to_bytes()[..]),
        ))
    }
}

/// A discrete amount of funds received by an address.
#[derive(Debug, Copy, Clone)]
pub struct Note {
    /// The recipient of the funds.
    recipient: Address,
    /// The value of this note.
    value: NoteValue,
    /// A unique creation ID for this note.
    ///
    /// This is set to the nullifier of the note that was spent in the [`Action`] that
    /// created this note.
    ///
    /// [`Action`]: crate::action::Action
    rho: Nullifier,
    /// The seed randomness for various note components.
    rseed: RandomSeed,
}

impl PartialEq for Note {
    fn eq(&self, other: &Self) -> bool {
        // Notes are canonically defined by their commitments.
        ExtractedNoteCommitment::from(self.commitment())
            .eq(&ExtractedNoteCommitment::from(other.commitment()))
    }
}

impl Eq for Note {}

impl Note {
    pub(crate) fn from_parts(
        recipient: Address,
        value: NoteValue,
        rho: Nullifier,
        rseed: RandomSeed,
    ) -> Self {
        Note {
            recipient,
            value,
            rho,
            rseed,
        }
    }

    /// Generates a new note.
    ///
    /// Defined in [Zcash Protocol Spec § 4.7.3: Sending Notes (Orchard)][orchardsend].
    ///
    /// [orchardsend]: https://zips.z.cash/protocol/nu5.pdf#orchardsend
    pub fn new(
        recipient: Address,
        value: NoteValue,
        rho: Nullifier,
        mut rng: impl RngCore,
    ) -> Self {
        loop {
            let note = Note {
                recipient,
                value,
                rho,
                rseed: RandomSeed::random(&mut rng, &rho),
            };
            if note.commitment_inner().is_some().into() {
                break note;
            }
        }
    }

    /// Generates a dummy spent note.
    ///
    /// Defined in [Zcash Protocol Spec § 4.8.3: Dummy Notes (Orchard)][orcharddummynotes].
    ///
    /// [orcharddummynotes]: https://zips.z.cash/protocol/nu5.pdf#orcharddummynotes
    pub(crate) fn dummy(
        rng: &mut impl RngCore,
        rho: Option<Nullifier>,
    ) -> (SpendingKey, FullViewingKey, Self) {
        let sk = SpendingKey::random(rng);
        let fvk: FullViewingKey = (&sk).into();
        let recipient = fvk.address_at(0u32, Scope::External);

        let note = Note::new(
            recipient,
            NoteValue::zero(),
            rho.unwrap_or_else(|| Nullifier::dummy(rng)),
            rng,
        );

        (sk, fvk, note)
    }

    /// Returns the recipient of this note.
    pub fn recipient(&self) -> Address {
        self.recipient
    }

    /// Returns the value of this note.
    pub fn value(&self) -> NoteValue {
        self.value
    }

    /// Returns the rseed value of this note.
    pub(crate) fn rseed(&self) -> &RandomSeed {
        &self.rseed
    }

    /// Derives the ephemeral secret key for this note.
    pub(crate) fn esk(&self) -> EphemeralSecretKey {
        EphemeralSecretKey(self.rseed.esk(&self.rho))
    }

    /// Returns rho of this note.
    pub fn rho(&self) -> Nullifier {
        self.rho
    }

    /// Derives the commitment to this note.
    ///
    /// Defined in [Zcash Protocol Spec § 3.2: Notes][notes].
    ///
    /// [notes]: https://zips.z.cash/protocol/nu5.pdf#notes
    pub fn commitment(&self) -> NoteCommitment {
        // `Note` will always have a note commitment by construction.
        self.commitment_inner().unwrap()
    }

    /// Derives the commitment to this note.
    ///
    /// This is the internal fallible API, used to check at construction time that the
    /// note has a commitment. Once you have a [`Note`] object, use `note.commitment()`
    /// instead.
    ///
    /// Defined in [Zcash Protocol Spec § 3.2: Notes][notes].
    ///
    /// [notes]: https://zips.z.cash/protocol/nu5.pdf#notes
    fn commitment_inner(&self) -> CtOption<NoteCommitment> {
        let g_d = self.recipient.g_d();

        NoteCommitment::derive(
            g_d.to_bytes(),
            self.recipient.pk_d().to_bytes(),
            self.value,
            self.rho.0,
            self.rseed.psi(&self.rho),
            self.rseed.rcm(&self.rho),
        )
    }

    /// Derives the nullifier for this note.
    pub fn nullifier(&self, fvk: &FullViewingKey) -> Nullifier {
        Nullifier::derive(
            fvk.nk(),
            self.rho.0,
            self.rseed.psi(&self.rho),
            self.commitment(),
        )
    }

    /// Serializes a note
    pub fn to_bytes(&self) -> [u8; 115] {
        let mut result = [0u8; 115];
        result[0..43].clone_from_slice(&self.recipient().to_raw_address_bytes()[..]);
        result[43..51].copy_from_slice(&self.value().to_bytes());
        result[51..83].copy_from_slice(&self.rho().to_bytes());
        result[83..115].copy_from_slice(self.rseed().as_bytes());
        result
    }

    /// Deserializes a note
    pub fn from_bytes(bytes: [u8; 115]) -> Option<Self> {
        let recipient: [u8; 43] = (&bytes[0..43]).try_into().ok()?;
        let value: [u8; 8] = (&bytes[43..51]).try_into().ok()?;
        let rho: [u8; 32] = (&bytes[51..83]).try_into().ok()?;
        let rseed: [u8; 32] = (&bytes[83..105]).try_into().ok()?;

        let recipient: Address = Option::from(Address::from_raw_address_bytes(&recipient))?;
        let value: NoteValue = NoteValue::from_bytes(value);
        let rho: Nullifier = Option::from(Nullifier::from_bytes(&rho))?;
        let rseed: RandomSeed = Option::from(RandomSeed::from_bytes(rseed, &rho))?;

        Some(Note::from_parts(recipient, value, rho, rseed))
    }
}

/// An encrypted note.
#[derive(Clone)]
pub struct TransmittedNoteCiphertext {
    /// The serialization of the ephemeral public key
    pub epk_bytes: [u8; 32],
    /// The encrypted note ciphertext
    pub enc_ciphertext: [u8; 580],
    /// An encrypted value that allows the holder of the outgoing cipher
    /// key for the note to recover the note plaintext.
    pub out_ciphertext: [u8; 80],
}

impl fmt::Debug for TransmittedNoteCiphertext {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("TransmittedNoteCiphertext")
            .field("epk_bytes", &self.epk_bytes)
            .field("enc_ciphertext", &hex::encode(self.enc_ciphertext))
            .field("out_ciphertext", &hex::encode(self.out_ciphertext))
            .finish()
    }
}

/// Generators for property testing.
#[cfg(any(test, feature = "test-dependencies"))]
#[cfg_attr(docsrs, doc(cfg(feature = "test-dependencies")))]
pub mod testing {
    use proptest::prelude::*;

    use crate::{
        address::testing::arb_address, note::nullifier::testing::arb_nullifier, value::NoteValue,
    };

    use super::{Note, RandomSeed};

    prop_compose! {
        /// Generate an arbitrary random seed
        pub(crate) fn arb_rseed()(elems in prop::array::uniform32(prop::num::u8::ANY)) -> RandomSeed {
            RandomSeed(elems)
        }
    }

    prop_compose! {
        /// Generate an action without authorization data.
        pub fn arb_note(value: NoteValue)(
            recipient in arb_address(),
            rho in arb_nullifier(),
            rseed in arb_rseed(),
        ) -> Note {
            Note {
                recipient,
                value,
                rho,
                rseed,
            }
        }
    }
}
