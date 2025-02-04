// import React, { useState } from "react";
// import { View, TextInput, Alert, Text, StyleSheet ,Image, TouchableOpacity} from "react-native";
// import Constants from 'expo-constants';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [deviceType, setDeviceType] = useState("");
//   const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? '';

//   const handleSignup = async () => {
//     if (!name || !password || !deviceType) {
//       Alert.alert("Error", "Please fill in all the fields.");
//       return;
//     }

//     try {

//       const response = await fetch(`${API_BASE_URL}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, password, device_type: deviceType }),
//       });

//       const data = await response.json();
//       console.log("Response Data:", data); // Log response for debugging

//       if (response.ok) {
//         Alert.alert("Signup Successful", "Your account has been created.");
//         // Optionally, you could navigate to another screen here after successful signup
//       } else {
//         Alert.alert("Error", data.message || "Failed to sign up.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//     <Image source={require('../assets/images/logowithleaf.png')} style={styles.logoImage} />
//       <Text style={styles.header}>Sign Up</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Device Type (e.g., Android, iOS)"
//         value={deviceType}
//         onChangeText={setDeviceType}
//       />

//       <TouchableOpacity onPress={handleSignup} style={styles.SignInButton}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top: -25,
//     justifyContent: 'center',
//     padding: 16,
//    backgroundColor: '#f3f7ea',
//   },
//   logoImage: {
//     width: '80%',
//     height: '20%',
//     alignSelf: 'center',
//   },
//   header: {
//     fontSize: 30,
//     textAlign: "center",
//     marginBottom: 20,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   SignInButton: {
//     backgroundColor: '#1e7218',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });

// export default Register;


//with add deviceeee
import React, { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';

const Register = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // Added email state
  const [devices, setDevices] = useState<string[]>([""]); // Initialize with one device input field
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? '';

  const handleSignup = async () => {
    // Check for email, name, password, and device type
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
      console.log("Response Data:", data); // Log response for debugging

      if (response.ok) {
        Alert.alert("Signup Successful", "Your account has been created.");
        // Optionally, navigate to another screen after successful signup
      } else {
        Alert.alert("Error", data.message || "Failed to sign up.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleAddDevice = () => {
    setDevices([...devices, ""]); // Add a new device input field
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
        keyboardType="email-address" // Makes sure the keyboard is set for email input
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {devices.map((device, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Device Type ${index + 1} (e.g., Android, iOS)`}
          value={device}
          onChangeText={(value) => handleDeviceChange(index, value)}
        />
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
