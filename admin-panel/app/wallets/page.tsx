import React, { useEffect, useState } from 'react';
import WalletTable from '@/app/components/WalletTable';
import api from '@/lib/axios';


const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);

  const fetchWallets = async () => {
    const response = await api.get('/wallets');
    setWallets(response.data);
  };

  const toggleFreeze = async (id: number, freeze: boolean) => {
    await api.patch(`/wallets/${id}/freeze`, { isFrozen: freeze });
    fetchWallets();
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div>
      <h1>Wallet Management</h1>
      <WalletTable wallets={wallets} onToggleFreeze={toggleFreeze} />
    </div>
  );
};

export default WalletsPage;
