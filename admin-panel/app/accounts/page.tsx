// app/accounts/page.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const freezeWallet = async (walletId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/wallets/${walletId}`, { status: false });
      alert('Wallet Frozen');
    } catch (error) {
      alert('Error freezing wallet');
    }
  };

  const unfreezeWallet = async (walletId: number) => {
    try {
      await axios.put(`http://localhost:3000/api/wallets/${walletId}`, { status: true });
      alert('Wallet Unfrozen');
    } catch (error) {
      alert('Error unfreezing wallet');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Wallet Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.wallet.status ? 'Active' : 'Frozen'}</td>
                <td>
                  <button onClick={() => freezeWallet(user.wallet.id)} disabled={!user.wallet.status}>
                    Freeze Wallet
                  </button>
                  <button onClick={() => unfreezeWallet(user.wallet.id)} disabled={user.wallet.status}>
                    Unfreeze Wallet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
