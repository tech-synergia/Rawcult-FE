import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RetailerForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [aadhaarOrPan, setAadhaarOrPan] = useState('');
  const [image, setImage] = useState('');
  const [loginToken, setLoginToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLoginToken(token);
    })();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      shopName,
      shopAddress,
      phone,
      gstNo,
      aadhaarOrPan,
      firstTimeLogin: false,
    };

    try {
      const response = await axios.patch(
        'https://rawcult-be.vercel.app/users/updateUser',
        payload,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            'Content-Type': 'application/json', // Set the content type as per your API's requirements
          },
        },
      );

      if (response.status === 200) {
        navigation.navigate('formApproval');
      } else {
        Alert.alert(response.data.msg);
      }
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <LinearGradient
      colors={['#b151e8', '#30044a']} // Array of gradient colors
      start={{x: 0, y: 0}} // Start point of the gradient
      end={{x: 1, y: 0}} // End point of the gradient
      style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Ionicons
          style={{marginLeft: 10}}
          name="arrow-back-circle"
          color={'#93b3e6'}
          size={35}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 120,
          width: '96%',
          marginLeft: 12,
          marginTop: -10,
          marginBottom: -20,
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '500',
            textAlign: 'center',
            color: '#fff',
          }}>
          Retailer{' '}
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            color: '#ccc',
            textAlign: 'center',
          }}>
          Approval Form
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 20,
            }}>
            Your Name
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setName(text)}
            value={name}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              marginTop: 10,
              color: '#000',
            }}>
            Your Shop/Retailer Unit Name
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setShopName(text)}
            value={shopName}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Your Unit Address
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setShopAddress(text)}
            value={shopAddress}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Phone Number
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setPhone(text)}
            value={phone}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Your Email Address
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Your GST Number
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setGstNo(text)}
            value={gstNo}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Your Aadhar/PAN Card Number
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setAadhaarOrPan(text)}
            value={aadhaarOrPan}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText} onPress={handleSubmit}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 80,
    width: '90%',
    alignSelf: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 15,
    color: '#000',
    alignSelf: 'center',
  },
  logoImage: {
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    // borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 5,
    color: '#000',
  },
  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
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
    justifyContent: 'space-between',
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
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

export default RetailerForm;
