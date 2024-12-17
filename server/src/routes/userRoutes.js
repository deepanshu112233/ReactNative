const express = require('express');
const { getUsers, createUser, getUserWithBalance } = require('../controllers/userController');
const router = express.Router();

// Existing routes
router.get('/', getUsers);
router.post('/', createUser);

// New route to get user by ID and fetch balance
router.get('/:id', getUserWithBalance);
router.post('/sync', async (req, res) => {
    const { id, firstName, lastName, email } = req.body;
  
    try {
      await prisma.user.upsert({
        where: { id },
        create: { id, firstName, lastName, email },
        update: { firstName, lastName, email },
      });
      res.status(200).json({ message: 'User synced successfully!' });
    } catch (error) {
      console.error('Error syncing user:', error);
      res.status(500).json({ error: 'Failed to sync user' });
    }
  });
module.exports = router;
