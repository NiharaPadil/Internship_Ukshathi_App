import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? '';

//handling login inputs

  const handleLogin = async () => { 
    if (username && password) {
        try {
            console.log('Attempting login with', { username, password });


            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, password: password }),
            });
//receving data
            const data = await response.json();
            console.log('Full API Response in Frontend:', data); //  Debugging log

            if (response.ok) {
                if (!data.user_id) {
                    console.error('ERROR: User ID is missing in API response'); // Debugging
                } else {
                    console.log(' Received User ID:', data.user_id); //checking whetehr its reviced
                }

                
                Alert.alert('Login Successful', `Welcome, ${username}!`);
                router.push('./Landing'); //connecting to landing page

            } else {
                Alert.alert('Login Failed', data.message);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    } else {
        Alert.alert('Error', 'Please enter both username and password.');
    }
};
return (
  <View style={styles.container}>
    {/* for logo image */}
    <Image source={require('../assets/images/logowithleaf.png')} style={styles.logoImage} /> 
    <Text style={styles.loginText}>Login</Text>
    <TextInput
      placeholder="Email"
      value={username}
      onChangeText={setUsername}
      style={styles.input}
      placeholderTextColor="#a9a9a9"
    />
    {/*password box */}
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

    {/* continue with google button*/}

    <Text style={styles.orText}>OR</Text>
    <TouchableOpacity style={styles.googleButton}>
      <Image source={require('../assets/images/google.png')} style={styles.googleLogo} />
      <Text style={styles.googleButtonText}>Continue with Google</Text>
    </TouchableOpacity>

    {/* signing up or register */}

    <View style={styles.signupTextContainer}>
      <Text style={styles.signupText}>New User? </Text>
      <TouchableOpacity onPress={() => router.push('./Register')}>
        <Text style={styles.signupLink}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}
 //Styling
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


