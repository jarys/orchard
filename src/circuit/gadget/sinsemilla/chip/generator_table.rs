use std::prelude::v1::*;

use crate::primitives::sinsemilla::{self, SINSEMILLA_S};
use halo2::{
    circuit::Layouter,
    plonk::{ConstraintSystem, Error, Expression, TableColumn},
    poly::Rotation,
};

use pasta_curves::{arithmetic::FieldExt, pallas};

/// Table containing independent generators S[0..2^k]
#[derive(Eq, PartialEq, Copy, Clone, Debug)]
pub struct GeneratorTableConfig {
    pub table_idx: TableColumn,
    pub table_x: TableColumn,
    pub table_y: TableColumn,
}

impl GeneratorTableConfig {
    #[allow(clippy::too_many_arguments)]
    #[allow(non_snake_case)]
    /// Even though the lookup table can be used in other parts of the circuit,
    /// this specific configuration sets up Sinsemilla-specific constraints
    /// controlled by `q_sinsemilla`, and would likely not apply to other chips.
    pub fn configure(meta: &mut ConstraintSystem<pallas::Base>, config: super::SinsemillaConfig) {
        let (table_idx, table_x, table_y) = (
            config.generator_table.table_idx,
            config.generator_table.table_x,
            config.generator_table.table_y,
        );

        meta.lookup(|meta| {
            let q_s1 = meta.query_selector(config.q_sinsemilla1);
            let q_s2 = meta.query_fixed(config.q_sinsemilla2, Rotation::cur());
            let q_s3 = {
                let one = Expression::Constant(pallas::Base::one());
                q_s2.clone() * (q_s2.clone() - one)
            };

            // m_{i+1} = z_{i} - 2^K * (q_s2 - q_s3) * z_{i + 1}
            // Note that the message words m_i's are 1-indexed while the
            // running sum z_i's are 0-indexed.
            let word = {
                let z_cur = meta.query_advice(config.bits, Rotation::cur());
                let z_next = meta.query_advice(config.bits, Rotation::next());
                z_cur - ((q_s2 - q_s3) * z_next * pallas::Base::from_u64(1 << sinsemilla::K))
            };

            let x_p = meta.query_advice(config.x_p, Rotation::cur());

            // y_{p,i} = (Y_{A,i} / 2) - lambda1 * (x_{A,i} - x_{P,i}),
            // where Y_{A,i} = (lambda1_i + lambda2_i) * (x_{A,i} - x_{R,i}),
            //       x_{R,i} = lambda1^2 - x_{A,i} - x_{P,i}
            //
            let y_p = {
                let lambda1 = meta.query_advice(config.lambda_1, Rotation::cur());
                let lambda2 = meta.query_advice(config.lambda_2, Rotation::cur());
                let x_a = meta.query_advice(config.x_a, Rotation::cur());

                let x_r = lambda1.clone().square() - x_a.clone() - x_p.clone();
                let Y_A = (lambda1.clone() + lambda2) * (x_a.clone() - x_r);

                (Y_A * pallas::Base::TWO_INV) - (lambda1 * (x_a - x_p.clone()))
            };

            // Lookup expressions default to the first entry when `q_s1`
            // is not enabled.
            let (init_x, init_y) = SINSEMILLA_S[0];
            let not_q_s1 = Expression::Constant(pallas::Base::one()) - q_s1.clone();

            let m = q_s1.clone() * word; // The first table index is 0.
            let x_p = q_s1.clone() * x_p + not_q_s1.clone() * init_x;
            let y_p = q_s1 * y_p + not_q_s1 * init_y;

            vec![(m, table_idx), (x_p, table_x), (y_p, table_y)]
        });
    }

    pub fn load(&self, layouter: &mut impl Layouter<pallas::Base>) -> Result<(), Error> {
        layouter.assign_table(
            || "generator_table",
            |mut table| {
                for (index, (x, y)) in SINSEMILLA_S.iter().enumerate() {
                    table.assign_cell(
                        || "table_idx",
                        self.table_idx,
                        index,
                        || Ok(pallas::Base::from_u64(index as u64)),
                    )?;
                    table.assign_cell(|| "table_x", self.table_x, index, || Ok(*x))?;
                    table.assign_cell(|| "table_y", self.table_y, index, || Ok(*y))?;
                }
                Ok(())
            },
        )
    }
}
