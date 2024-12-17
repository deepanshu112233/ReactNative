import React from "react";

type Wallet = {
    id: number;
    userId: number;
    balance: number;
    isFrozen: boolean;
  };
  
  interface WalletProps {
    wallets: Wallet[];
    onToggleFreeze: (id: number, freeze: boolean) => void;
  }
  
  const WalletTable: React.FC<WalletProps> = ({ wallets, onToggleFreeze }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.id}</td>
              <td>{wallet.userId}</td>
              <td>${wallet.balance}</td>
              <td>{wallet.isFrozen ? 'Frozen' : 'Active'}</td>
              <td>
                <button onClick={() => onToggleFreeze(wallet.id, !wallet.isFrozen)}>
                  {wallet.isFrozen ? 'Unfreeze' : 'Freeze'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default WalletTable;
  