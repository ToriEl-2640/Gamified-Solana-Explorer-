import React from "react";

const TransactionCard = ({ transaction, onValidate }) => {
  return (
    <div className="transaction-card">
      <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
      <p><strong>Sender:</strong> {transaction.sender}</p>
      <p><strong>Receiver:</strong> {transaction.receiver}</p>
      <p><strong>Amount:</strong> {transaction.amount} SOL</p>
      <button onClick={() => onValidate(transaction.hash)}>Validate</button>
    </div>
  );
};

export default TransactionCard;
