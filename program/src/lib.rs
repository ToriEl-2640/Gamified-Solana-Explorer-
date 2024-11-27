use anchor_lang::prelude::*;

declare_id!("YourProgramIDHere");

#[program]
pub mod blockchain_explorer {
    use super::*;

    pub fn store_transaction(ctx: Context<StoreTransaction>, hash: String) -> Result<()> {
        let transaction = &mut ctx.accounts.transaction_account;
        transaction.hash = hash;
        transaction.validated = false;
        Ok(())
    }

    pub fn validate_transaction(ctx: Context<ValidateTransaction>) -> Result<()> {
        let transaction = &mut ctx.accounts.transaction_account;
        transaction.validated = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StoreTransaction<'info> {
    #[account(init, payer = user, space = 8 + 256 + 1)]
    pub transaction_account: Account<'info, Transaction>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ValidateTransaction<'info> {
    #[account(mut)]
    pub transaction_account: Account<'info, Transaction>,
}

#[account]
pub struct Transaction {
    pub hash: String,
    pub validated: bool,
}
