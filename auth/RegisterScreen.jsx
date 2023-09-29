import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  Linking,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  const options = [
    {label: 'Manufacturer', value: 'manufacturer'},
    {label: 'Retailer', value: 'retailer'},
  ];

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [role, setRole] = useState('');
  const openGmail = () => {
    const UserEmail = `mailto:${email}`;
    Linking.openURL(UserEmail);
  };
  const handleSelectOption = value => {
    setRole(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async () => {
    const userData = {email, password, name, role};
    console.log('first', userData);

    try {
      const response = await axios.post(
        'https://rawcult-be.vercel.app/auth/register',
        userData,
      );

      if (response.status === 200 || 201) {
        // Show email verification alert
        Alert.alert(
          'Registration Successful',
          'Your account is registered now, Login to Continue.',
          [{text: 'OK', onPress: navigation.navigate('Signin')}],
        );
      } else {
        // Show error message
        Alert.alert('Error', 'An error occurred during signup.');
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.msg);
    }
  };
  const handleSignin = () => {
    navigation.navigate('Signin');
  };
  return (
    <LinearGradient
      colors={['#ff66c4', '#5170ff']} // Array of gradient colors
      start={{x: 0, y: 0}} // Start point of the gradient
      end={{x: 1, y: 0}} // End point of the gradient
      style={styles.container}>
      <Text style={styles.logo}>Welcome to Rawcult</Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          marginTop: -20,
          marginBottom: 20,
          fontSize: 15,
          fontWeight: '500',
          color: '#6e6d70',
        }}>
        Fill the information below to Register.
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 5,
          alignSelf: 'flex-start',
          color: '#6e6d70',
          marginTop: 10,
        }}>
        Who you are:
      </Text>
      <View style={{width: '55%', marginBottom: -10}}>
        <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="manufacturer" color="#ccc" />
            <Text style={styles.radioButtonLabel}>Manufacturer</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="retailer" color="#ccc" />
            <Text style={styles.radioButtonLabel}>Retailer</Text>
          </View>
        </RadioButton.Group>
      </View>
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
        Name
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        onChangeText={text => setName(text)}
        value={name}
      />
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
        placeholder="Enter your email"
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
          marginBottom: 5,
          alignSelf: 'flex-start',
          color: '#e6dfed',
          marginTop: 10,
          marginLeft: 5,
        }}>
        Password
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreed(!agreed)}
        >
          {agreed ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ color: "#6e6d70", fontSize: 16 }}>
                ☑ I agree to{" "}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ color: "#007bff", fontSize: 15, fontWeight: "500" }}
                >
                  privcy policy & terms
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ color: "#6e6d70", fontSize: 16 }}>
                ☐ I agree to{" "}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ color: "#007bff", fontSize: 15, fontWeight: "500" }}
                >
                  privcy policy & terms
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 15,
            color: 'grey',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleSignin}>
          <Text style={styles.createAccountText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.orText}>OR</Text>
      </View>
      {/* Facebook Login */}
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <View
            style={{
              height: 'auto',
              width: 'auto',
              borderRadius: 10,
              backgroundColor: '#F7E4E1',
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
    </LinearGradient>
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
    marginTop: 30,
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ccc',
  },
});

export default RegisterScreen;
