use fpe::ff1::{Numeral, NumeralString};

// 44bit uint
pub struct U44(u64);

impl Numeral for U44 {
    type Bytes = [u8; 6];

    fn from_bytes(s: impl Iterator<Item = u8>) -> Self {
        let mut bytes: [u8; 8] = [0; 8];
        for (b, c) in bytes.iter_mut().zip(s) {
            *b = c;
        }
        U44(u64::from_be_bytes(bytes) & 0x00000fffffffffff)
    }

    fn to_bytes(&self, b: usize) -> Self::Bytes {
        assert_eq!(b, 6);
        let mut bytes: [u8; 6] = [0; 6];
        bytes.copy_from_slice(&self.0.to_be_bytes()[..b]);
        bytes
    }

    fn add_mod_exp(self, other: Self, radix: u32, m: usize) -> Self {
        assert_eq!(radix, 2);
        assert_eq!(m, 44);
        U44((self.0 + other.0) & 0x00000fffffffffff)
    }

    fn sub_mod_exp(self, other: Self, radix: u32, m: usize) -> Self {
        self.add_mod_exp(U44((1 << 44) - other.0), radix, m)
    }
}

/// A numeral string with radix 2.
pub struct BinaryNumeralStringOfLength88 {
    bits: [u8; 88],
    divided: bool,
}

impl BinaryNumeralStringOfLength88 {
    /// Creates a BinaryNumeralString from a byte slice, with each byte
    // interpreted in little-endian bit order.
    pub fn from_bytes_le(s: &[u8]) -> Self {
        let mut data: [u8; 88] = [0; 88];
        for (i, n) in s.iter().enumerate() {
            let mut tmp = *n;
            for j in 0..8 {
                data[8 * i + j] = tmp & 1;
                tmp >>= 1;
            }
        }
        BinaryNumeralStringOfLength88 {
            bits: data,
            divided: false,
        }
    }

    /// Returns a Vec<u8>, with each byte written from the BinaryNumeralString
    /// in little-endian bit order.
    pub fn to_bytes_le(&self) -> [u8; 11] {
        // We should always have a multiple of eight bits
        assert_eq!((self.bits.len() + 7) / 8, self.bits.len() / 8);
        let mut data = [0; 11];
        let mut acc = 0;
        let mut shift = 0;
        let mut index = 0;
        for n in &self.bits {
            acc += n << shift;
            shift += 1;
            if shift == 8 {
                data[index] = acc;
                index += 1;
                acc = 0;
                shift = 0;
            }
        }
        data
    }
}

impl NumeralString for BinaryNumeralStringOfLength88 {
    type Num = U44;

    fn is_valid(&self, radix: u32) -> bool {
        self.bits.iter().all(|n| (u32::from(*n) < radix))
    }

    fn len(&self) -> usize {
        self.bits.len()
    }

    fn split(&self, u: usize) -> (Self, Self) {
        if self.divided {
            println!("panicked on split");
        }
        assert_eq!(u, 44);
        assert!(!self.divided);
        let mut front: [u8; 88] = [0; 88];
        let mut back: [u8; 88] = [0; 88];
        front[44..88].copy_from_slice(&self.bits[..44]);
        back[44..88].copy_from_slice(&self.bits[44..]);
        (
            BinaryNumeralStringOfLength88 {
                bits: front,
                divided: true,
            },
            BinaryNumeralStringOfLength88 {
                bits: back,
                divided: true,
            },
        )
    }

    fn concat(a: Self, b: Self) -> Self {
        if !(a.divided & b.divided) {
            println!("panicked on concat");
        }
        assert!(a.divided & b.divided);
        let mut data: [u8; 88] = [0; 88];
        data[..44].copy_from_slice(&a.bits[44..]);
        data[44..].copy_from_slice(&b.bits[44..]);
        BinaryNumeralStringOfLength88 {
            bits: data,
            divided: false,
        }
    }

    fn num_radix(&self, radix: u32) -> Self::Num {
        // Check that radix == 2
        assert_eq!(radix, 2);
        let mut res: u64 = 0;
        for i in &self.bits {
            res <<= 1;
            if *i != 0 {
                res += 1;
            }
        }
        U44(res)
    }

    fn str_radix(x: Self::Num, radix: u32, m: usize) -> Self {
        // Check that radix == 2
        assert_eq!(radix, 2);
        assert_eq!(m, 44);
        let mut y = x.0;
        let mut res: [u8; 88] = [0; 88];
        for i in 44..88 {
            if y & 1 == 1 {
                res[88 - 1 - i] = 1;
            }
            y >>= 1;
        }
        BinaryNumeralStringOfLength88 {
            bits: res,
            divided: true,
        }
    }
}

// TODO: add tests
