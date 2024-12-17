// controllers/clerkWebhookController.js
const { prisma } = require('../../prisma/client');

const handleClerkWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'user.created' || type === 'user.updated') {
      const { id, first_name, last_name, email_addresses } = data;

      // Upsert user into Prisma
      await prisma.user.upsert({
        where: { id },
        create: {
          id,
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0]?.email_address,
        },
        update: {
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0]?.email_address,
        },
      });
    }

    res.status(200).send('Webhook handled successfully!');
  } catch (error) {
    console.error('Error handling Clerk webhook:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { handleClerkWebhook };
