//new one with all necessaru changes
import React, { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component

const Register = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(""); 
  const [devices, setDevices] = useState<string[]>([""]); 
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? '';

  const deviceOptions = ["Uno", "Quadra", "Hexa", "Octa"]; // Define the device types

  const handleSignup = async () => {
    if (!name || !email || !password || devices.some(device => !device)) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, device_types: devices }),
              });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        Alert.alert("Signup Successful", "Your account has been created.");
      } else {
        Alert.alert("Error", data.message || "Failed to sign up.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleAddDevice = () => {
    setDevices([...devices, ""]); 
  };

  const handleDeviceChange = (index: number, value: string) => {
    const updatedDevices = [...devices];
    updatedDevices[index] = value;
    setDevices(updatedDevices);
  };

  return (
    
    <View style={styles.container}>
      <Image source={require('../assets/images/logowithleaf.png')} style={styles.logoImage} />
      <Text style={styles.header}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {devices.map((device, index) => (
        <View key={index} style={styles.deviceContainer}>
          <Text style={styles.deviceLabel}>Device Type {index + 1}</Text>
          <Picker
            selectedValue={device}
            style={styles.picker}
            onValueChange={(value) => handleDeviceChange(index, value)}
          >
            <Picker.Item label="Select Device Type" value="" />
            {deviceOptions.map((option, idx) => (
              <Picker.Item key={idx} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddDevice} style={styles.addDeviceButton}>
        <Text style={styles.buttonText}>Add Device</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignup} style={styles.SignInButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -25,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f3f7ea',
  },
  logoImage: {
    width: '80%',
    height: '20%',
    alignSelf: 'center',
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
  deviceContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  deviceLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  addDeviceButton: {
    backgroundColor: '#1e7218',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  SignInButton: {
    backgroundColor: '#1e7218',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Register;