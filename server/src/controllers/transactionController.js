// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.addTransaction = async (req, res) => {
//   const { walletId, type, amount, category } = req.body;
//   const transaction = await prisma.transaction.create({
//     data: { walletId, type, amount, category },
//   });
//   res.json(transaction);
// };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addTransaction = async (req, res) => {
  const { senderWalletId, receiverWalletId, amount, category } = req.body;

  if (!senderWalletId || !receiverWalletId || amount === undefined || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch sender and receiver wallets
    const senderWallet = await prisma.wallet.findUnique({
      where: { id: senderWalletId },
    });

    const receiverWallet = await prisma.wallet.findUnique({
      where: { id: receiverWalletId },
    });

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update sender and receiver balances
    const updatedSenderWallet = await prisma.wallet.update({
      where: { id: senderWalletId },
      data: {
        balance: senderWallet.balance - amount,
      },
    });

    const updatedReceiverWallet = await prisma.wallet.update({
      where: { id: receiverWalletId },
      data: {
        balance: receiverWallet.balance + amount,
      },
    });

    // Create a transaction for the sender
    const senderTransaction = await prisma.transaction.create({
      data: {
        walletId: senderWalletId,
        type: "send",
        amount,
        category,
      },
    });

    // Create a transaction for the receiver
    const receiverTransaction = await prisma.transaction.create({
      data: {
        walletId: receiverWalletId,
        type: "receive",
        amount,
        category,
      },
    });

    res.status(201).json({
      message: "Transaction successful",
      senderTransaction,
      receiverTransaction,
      updatedSenderWallet,
      updatedReceiverWallet,
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ error: "Failed to process transaction" });
  }
};
