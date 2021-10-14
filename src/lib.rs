//! # orchard
//!
//! ## Nomenclature
//!
//! All types in the `orchard` crate, unless otherwise specified, are Orchard-specific
//! types. For example, [`Address`] is documented as being a shielded payment address; we
//! implicitly mean it is an Orchard payment address (as opposed to e.g. a Sapling payment
//! address, which is also shielded).

#![no_std]
#![cfg_attr(docsrs, feature(doc_cfg))]
// Temporary until we have more of the crate implemented.
#![allow(dead_code)]
// Catch documentation errors caused by code changes.
#![deny(broken_intra_doc_links)]
#![deny(missing_debug_implementations)]
#![deny(missing_docs)]
#![deny(unsafe_code)]

extern crate no_std_compat as std;

#[cfg(feature = "std")] // TODO: make it no_std
mod address;
#[cfg(feature = "std")]
pub mod builder;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod bundle;
#[cfg(feature = "std")]
pub mod circuit;
#[cfg(feature = "std")] // TODO: make it no_std
mod constants;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod keys;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod note;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod note_encryption;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod primitives;
#[cfg(feature = "std")] // TODO: make it no_std
mod spec;
#[cfg(feature = "std")]
pub mod tree;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod value;
#[cfg(feature = "std")] // TODO: make it no_std
pub mod zip32;

#[cfg(all(test, feature = "std"))]
mod test_vectors;

#[cfg(feature = "std")] // TODO: make it no_std
pub use address::Address;
#[cfg(feature = "std")] // TODO: make it no_std
pub use bundle::Bundle;
#[cfg(feature = "std")]
pub use circuit::Proof;
#[cfg(feature = "std")] // TODO: make it no_std
pub use note::Note;
#[cfg(feature = "std")]
pub use tree::Anchor;
