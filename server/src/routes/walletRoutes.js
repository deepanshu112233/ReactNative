const express = require('express');
const router = express.Router();

const { getWallet, updateWallet, addBalance } = require('../controllers/walletController');

router.get('/:id', getWallet);
router.put('/:id', updateWallet);
router.post('/add-balance', addBalance); // Add balance route

module.exports = router;



// const express = require('express');
// const router = express.Router();

// router.post('/', (req, res) => {
//   const { userId, balance } = req.body;

//   if (!userId || balance === undefined) {
//     return res.status(400).json({ error: "Missing userId or balance" });
//   }

//   res.status(201).json({
//     message: `Wallet for user ${userId} initialized with balance ${balance}.`
//   });
// });

// module.exports = router;
