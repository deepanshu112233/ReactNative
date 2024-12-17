// import { View, Text, StyleSheet } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-expo';
// import {currentUser} from '@clerk/nextjs/server';
// import axios from 'axios';

// const Home = () => {
//   const { user } = useUser();
//   const [balance, setBalance] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.id) {
//       // Fetch user balance from backend
//       axios
//         .get(`http://localhost:3000/api/user/${user.id}`)  // Your backend URL
//         .then((response) => {
//           console.log('API Response:', response);
//           setBalance(response.data.balance); // Set balance from API response
//         })
//         .catch((error) => {
//           console.error('Error fetching balance:', error);
//         })
//         .finally(() => {
//           setLoading(false);  // Stop loading after data is fetched
//         });
//     }
//   }, [user]);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <>
//           <Text style={styles.welcomeText}>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
//           <Text style={styles.balanceText}>Your Balance: ${balance}</Text>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   balanceText: {
//     fontSize: 18,
//     color: '#6c47ff',
//     marginTop: 10,
//   },
// });

// export default Home;


import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';

const Home = () => {
  const { user } = useUser();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      // Sync user with Prisma backend
      axios
        .post(`http://localhost:3000/api/users/sync`, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0]?.emailAddress,
        })
        .then(() => {
          console.log('User synced with Prisma');
        })
        .catch((error) => {
          console.error('Error syncing user:', error);
        });

      // Fetch user balance from backend
      axios
        .get(`http://localhost:3000/api/user/${user.id}`)
        .then((response) => {
          console.log('API Response:', response);
          setBalance(response.data.balance);
        })
        .catch((error) => {
          console.error('Error fetching balance:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
          <Text style={styles.balanceText}>Your Balance: ${balance}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    color: '#6c47ff',
    marginTop: 10,
  },
});

export default Home;
