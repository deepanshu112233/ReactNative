import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Page</Text>
      <Link href="/" style={{color:'green'}}>Go to home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the entire screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#fff', // Optional: Set a background color for clarity
  },
  text: {
    color: 'blue', // Sets the text color to blue
    fontSize: 20, // Optional: Adjust font size
  },
});
