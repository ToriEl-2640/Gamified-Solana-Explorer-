import React from "react";
import SearchBar from "./components/SearchBar";
import TransactionCard from "./components/TransactionCard";
import  WalletConnect from "./components/WalletConnect";
import  VisualGraph from "./components/VisualGraph";
import  Leaderboard from "./Leaderboard";

import React, { useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "./idl.json";
import { storeTransaction, validateTransaction } from "./solana";

const App = () => {
    const [hash, setHash] = useState("");
    const [message, setMessage] = useState("");

    const connection = new Connection(clusterApiUrl("devnet"));
    const wallet = window.solana; // Assumes Phantom wallet is installed
    const provider = new AnchorProvider(connection, wallet, {});
    const program = new Program(idl, "YourProgramIDHere", provider);

    const handleStore = async () => {
        try {
            const tx = await storeTransaction(provider, program, hash);
            setMessage(`Transaction stored: ${tx}`);
        } catch (err) {
            console.error(err);
            setMessage("Failed to store transaction.");
        }
    };

    const handleValidate = async () => {
        // Update with the transaction account public key
        const transactionAccount = "YourTransactionAccountPublicKey";
        try {
            const tx = await validateTransaction(provider, program, transactionAccount);
            setMessage(`Transaction validated: ${tx}`);
        } catch (err) {
            console.error(err);
            setMessage("Failed to validate transaction.");
        }
    };

    return (
        <div>
            <h1>Solana Blockchain Explorer</h1>
            <input
                type="text"
                placeholder="Transaction Hash"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
            />
            <button onClick={handleStore}>Store Transaction</button>
            <button onClick={handleValidate}>Validate Transaction</button>
            <p>{message}</p>
        </div>
    );
};

export default App;
