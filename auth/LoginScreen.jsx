import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      const loggedUser = JSON.parse(user);
      if (loggedUser && loggedUser.userId) {
        if (
          loggedUser.role === 'manufacturer' &&
          loggedUser.firstTimeLogin === false
        ) {
          navigation.navigate('MfHome');
        } else if (
          loggedUser.role === 'retailer' &&
          loggedUser.firstTimeLogin === false
        ) {
          navigation.navigate('ReatilerHome');
        }
      }
      // console.log("userrrr", user);
    })();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await axios.get('https://rawcult-be.vercel.app/auth/google'); // Replace with your API endpoint
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    const userData = {email, password};

    try {
      const response = await axios.post(
        'https://rawcult-be.vercel.app/auth/login',
        userData,
      );

      if (response.status === 200) {
        const token = response.data.accessToken;
        console.log('tokennn', response);

        await AsyncStorage.setItem('acessToken', token);
        await AsyncStorage.setItem(
          'user',
          JSON.stringify(response?.data?.user),
        );

        if (
          response.data.user.role === 'manufacturer' &&
          response.data.user.firstTimeLogin === true
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            {text: 'OK', onPress: () => navigation.navigate('role')},
          ]);
        } else if (
          response.data.user.role === 'retailer' &&
          response.data.user.firstTimeLogin === true
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {text: 'OK', onPress: () => navigation.navigate('retailerForm')},
          ]);
        } else if (
          response.data.user.role === 'retailer' &&
          response.data.user.firstTimeLogin === false &&
          response.data.user.isApproved === false
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {text: 'OK', onPress: () => navigation.navigate('formApproval')},
          ]);
        } else if (
          response.data.user.role === 'manufacturer' &&
          response.data.user.firstTimeLogin === false &&
          response.data.user.isApproved === false
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {text: 'OK', onPress: () => navigation.navigate('formApproval')},
          ]);
        } else if (
          response.data.user.role === 'manufacturer' &&
          response.data.user.firstTimeLogin === false
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {text: 'OK', onPress: () => navigation.navigate('MfHome')},
          ]);
        } else if (
          response.data.user.role === 'retailer' &&
          response.data.user.firstTimeLogin === false
        ) {
          Alert.alert('Sign In Successful', 'You are now signed in.', [
            // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
            {text: 'OK', onPress: () => navigation.navigate('ReatilerHome')},
          ]);
        }
      } else {
        // Show error message
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forget');

    // Implement your forgot password logic here
  };
  const handleCreateAccount = () => {
    navigation.navigate('Signup');

    // Implement navigation to the Create Account screen here
    // Example: navigation.navigate('CreateAccount');
  };
  return (
    // <View style={styles.container}>
    <ImageBackground
      source={require('../assets/authBack.jpg')}
      style={styles.container}>
      {/* <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: -20,
          marginBottom: 20,
        }}
      >
        <Image
          style={{ height: 80, width: 80 }}
          source={require("../assets/image.png")}
        />
        <Text style={{ fontSize: 12, fontWeight: "800" }}>ShopApp</Text>
      </View> */}
      <Text style={styles.logo}>Welcome to Rawcult!</Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          marginTop: -15,
          marginBottom: 20,
          fontSize: 13,
          fontWeight: '900',
          color: '#f2f7f7',
        }}>
        Please sign-in to your account and start shopping.
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 5,
          alignSelf: 'flex-start',
          color: '#e6dfed',
          marginTop: 10,
          marginLeft: 5,
        }}>
        Email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          color: '#e6dfed',
          marginBottom: 5,
          marginTop: 10,
          marginLeft: 5,
        }}>
        Password
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        {/* <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe(!rememberMe)}
        >
          {rememberMe ? (
            <Text style={{ color: "#6e6d70", fontSize: 16 }}>
              ☑ Remember Me
            </Text>
          ) : (
            <Text style={{ color: "#6e6d70", fontSize: 16 }}>
              ☐ Remember Me
            </Text>
          )}
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 15,
            color: 'grey',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          New on our platform?{' '}
        </Text>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.orText}>OR</Text>
      </View>
      {/* Facebook Login */}
      <View style={styles.socialIconsContainer}>
        {/* Google Login */}
        <TouchableOpacity onPress={handleGoogleLogin}>
          <View
            style={{
              height: 'auto',
              width: 'auto',
              borderRadius: 10,
              backgroundColor: '#f5d5d6',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Ionicons
              name="logo-google"
              size={25}
              color="#DB4437"
              style={styles.socialIcon}
              onPress={() => {
                // Implement your Google login logic here
              }}
            />
            <Text style={{marginTop: 15, marginRight: 15}}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>

        {/* Twitter Login */}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <View
          style={{
            width: '45%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 17,
              fontWeight: '500',
              textDecorationLine: 'underline',
            }}>
            Skip, for now
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
        <View
          style={{
            width: '45%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 17,
              fontWeight: '500',
              textDecorationLine: 'underline',
            }}>
            View as Manufacturer
          </Text>
        </View>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'flex-start',
  },
  logoImage: {
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#966dc9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 15,
  },
  createAccountText: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    width: '60%',
  },
  facebookIcon: {
    padding: 6,
    paddingBottom: 1,
  },
  socialIcon: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },

  orText: {
    fontSize: 17,
    color: '#ccc',
    fontWeight: 'bold',
  },
  rolePicker: {
    width: '50%',
  },
});

export default LoginScreen;
