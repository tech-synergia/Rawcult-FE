import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManufacturorForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mfUnit, setMfUnit] = useState('');
  const [unitAddress, setUnitAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [aadhaarOrPan, setAadhaarOrPan] = useState('');
  const [productDeal, setProductDeal] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loginToken, setLoginToken] = useState('');

  const Camera = (
    <MaterialCommunityIcons name="camera-plus" size={30} color="#000" />
  );

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLoginToken(token);
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'});
    setSelectedImages(result);
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      mfUnit,
      unitAddress,
      phone,
      gstNo,
      aadhaarOrPan,
      productDeal,
      bankAccount,
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
        Alert.alert('please fill correct Data');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred.');
    }
    // navigation.navigate("formApproval");
  };

  return (
    <LinearGradient
      colors={['#b151e8', '#30044a']} // Array of gradient colors
      start={{x: 0, y: 0}} // Start point of the gradient
      end={{x: 1, y: 0}} // End point of the gradient
      style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Ionicons style={{marginLeft: 20}} name="arrow-back-circle" size={35} />
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
            fontSize: 30,
            fontWeight: '500',
            textAlign: 'center',
            color: '#fff',
          }}>
          Manufacturer{' '}
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            color: '#ccc',
            textAlign: 'center',
          }}>
          Approval Form
        </Text>
      </View>
      <ScrollView>
        {/* <View
          style={{
            width: "96%",
            height: "100%",
            alignSelf: "center",
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            borderTopWidth: 1,
            borderTopColor: "#bd90fc",
            backgroundColor: "#c9a9f5",
            marginTop: 1,
          }}
        > */}
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
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
              color: '#000',
              marginTop: 10,
            }}>
            Your Shop/Manufacturer Unit Name
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setMfUnit(text)}
            value={mfUnit}
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
            onChangeText={text => setUnitAddress(text)}
            value={unitAddress}
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Upload Product Image
          </Text>
          {!image ? (
            <View
              style={{
                height: 100,
                width: '100%',
                borderRadius: 5,
                paddingHorizontal: 8,
                marginBottom: 10,
                backgroundColor: '#ededed',
              }}>
              <TouchableOpacity onPress={handleImagePicker}>
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: 40,
                  }}>
                  {Camera}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    margin: -30,
                    marginTop: -50,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {Camera}
                  Add Photo
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.uri}}
                  style={{width: 100, height: 100, margin: 10}}
                />
              ))}
              {/* {console.log("image", updatedImage)} */}
            </>
          )}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#000',
              marginTop: 10,
            }}>
            Products You deal in
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setProductDeal(text)}
            value={productDeal}
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
            Bank Account Details
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setBankAccount(text)}
            value={bankAccount}
          />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText} onPress={handleSubmit}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
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

export default ManufacturorForm;
