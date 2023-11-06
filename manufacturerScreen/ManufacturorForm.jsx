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
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

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
  const [image, setImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);
  const [loginToken, setLoginToken] = useState('');
  const [imageFormat, setImageFormat] = useState('');

  const Camera = (
    <MaterialCommunityIcons name="camera-plus" size={30} color="#000" />
  );

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLoginToken(token);
    })();
  }, []);

  const handleImageUpload = urlencoded => {
    var requestOptions = {
      method: 'POST',
      body: urlencoded,
      redirect: 'follow',
    };
    fetch(
      'https://api.cloudinary.com/v1_1/dfrxndgy1/image/upload',
      requestOptions,
    )
      .then(response => {
        console.log('response checkig', response);
        return response.json();
      })
      .then(result => {
        console.log('resulting', result);
        setImage(prev => [...prev, result.secure_url]);
      })
      .catch(error => console.log('error', error));
  };

  const handleImagePicker = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
        selectionLimit: 10,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled imagepicker');
        } else if (response.errorCode) {
          console.log('err', response.errorCode);
        } else {
          setSelectedImages(response?.assets);

          response?.assets.map(img => {
            const formData = new FormData();
            formData.append('file', `data:${img?.type};base64,${img?.base64}`);
            formData.append('upload_preset', 'my_preset');
            handleImageUpload(formData);
          });

          // urlencoded.append(
          //   'file',

          // );
          // urlencoded.append('api_key', '884118737371933');
          // urlencoded.append('upload_preset', 'my_preset');
          // urlencoded.append('unsigned', false);
          // urlencoded.append('public_id', Math.random());
        }
      },
    );
  };
  const removeImage = index => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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
      image,
    };
    console.log('formmm', payload);

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
      Alert.alert('Error', error?.response?.data?.msg);
    }
    // navigation.navigate("formApproval");
  };

  return (
    <View style={{flex: 1, backgroundColor: '#006DFF'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Ionicons
          style={{marginLeft: 10}}
          name="arrow-back-circle"
          color={'#fff'}
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your Name <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your Shop/Manufacturer Unit Name{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your Unit Address{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Phone Number <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your Email Address{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your GST Number <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Your Aadhar/PAN Card Number{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Upload Aadhar/PAN Image
          </Text>
          <View
            style={{
              height: 70,
              width: '100%',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
              marginBottom: 10,
              backgroundColor: '#ededed',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Entypo
                style={{marginTop: 10}}
                name="camera"
                size={30}
                color="#000"
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: '600',
                  marginLeft: -20,
                  // marginTop: 30,
                }}>
                +Add Photo
              </Text>
            </TouchableOpacity>
          </View>
          {/* ) : ( */}
          {selectedImages?.map((image, index) => (
            <View
              key={image.uri}
              style={{
                paddingHorizontal: 8,
                marginBottom: 10,
                marginLeft: 45,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: image.uri}}
                style={{
                  height: 100,
                  width: 120,
                  marginTop: 5,
                  color: 'black',
                  fontWeight: '600',
                  // marginLeft: 10,
                }}
              />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <MaterialIcons
                  style={{marginTop: 45}}
                  name="delete"
                  size={25}
                  color={'#000'}
                />
              </TouchableOpacity>
            </View>
          ))}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 10,
            }}>
            Products You deal in{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
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
              color: '#fff',
              marginTop: 10,
            }}>
            Bank Account Details{' '}
            <Text style={{color: 'red', fontSize: 20}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            onChangeText={text => setBankAccount(text)}
            value={bankAccount}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#000',
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
