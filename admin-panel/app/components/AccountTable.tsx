import React from 'react';

type Account = {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
};

interface Props {
  accounts: Account[];
  onToggleStatus: (id: number, status: boolean) => void;
  onResetCredentials: (id: number) => void;
}

const AccountTable: React.FC<Props> = ({ accounts, onToggleStatus, onResetCredentials }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.username}</td>
            <td>{account.email}</td>
            <td>{account.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              <button onClick={() => onToggleStatus(account.id, !account.isActive)}>
                {account.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => onResetCredentials(account.id)}>Reset Credentials</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountTable;
