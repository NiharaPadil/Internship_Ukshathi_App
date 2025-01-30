import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
//import bcrypt from "bcryptjs"; // Import bcryptjs

const MainSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const handleSignup = async () => {
    if (!name || !password || !deviceType) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      // Hash the password using bcrypt before sending it
      //const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const response = await fetch("http://192.168.1.36:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, device_type: deviceType }),
      });

      const data = await response.json();
      console.log("Response Data:", data); // Log response for debugging

      if (response.ok) {
        Alert.alert("Signup Successful", "Your account has been created.");
        // Optionally, you could navigate to another screen here after successful signup
      } else {
        Alert.alert("Error", data.message || "Failed to sign up.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Device Type (e.g., Android, iOS)"
        value={deviceType}
        onChangeText={setDeviceType}
      />

      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default MainSignup;
