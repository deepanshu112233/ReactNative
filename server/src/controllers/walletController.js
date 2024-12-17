// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.getWallet = async (req, res) => {
//   const wallet = await prisma.wallet.findUnique({
//     where: { id: parseInt(req.params.id) },
//     include: { transactions: true },
//   });
//   res.json(wallet);
// };

// exports.updateWallet = async (req, res) => {
//   const { balance } = req.body;
//   const wallet = await prisma.wallet.update({
//     where: { id: parseInt(req.params.id) },
//     data: { balance },
//   });
//   res.json(wallet);
// };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getWallet = async (req, res) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { transactions: true },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json(wallet);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const { balance } = req.body;

    const wallet = await prisma.wallet.update({
      where: { id: parseInt(req.params.id) },
      data: { balance },
    });

    res.json(wallet);
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ error: "Failed to update wallet" });
  }
};

// Add balance to wallet
exports.addBalance = async (req, res) => {
  try {
    const { walletId, amount } = req.body;

    if (!walletId || amount === undefined) {
      return res.status(400).json({ error: "Missing walletId or amount" });
    }

    // Find wallet
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Update wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: wallet.balance + amount, // Add the amount to the existing balance
      },
    });

    res.json(updatedWallet);
  } catch (error) {
    console.error("Error adding balance to wallet:", error);
    res.status(500).json({ error: "Failed to add balance" });
  }
};
