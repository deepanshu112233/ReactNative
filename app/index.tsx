// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Link } from 'expo-router';

// const index = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hello</Text>
//       <Link href="/explore" style={{color:'green'}}>Go to explore page</Link>
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Makes the container take up the entire screen
//     justifyContent: 'center', // Centers content vertically
//     alignItems: 'center', // Centers content horizontally
//     backgroundColor: '#fff', // Optional: Set a background color for clarity
//   },
//   text: {
//     color: 'blue', // Sets the text color to blue
//     fontSize: 20, // Optional: Adjust font size
//   },
// });


import { ActivityIndicator, View } from 'react-native';

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;
