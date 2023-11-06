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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

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

  GoogleSignin.configure({
    webClientId:
      '754633465153-vi41osv7hr95kej2qjhu1kvifiqhr41q.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error.message);
        // some other error happened
      }
    }
  }

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
    <View
      // End point of the gradient
      style={styles.container}>
      <Text style={styles.logo}>Welcome to Rawcult</Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          marginTop: -20,
          marginBottom: 20,
          fontSize: 15,
          fontWeight: '500',
          color: '#ccc',
        }}>
        Fill the information below to Register.
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          marginBottom: 5,
          alignSelf: 'flex-start',
          color: '#fff',
          marginTop: 10,
        }}>
        Select your role:
      </Text>
      <View style={{width: '55%', marginBottom: -10}}>
        <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="manufacturer" color="#fff" />
            <Text style={styles.radioButtonLabel}>Manufacturer</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="retailer" color="#fff" />
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
        <FontAwesome name="user-plus" size={22} color={'#000'} />
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 15,
            color: '#ccc',
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
          <View>
            <GoogleSigninButton
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => {
                    console.log('user signed in using google');
                    navigation.navigate('ReatilerHome');
                  })
                  .catch(error => {
                    console.log(error);
                  })
              }
            />
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
              color: '#ccc',
              fontSize: 17,
              fontWeight: '500',
              textDecorationLine: 'underline',
            }}>
            Skip, for now
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006DFF',
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
    borderColor: '#fff',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    flexDirection: 'row',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  createAccountButton: {
    marginTop: 15,
  },
  createAccountText: {
    color: '#ccc',
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
    borderColor: '#fff',
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
    color: '#ccc',
    // marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
});

export default RegisterScreen;
