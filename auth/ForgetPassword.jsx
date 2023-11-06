import React, {useState} from 'react';
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
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    const userEmail = email;
    if (userEmail) {
      Alert.alert('Link sent', 'Check your email for code and try login.', [
        {text: 'OK', onPress: navigation.navigate('Signin')},
      ]);
    } else {
      Alert.alert('Please provide correct email');
    }

    // const userData = { email, password };
    // try {
    //   const response = await axios.post(
    //     "https://rawcult-be.vercel.app/auth/login",
    //     userData
    //   );
    //   if (response.status === 200) {
    //     console.log(">>>>>>>>>>>>>", response.data.accessToken);
    //     if (
    //       response.data.user.role === "manufacturer" &&
    //       response.data.user.firstTimeLogin === true
    //     ) {
    //       Alert.alert("Sign In Successful", "You are now signed in.", [
    //         { text: "OK", onPress: () => navigation.navigate("role") },
    //       ]);
    //     } else if (
    //       response.data.user.role === "retailer" &&
    //       response.data.user.firstTimeLogin === true
    //     ) {
    //       Alert.alert("Sign In Successful", "You are now signed in.", [
    //         // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
    //         { text: "OK", onPress: () => navigation.navigate("RetailerHome") },
    //       ]);
    //     } else {
    //       Alert.alert("Sign In Successful", "You are now signed in.", [
    //         { text: "OK", onPress: () => navigation.navigate("MfHome") },
    //       ]);
    //     }
    //     console.log(">>>>>>", response.data.user.role);
    //   } else {
    //     // Show error message
    //     Alert.alert("Error", "Invalid credentials. Please try again.");
    //   }
    // } catch (error) {
    //   Alert.alert("Error", "Network error occurred.");
    // }
  };

  return (
    // <View style={styles.container}>
    <>
      <View style={{backgroundColor: '#006DFF'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Ionicons
            style={{
              marginLeft: 5,
              alignSelf: 'flex-start',
              width: '100%',
            }}
            name="arrow-back"
            size={35}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.logo}>Forgot Password</Text>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginTop: -15,
            marginBottom: 30,
            fontSize: 15,
            fontWeight: '600',
            color: '#ccc',
          }}>
          Please, enter your email address.You will receive a link to create a
          new password via email.
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

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText} onPress={handleLogin}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: -40,
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
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgetPassword;
