
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Get all users (existing functionality)
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       include: { wallet: true }, // Include wallet details if needed
//     });
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };

// exports.createUser = async (req, res) => {
//   const { email, username, clerkId } = req.body; // Clerk user ID should be passed here

//   try {
//     // Check if the user already exists using Clerk's user ID
//     let user = await prisma.user.findUnique({
//       where: { clerkId: clerkId },
//     });

//     // If the user doesn't exist, create a new user and wallet
//     if (!user) {
//       user = await prisma.user.create({
//         data: {
//           email: email,
//           username: username || email, // Use email as username if not provided
//           clerkId: clerkId, // Store Clerk user ID
//           wallet: {
//             create: { balance: 0 }, // Set default balance
//           },
//         },
//         include: { wallet: true }, // Include wallet in response
//       });
//     }

//     res.status(200).json(user); // Respond with the user object
//   } catch (error) {
//     console.error("Error creating or fetching user:", error);
//     res.status(500).json({ error: "Failed to create or fetch user" });
//   }
// };





// // Create a new user and automatically create a wallet (existing functionality)
// // exports.createUser = async (req, res) => {
// //   try {
// //     const { username, email } = req.body;
// //     const newUser = await prisma.user.create({
// //       data: {
// //         username,
// //         email,
// //         wallet: {
// //           create: { balance: 0 }, // Automatically create wallet with a default balance of 0
// //         },
// //       },
// //       include: { wallet: true }, // Include the wallet in the response
// //     });

// //     res.status(201).json(newUser);
// //   } catch (error) {
// //     console.error("Error creating user:", error);
// //     res.status(500).json({ error: "Failed to create user" });
// //   }
// // };







// // Get user by ID with balance
// // exports.getUserWithBalance = async (req, res) => {
// //   try {
// //     const userId = req.params.id; // Get user ID from URL parameters
// //     const user = await prisma.user.findUnique({
// //       where: { id: Number(userId) },
// //       include: { wallet: true }, // Include wallet details
// //     });

// //     if (user) {
// //       res.json({ username: user.username, balance: user.wallet[0]?.balance }); // Send balance
// //     } else {
// //       res.status(404).json({ error: 'User not found' });
// //     }
// //   } catch (error) {
// //     console.error("Error fetching user with balance:", error);
// //     res.status(500).json({ error: 'Failed to fetch user with balance' });
// //   }
// // };


// exports.getUserWithBalance = async (req, res) => {
//   const { id } = req.params; // id will now be the Clerk user ID

//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId: id }, // Use Clerk ID to find user
//       include: { wallet: true }, // Include wallet information
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user); // Return user data including wallet
//   } catch (error) {
//     console.error("Error fetching user with balance:", error);
//     res.status(500).json({ error: "Failed to fetch user with balance" });
//   }
// };



const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users (existing functionality)
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { wallet: true }, // Include wallet details if needed
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create a new user or fetch an existing one
exports.createUser = async (req, res) => {
  const { email, username, clerkId } = req.body; // Clerk user ID should be passed here

  try {
    // Check if the user already exists using Clerk's user ID
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });

    // If the user doesn't exist, create a new user and wallet
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          username: username || email, // Use email as username if not provided
          clerkId: clerkId, // Store Clerk user ID
          wallet: {
            create: { balance: 0 }, // Set default balance
          },
        },
        include: { wallet: true }, // Include wallet in response
      });
    }

    res.status(200).json(user); // Respond with the user object
  } catch (error) {
    console.error("Error creating or fetching user:", error);
    res.status(500).json({ error: "Failed to create or fetch user" });
  }
};

// Get user by Clerk ID and include wallet balance
exports.getUserWithBalance = async (req, res) => {
  const { id } = req.params; // id will now be the Clerk user ID

  try {
    // Find the user by Clerk ID and include wallet details
    const user = await prisma.user.findUnique({
      where: { clerkId: id }, // Use Clerk ID to find user
      include: { wallet: true }, // Include wallet information
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user data, including wallet balance
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error fetching user with balance:", error);
    res.status(500).json({ error: "Failed to fetch user with balance" });
  }
};
