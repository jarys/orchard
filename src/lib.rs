//! # orchard
//!
//! ## Nomenclature
//!
//! All types in the `orchard` crate, unless otherwise specified, are Orchard-specific
//! types. For example, [`Address`] is documented as being a shielded payment address; we
//! implicitly mean it is an Orchard payment address (as opposed to e.g. a Sapling payment
//! address, which is also shielded).

#![no_std] // TODO: works only with alloc feature
#![cfg_attr(docsrs, feature(doc_cfg))]
// Temporary until we have more of the crate implemented.
#![allow(dead_code)]
// Catch documentation errors caused by code changes.
#![deny(broken_intra_doc_links)]
#![deny(missing_debug_implementations)]
#![deny(missing_docs)]
#![deny(unsafe_code)]

#[cfg(feature = "std")]
#[macro_use]
extern crate std;

#[cfg(feature = "alloc")]
#[macro_use]
extern crate alloc;

mod address;
//pub mod builder; // TODO: enable builder under std feature
pub mod bundle; // TODO: enable bundle
                //pub mod circuit; // TODO: enable circuit under std feature
mod constants;
pub mod keys;
pub mod note;
pub mod note_encryption; // TODO: enable note_encryption
pub mod primitives;
mod spec;
pub mod tree; // TODO: enable tree under std feature
pub mod value;
pub mod zip32;

#[cfg(test)]
mod test_vectors;

pub use address::Address;
//pub use bundle::Bundle; // TODO: enable bundle
//pub use circuit::Proof; // TODO: enable circuit under std feature
pub use note::Note;
pub use tree::Anchor; // TODO: enable tree under std feature
