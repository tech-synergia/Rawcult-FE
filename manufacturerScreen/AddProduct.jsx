import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const AddProduct = ({navigation}) => {
  const [stocks, setStocks] = useState(10);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [minQty, setMinQty] = useState(10);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [colors, setColors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const [imagee, setImagee] = useState(null);
  const [image, setImage] = useState([]);
  const [imageFormat, setImageFormat] = useState('');
  const [loginToken, setLOginToken] = useState('');
  const [sizes, setSizes] = useState([]);
  // const [secureUrls, setSecureUrls] = useState([]);
  const [sizeData, setSizeData] = useState([
    {label: 'S', value: 'S', disabled: false},
    {label: 'M', value: 'M', disabled: false},
    {label: 'L', value: 'L', disabled: false},
    {label: 'XL', value: 'XL', disabled: false},
    {label: 'XXL', value: 'XXL', disabled: false},
  ]);
  const route = useRoute();
  const data = route.params;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams();

  const [inputFields, setInputFields] = useState([
    {id: Date.now().toString(), size: '', quantity: ''},
  ]);

  useEffect(() => {
    if (inputFields.length === 0) {
      setInputFields([{id: Date.now().toString(), size: '', quantity: ''}]);
    }
  }, []);

  const addInputFields = () => {
    const newFields = [
      ...inputFields,
      {id: Date.now().toString(), size: '', quantity: ''},
    ];
    setInputFields(newFields);
  };

  const removeInputFields = id => {
    if (inputFields.length === 1) {
      // Ensure that at least one input field remains
      return;
    }
    const updatedFields = inputFields.filter(field => field.id !== id);
    setInputFields(updatedFields);
  };

  const handleInputChange = (id, inputName, value) => {
    const updatedFields = inputFields.map(field => {
      if (field.id === id) {
        return {...field, [inputName]: value};
      }
      return field;
    });
    //     console.log(
    //       '🚀 ~ file: AddProduct.jsx:66 ~ updatedFields ~ updatedFields:',
    //       updatedFields,
    //     );
    setInputFields(updatedFields);
  };

  (async () => {
    const getToken = await AsyncStorage.getItem('acessToken');
    //     console.log('njnjbjbjbjbj', getToken);
  })();

  const categoryData = [
    {label: 'Mens Wear', value: 'mens wear'},
    {label: 'Womens Wear', value: 'womens wear'},
    {label: 'Kids Wear', value: 'kids wear'},
    {label: 'Accessories', value: 'accessories'},
  ];
  const subCategoryData = [
    {label: 'Top Wear', value: 'top wear'},
    {label: 'Bottom Wear', value: 'bottom wear'},
    {label: 'Casual Wear', value: 'sports wear'},
  ];

  const Colordata = [
    {label: 'Black', value: 'black'},
    {label: 'White', value: 'white'},
    {label: 'Red', value: 'red'},
    {label: 'Green', value: 'green'},
    {label: 'Blue', value: 'blue'},
    {label: 'Orange', value: 'orange'},
    {label: 'Multicolour', value: 'multicolour'},
    {label: 'Pink', value: 'pink'},
  ];

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
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

  // const handleImageUpload = async formdata => {
  //   try {
  //     var requestOptions = {
  //       method: 'POST',
  //       body: formdata,
  //       redirect: 'follow',
  //     };
  //     await fetch(
  //       'https://api.cloudinary.com/v1_1/dfrxndgy1/image/upload',
  //       requestOptions,
  //     )
  //       .then(response => {
  //         console.log('response checkig', response);
  //         response.text();
  //       })
  //       .then(result => console.log(result))
  //       .catch(error => console.log('error', error));

  //     // axios
  //     //   .post(
  //     //     'https://api.cloudinary.com/v1_1/dfrxndgy1/image/upload',
  //     //     formdata,
  //     //   )
  //     //   .then()
  //     //   .catch(err => {
  //     //     console.log('err', err);
  //     //   });
  //     // if (response.status === 200) {
  //     //   // setImage(response?.data?.image);
  //     //   console.log('??????????', response);
  //     // } else {
  //     //   Alert.alert('please Select proper image');
  //     // }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const pickDoc = async () => {
  //   const result = await DocumentPicker.pick({
  //     presentationStyle: 'fullScreen',
  //   });
  //   console.log('🚀 ~ file: AddProduct.jsx:227 ~ pickDoc ~ result:', result);
  //   let formdata = new FormData();

  //   formdata.append('file', result[0], result[0].name);
  //   formdata.append('upload_preset', 'my_presettt');
  //   formdata.append('api_key', '884118737371933');
  //   handleImageUpload(formdata);
  // };

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

  const Camera = <Entypo name="camera" size={30} color="#000" />;

  const handleAddProduct = async () => {
    const monster = inputFields.map(val => ({
      quantity: Number(val.quantity),
      size: val?.size,
    }));
    //     console.log('first', inputFields);

    const productData = {
      name,
      category,
      subCategory,
      colors,
      minQty,
      sizes: monster,
      description,
      stocks: Number(stocks),
      price,
      image,
    };

    try {
      const response = await axios.post(
        'https://rawcult-be.vercel.app/products',
        productData,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            'Content-Type': 'application/json', // Set the content type as per your API's requirements
          },
        },
      );
      if (response.status === 200 || 201) {
        // Show email verification alert
        Alert.alert('Product Added', 'You can see in Your Product list.', [
          // { text: "OK", onPress: () => navigation.navigate("retailerForm") },
          {text: 'OK', onPress: () => navigation.navigate('MfHome')},
        ]);
      } else {
        // Show error message
        Alert.alert('Error', 'An error occurred during signup.');
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  //   console.log('<<<>>>>', inputFields);

  const renderSizeItems = item =>
    inputFields?.map(item => item.size).includes(item.value) ? null : (
      <View style={styles.item}>
        <Text style={{color: '#000'}}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );

  const uploadImage = async () => {};

  return (
    <View style={{flex: 1, backgroundColor: '#006DFF'}}>
      <ScrollView style={{marginBottom: 10}}>
        {data && data?.addProduct && (
          <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
            <Ionicons
              style={{marginTop: 10, marginLeft: 5}}
              name="arrow-back"
              size={35}
              color={'#fff'}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            width: '98%',
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginTop: 30,
              fontSize: 28,
              fontWeight: '900',
              color: '#fff',
              marginLeft: 20,
              // backgroundColor: '#fff',
              width: 160,
              height: 50,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            Add Product
          </Text>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 20,
              marginLeft: 5,
            }}
            source={require('../assets/backk.png')}
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: '#ccc',
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}>
          Fill the product details to add product!
        </Text>

        <Text style={styles.label}>Product Category:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: '#4075c9'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: '#474646'}}
          data={categoryData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Category' : 'Select One'}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategory(item.value);
            setIsFocus(false);
          }}
        />

        <Text style={styles.label}>Product Sub Category:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: '#4075c9'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: '#474646'}}
          data={subCategoryData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Sub Category' : 'Select One'}
          value={subCategory}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSubCategory(item.value);
            setIsFocus(false);
          }}
        />
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onChangeText={text => setName(text)}
          value={name}
        />
        {/* <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: '600',
            marginLeft: -20,
          }}
          onPress={pickDoc}>
          Testing the photo
        </Text> */}
        <Text style={styles.label}>Product Image:</Text>

        {/* {!selectedImages ? ( */}
        <View
          style={{
            height: 70,
            width: '80%',
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 10,
            backgroundColor: '#ededed',
            marginLeft: 45,
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
              style={
                {
                  // marginTop: 30,
                }
              }>
              +Add Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginTop: 5,
            paddingLeft: 50,
          }}>
          {selectedImages?.map((image, index) => (
            <View
              key={image.uri}
              style={{
                width: '30%',
                marginRight: 10,
                marginBottom: 15,
              }}>
              <Image
                source={{uri: image.uri}}
                style={{
                  height: 80,
                  width: 80,
                  color: 'black',
                  fontWeight: '600',
                }}
              />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={{position: 'absolute', right: 5, top: 5}}>
                <MaterialIcons name="delete" size={25} color={'#ccc'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ))} */}

        <Text style={styles.label}>Total Stocks:</Text>

        <TextInput
          style={{
            width: '80%',
            height: 50,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 15,
            paddingHorizontal: 15,
            fontSize: 16,
            alignSelf: 'center',
            color: '#000',
          }}
          placeholder="Enter total stocks"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText={text => setStocks(text)}
          value={stocks}
        />
        <Text style={styles.label}>Sizes Available:</Text>

        {inputFields.map(field => (
          <View
            key={field.id}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginLeft: 20,
            }}>
            <Dropdown
              style={[styles.Dropdown, isFocus && {borderColor: '#4075c9'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: '#474646', columnGap: 10}}
              data={sizeData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select size' : 'Select One'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              renderItem={renderSizeItems}
              value={field.size}
              onChange={item => handleInputChange(field.id, 'size', item.value)}
            />
            <TextInput
              style={{
                width: '35%',
                height: 50,
                borderWidth: 1,
                borderColor: '#fff',
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 15,
                paddingHorizontal: 15,
                fontSize: 16,
                alignSelf: 'center',
                marginLeft: 15,
                color: '#000',
              }}
              placeholder="Enter quantity"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              autoCapitalize="none"
              value={field.quantity}
              onChangeText={text =>
                handleInputChange(field.id, 'quantity', text)
              }
            />
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity onPress={addInputFields}>
                <Ionicons
                  style={{marginLeft: 5}}
                  name="add-outline"
                  size={30}
                  color={'#fff'}
                />
              </TouchableOpacity>
              {inputFields.length > 1 && (
                <TouchableOpacity onPress={() => removeInputFields(field.id)}>
                  <Ionicons
                    style={{marginLeft: 5, marginTop: -8}}
                    name="remove-outline"
                    size={28}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        {sizes.map((item, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
              Size:{item?.size}
            </Text>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
              Quantity:{item?.quantity}
            </Text>
          </View>
        ))}
        <Text style={styles.label}>Colors Available:</Text>
        <DropDownPicker
          style={{
            height: 50,
            width: '80%',
            alignSelf: 'center',
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 10,
            backgroundColor: '#ededed',
          }}
          items={Colordata}
          open={open}
          setOpen={() => setOpen(!open)}
          value={colors}
          setValue={val => setColors(val)}
          maxHeight={200}
          autoScroll
          placeholder="Select Colors"
          showTickIcon={true}
          multiple={true}
          min={0}
          mode="BADGE"
          placeholderStyle={{color: '#acafb5', fontSize: 15}}
          dropDownContainerStyle={{
            width: 328,
            marginLeft: 40,
            borderColor: '#74a1e8',
            borderRadius: 10,
            marginBottom: 30,
          }}
        />
        <Text style={styles.label}>Product Price per Unit:</Text>

        <TextInput
          style={{
            width: '80%',
            height: 50,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 15,
            paddingHorizontal: 15,
            fontSize: 16,
            alignSelf: 'center',
            color: '#000',
          }}
          placeholder="Enter Price"
          onChangeText={text => setPrice(text)}
          value={price}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          keyboardType="number-pad"
        />
        <Text style={styles.label}>Minimum Quantity for Order:</Text>

        <TextInput
          style={{
            width: '80%',
            height: 50,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 15,
            paddingHorizontal: 15,
            fontSize: 16,
            alignSelf: 'center',
            color: '#000',
          }}
          placeholder="Enter minimum quantity"
          // onChangeText={handleInputChange}
          // value={quantity}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onChangeText={text => setMinQty(text)}
          value={minQty}
          keyboardType="number-pad"
        />
        <Text style={styles.label}>Product Description:</Text>
        <TextInput
          style={{
            width: '80%',
            height: 50,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 15,
            paddingHorizontal: 15,
            fontSize: 16,
            alignSelf: 'center',
            height: 100,
            paddingVertical: 8,
            color: '#000',
          }}
          placeholder="Enter product description..."
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          multiline={true}
          numberOfLines={5} // You can adjust the number of visible lines
          onChangeText={text => setDescription(text)}
          value={description}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleAddProduct}>
          <Text style={styles.loginButtonText}>
            <Ionicons name="add-circle-outline" size={25} /> Add
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    color: '#000',
    alignSelf: 'flex-start',
  },
  logoImage: {
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#fff',
    marginTop: 25,
    marginLeft: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    alignSelf: 'center',
    color: '#000',
  },
  dropdown: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    color: '#000',
    textDecorationColor: '#000',
  },
  Dropdown: {
    height: 50,
    width: '40%',
    alignSelf: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    color: '#000',
    textDecorationColor: '#000',
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 90,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 23,
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
