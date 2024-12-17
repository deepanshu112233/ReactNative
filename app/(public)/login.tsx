// import { useSignIn } from '@clerk/clerk-expo';
// import { Link } from 'expo-router';
// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';

// const Login = () => {
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSignInPress = async () => {
//     if (!isLoaded) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const completeSignIn = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       // This indicates the user is signed in
//       await setActive({ session: completeSignIn.createdSessionId });
//     } catch (err: any) {
//       alert(err.errors[0].message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Spinner visible={loading} />

//       <TextInput autoCapitalize="none" placeholder="simon@galaxies.dev" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
//       <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

//       <Button onPress={onSignInPress} title="Login" color={'#6c47ff'}></Button>

//       <Link href="/reset" asChild>
//         <Pressable style={styles.button}>
//           <Text>Forgot password?</Text>
//         </Pressable>
//       </Link>
//       <Link href="/register" asChild>
//         <Pressable style={styles.button}>
//           <Text>Create Account</Text>
//         </Pressable>
//       </Link>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inputField: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#6c47ff',
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   button: {
//     margin: 8,
//     alignItems: 'center',
//   },
// });

// export default Login;
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser();  // Use this to get user data after sign-in

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      // Perform sign-in
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Sign-in complete, activate the session
      await setActive({ session: completeSignIn.createdSessionId });

      // Now that the user is signed in, `user` from `useUser()` will have the user data
      if (user) {
        // Send the user data to your backend for user creation or update in Prisma
        const userData = {
          email: user.emailAddresses[0].emailAddress, // Or use `user.email`
          username: user.username || emailAddress, // If Clerk username is available, use it; else fallback to email
          clerkId: user.id,  // Include the Clerk user ID for reference in the backend
        };

        // Post the user data to your backend for Prisma database
        const response = await axios.post('http://localhost:3000/api/users', userData);

        // Handle response, for example, redirect or update UI
        if (response.status === 200) {
          console.log('User data successfully sent to backend');
        } else {
          alert('Failed to save user data');
        }
      }

    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Button onPress={onSignInPress} title="Login" color={'#6c47ff'} />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;
