

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Pressable } from 'react-native';
// import { router } from 'expo-router';


// export default function index() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const handleLogin = () => {
//     if (username && password) {
//       Alert.alert('Login Successful', `Welcome, ${username}!`);
//     } else {
//       Alert.alert('Error', 'Please enter both username and password.');
//     }
//   };

//   // const handleOAuthLogin = (platform) => {
//   //   Alert.alert(`OAuth Login`, `You selected ${platform} OAuth login.`);
//   // };

//   return (
//     <View style={styles.container}>
      
//       {/* <Text style={styles.logoText}>Ukshati</Text> */}
//       <Image source={require('.././assets/images/logowithleaf.png')} style={styles.logoImage} />
//       <Text style={styles.loginText}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         // value={email}
//         // onChangeText={setEmail}
//         style={styles.input}
//         placeholderTextColor="#a9a9a9"
//       />

      
//       <View style={styles.passwordContainer}>
//         <TextInput
//           placeholder="Password"
//           // value={password}
//           // onChangeText={setPassword}
//            secureTextEntry={!isPasswordVisible}
//           style={styles.passwordInput}
//           placeholderTextColor="#a9a9a9"
//         />
//         <TouchableOpacity
//           onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//           style={styles.eyeIconContainer}
//         >
//           <Image
//             source={isPasswordVisible ? require('.././assets/images/visible.png') : require('.././assets/images/hide.png')}
//             style={styles.eyeIcon}
//           />
//         </TouchableOpacity>
//       </View>


      
//       {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

//       {/* <TouchableOpacity>
//         <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
//       </TouchableOpacity> */}
//       {/* <Button title="Set Data" onPress={setData} />
//       <Button title="Get Data" onPress={getData} /> */}
//       <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <Text style={styles.orText}>OR</Text>
//       <TouchableOpacity style={styles.googleButton}>
//         <Image source={require('.././assets/images/google.png')} style={styles.googleLogo} />
//         <Text style={styles.googleButtonText}>Continue with Google</Text>
//       </TouchableOpacity>
     
//       <View style={styles.signupTextContainer}>
//         <Text style={styles.signupText}>New User ? </Text>
//         <Pressable onPress={() => router.push('./MainSignup')}>
//           <Text style={styles.signupLink}>Sign Up</Text>
//         </Pressable>
        
//       </View>
//     </View>
//   );
// };





import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // On success, handle the response (e.g., store JWT token, navigate to the home screen)
          Alert.alert('Login Successful', `Welcome, ${username}!`);
          // You can store the token securely here (e.g., AsyncStorage or React Context API)
          // After login, navigate to the Home screen
          //router.push('/Home'); // Assuming you have a Home page in your app
        } else {
          Alert.alert('Login Failed', data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong.');
      }
    } else {
      Alert.alert('Error', 'Please enter both username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logowithleaf.png')} style={styles.logoImage} />
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={styles.passwordInput}
          placeholderTextColor="#a9a9a9"
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
          <Image
            source={isPasswordVisible ? require('../assets/images/visible.png') : require('../assets/images/hide.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../assets/images/google.png')} style={styles.googleLogo} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>New User? </Text>
        <TouchableOpacity onPress={() => router.push('./MainSignup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  // logoText: {
  //   fontSize: 56,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginVertical: 20,
  //   color: '#4f7208',
    
  // },
  loginText: {
    fontSize: 20,
    textAlign: 'left',
    paddingLeft:20,
    fontWeight:'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  loginButton: {
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
  orText: {
    textAlign: 'center',
    marginBottom: 10,
   
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: '90%', 
    alignSelf: 'center',
  },
  googleButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    //make this text in next line
    alignItems: 'center',
    color: '#000',
  },
  signupLink: {
    color: '#1e7218',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
