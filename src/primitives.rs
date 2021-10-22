//! Primitives used in the Orchard protocol.
// TODO:
// - DH stuff
//     - EphemeralPublicKey
//     - EphemeralSecretKey

#[cfg(feature = "alloc")]
pub mod poseidon;
pub mod redpallas;
#[cfg(feature = "alloc")]
pub mod sinsemilla;
