"use client";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import AccountTable from "./components/AccountTable";

type Account = {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
};

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]); // Explicitly define the type for accounts

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/users");
        setAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    fetchAccounts();
  }, []);

  // Handler to toggle account activation status
  const handleToggleStatus = async (id: number, status: boolean) => {
    try {
      await api.put(`/users/${id}`, { isActive: status });
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === id ? { ...account, isActive: status } : account
        )
      );
    } catch (error) {
      console.error("Failed to toggle account status", error);
    }
  };

  // Handler to reset account credentials
  const handleResetCredentials = async (id: number) => {
    try {
      await api.post(`/users/${id}/reset-credentials`);
      alert(`Credentials reset for user ID ${id}`);
    } catch (error) {
      console.error("Failed to reset credentials", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AccountTable
        accounts={accounts}
        onToggleStatus={handleToggleStatus}
        onResetCredentials={handleResetCredentials}
      />
    </div>
  );
}
