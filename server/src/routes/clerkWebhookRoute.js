const express = require('express');
const { handleClerkWebhook } = require('../controllers/clerkWebhookController');

const router = express.Router();

// Define the Clerk webhook route
router.post('/clerk-webhook', handleClerkWebhook);

module.exports = router;
