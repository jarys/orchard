//! Special purpose no_std fpe implementation for 88-bit binary strings.
use fpe::ff1::{Numeral, NumeralString};

/// 44-bit unsigned integer.
#[derive(Copy, Clone, Debug)]
pub struct U44(u64);

/// BitString88 is designed to be used for orchard diversifier index fp-encryption
/// in no_std environments.
#[derive(Copy, Clone, Debug)]
pub enum BitString88 {
    /// Whole string containing all 88 bits.
    Full(U44, U44),
    /// Only one half (i.e. 44 bits) of the string.
    Half(U44),
}

/// Returns a byte with bitwise reversed bits.
fn bitwise_reversed(b: u8) -> u8 {
    (0..8).into_iter().map(|i| ((b >> i) & 1) << (7 - i)).sum()
}

impl BitString88 {
    /// Creates a BitStrin88 from a byte slice, with each byte
    /// interpreted in little-endian bit order.
    pub fn from_bytes_le(s: &[u8]) -> Self {
        // using &[u8] to reach compatibility with BinaryNumeralString
        assert_eq!(s.len(), 11);
        let mut x = 0u128;
        for byte in s.iter() {
            x <<= 8;
            x |= bitwise_reversed(*byte) as u128;
        }
        assert_eq!(x >> 88, 0);
        BitString88::Full(
            U44(((x >> 44) & 0xfffffffffff) as u64),
            U44((x & 0xfffffffffff) as u64),
        )
    }

    /// Returns a [u8; 11], with each byte written from the BitStrin88
    /// in little-endian bit order.
    pub fn to_bytes_le(&self) -> [u8; 11] {
        let x: u128 = match self {
            BitString88::Full(U44(a), U44(b)) => {
                ((a.clone() as u128) << 44) + ((b.clone() as u128) << 0)
            }
            _ => panic!("Only BitString88::Full can be converted into bytes."),
        };
        let mut res = [0u8; 11];
        for i in 0..11 {
            res[10 - i] = bitwise_reversed(((x >> (8 * i)) & 0xff) as u8);
        }
        res
    }
}

impl Numeral for U44 {
    type Bytes = [u8; 6];

    fn from_bytes(s: impl Iterator<Item = u8>) -> Self {
        let mut x = 0u64;
        for b in s.into_iter() {
            x <<= 8;
            x |= b as u64;
            x &= 0xfffffffffff;
        }
        U44(x)
    }

    fn to_bytes(&self, b: usize) -> Self::Bytes {
        assert_eq!(b, 6);
        let mut res = [0u8; 6];
        res.copy_from_slice(&self.0.to_be_bytes()[2..8]);
        res
    }

    fn add_mod_exp(self, other: Self, radix: u32, m: usize) -> Self {
        assert_eq!(radix, 2);
        assert_eq!(m, 44);
        U44((self.0 + other.0) & 0xfffffffffff)
    }

    fn sub_mod_exp(self, other: Self, radix: u32, m: usize) -> Self {
        self.add_mod_exp(U44(0x100000000000 - other.0), radix, m)
    }
}

impl NumeralString for BitString88 {
    type Num = U44;

    fn is_valid(&self, radix: u32) -> bool {
        radix == 2
    }

    fn len(&self) -> usize {
        88
    }

    fn split(&self, u: usize) -> (Self, Self) {
        assert_eq!(u, 44);
        match self {
            BitString88::Full(a, b) => (BitString88::Half(a.clone()), BitString88::Half(b.clone())),
            _ => panic!("Cannot split BitString88::Half."),
        }
    }

    fn concat(a: Self, b: Self) -> Self {
        match (a, b) {
            (BitString88::Half(a), BitString88::Half(b)) => BitString88::Full(a, b),
            _ => panic!("Only BitString88::Halfes can be concatenated."),
        }
    }

    fn num_radix(&self, radix: u32) -> Self::Num {
        assert_eq!(radix, 2);
        match self {
            BitString88::Half(x) => x.clone(),
            _ => panic!("Only BitString88::Half can be converted to Num."),
        }
    }

    fn str_radix(x: Self::Num, radix: u32, m: usize) -> Self {
        assert_eq!(radix, 2);
        assert_eq!(m, 44);
        BitString88::Half(x)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use aes::Aes256;
    use core::convert::TryInto;
    use fpe::ff1::FF1;

    #[derive(Debug, Clone)]
    struct TestVector {
        key: [u8; 32],
        bpt: [u8; 11],
        bct: [u8; 11],
    }

    static TEST_VECTORS: [TestVector; 2] = [
        // Zcash test vectors
        TestVector {
            key: [
                0x2B, 0x7E, 0x15, 0x16, 0x28, 0xAE, 0xD2, 0xA6, 0xAB, 0xF7, 0x15, 0x88, 0x09, 0xCF,
                0x4F, 0x3C, 0xEF, 0x43, 0x59, 0xD8, 0xD5, 0x80, 0xAA, 0x4F, 0x7F, 0x03, 0x6D, 0x6F,
                0x04, 0xFC, 0x6A, 0x94,
            ],
            bpt: [
                0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ],
            bct: [
                0x90, 0xac, 0xee, 0x3f, 0x83, 0xcd, 0xe7, 0xae, 0x56, 0x22, 0xf3,
            ],
        },
        TestVector {
            key: [
                0x2B, 0x7E, 0x15, 0x16, 0x28, 0xAE, 0xD2, 0xA6, 0xAB, 0xF7, 0x15, 0x88, 0x09, 0xCF,
                0x4F, 0x3C, 0xEF, 0x43, 0x59, 0xD8, 0xD5, 0x80, 0xAA, 0x4F, 0x7F, 0x03, 0x6D, 0x6F,
                0x04, 0xFC, 0x6A, 0x94,
            ],
            bpt: [
                0x90, 0xac, 0xee, 0x3f, 0x83, 0xcd, 0xe7, 0xae, 0x56, 0x22, 0xf3,
            ],
            bct: [
                0x5b, 0x8b, 0xf1, 0x20, 0xf3, 0x9b, 0xab, 0x85, 0x27, 0xea, 0x1b,
            ],
        },
    ];

    #[test]
    fn round_trip() {
        for tv in TEST_VECTORS.iter() {
            let bytes: [u8; 11] = tv.bpt.clone().try_into().unwrap();
            let middle = BitString88::from_bytes_le(&bytes);
            let tripped = middle.to_bytes_le();
            assert_eq!(tripped, bytes);
        }
    }

    #[test]
    fn encryption_and_decryption() {
        for tv in TEST_VECTORS.iter() {
            let tvbpt: [u8; 11] = tv.bpt.clone().try_into().unwrap();
            let tvbct: [u8; 11] = tv.bct.clone().try_into().unwrap();
            let (bct, bpt) = {
                let ff = FF1::<Aes256>::new(&tv.key, 2).unwrap();
                (
                    ff.encrypt(&[], &BitString88::from_bytes_le(&tvbpt))
                        .unwrap(),
                    ff.decrypt(&[], &BitString88::from_bytes_le(&tvbct))
                        .unwrap(),
                )
            };
            assert_eq!(bpt.to_bytes_le(), tvbpt);
            assert_eq!(bct.to_bytes_le(), tvbct);
        }
    }
}
