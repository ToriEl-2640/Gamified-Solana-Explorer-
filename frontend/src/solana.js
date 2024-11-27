import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";

const PROGRAM_ID = new PublicKey("YourProgramIDHere");

export const storeTransaction = async (provider, program, hash) => {
    const transactionAccount = web3.Keypair.generate();
    const tx = await program.methods
        .storeTransaction(hash)
        .accounts({
            transactionAccount: transactionAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        })
        .signers([transactionAccount])
        .rpc();
    return tx;
};

export const validateTransaction = async (provider, program, transactionAccount) => {
    const tx = await program.methods
        .validateTransaction()
        .accounts({
            transactionAccount: transactionAccount,
        })
        .rpc();
    return tx;
};
