// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const clerkWebhookRoute = require('./routes/clerkWebhookRoute');


// const walletRoutes = require('./routes/walletRoutes');
// const userRoutes = require('./routes/userRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Welcome to the Wallet App API!");
//   });
  
// // Routes

// app.use('/api/users', userRoutes);
// app.use('/api/wallets', walletRoutes);
// app.use('/api/transactions', transactionRoutes);

// module.exports = app;


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const clerkWebhookRoute = require('./routes/clerkWebhookRoute');
const walletRoutes = require('./routes/walletRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Explicitly added for compatibility with Clerk webhook payloads

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Wallet App API!");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/webhooks', clerkWebhookRoute); // Add the Clerk webhook route

module.exports = app;
