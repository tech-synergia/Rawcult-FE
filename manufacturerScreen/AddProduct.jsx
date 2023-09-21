import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const AddProduct = ({navigation}) => {
  (async () => {
    const getToken = await AsyncStorage.getItem('acessToken');
    console.log('njnjbjbjbjbj', getToken);
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
    {label: 'Sports Wear', value: 'sports wear'},
  ];
  const sizeData = [
    {label: 'S', value: 'S'},
    {label: 'M', value: 'M'},
    {label: 'L', value: 'L'},
    {label: 'XL', value: 'XL'},
    {label: 'XXL', value: 'XXL'},
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
  const [value, setValue] = useState(null);
  const [subValue, setSubValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [colors, setColors] = useState([]);
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('acessToken');
      setLOginToken(token);
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'});
    setSelectedImages(result);
  };

  const Camera = <Entypo name="camera" size={30} color="#000" />;
  const Camera1 = <Entypo name="camera" size={30} color="blue" />;
  const gallery = <MaterialIcons name="perm-media" size={30} color="blue" />;
  const close = <Entypo name="circle-with-cross" size={25} color="blue" />;

  const handleInputChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };

  return (
    <SafeAreaView style={{marginBottom: 85, marginTop: 25}}>
      <ImageBackground
        style={{height: '100%'}}
        source={require('../assets/productBack.jpg')}>
        <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
          <Ionicons
            style={{marginTop: -25, marginLeft: 5}}
            name="arrow-back"
            size={35}
            color={'#14489c'}
          />
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{
              width: '98%',
              borderRadius: 10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginTop: 80,
                fontSize: 25,
                fontWeight: '600',
                color: '#74a1e8',
                marginLeft: 25,
              }}>
              Add Product
            </Text>
            <Image
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                borderRadius: 20,
              }}
              source={require('../assets/backk.png')}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#606263',
              fontWeight: '600',
            }}>
            Fill the product details to add product!
          </Text>
          <View
            style={{
              height: 1,
              width: '90%',
              backgroundColor: 'grey',
              alignSelf: 'center',
              marginBottom: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.label}>Product Category:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#4075c9'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={categoryData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Category' : 'Select One'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />

          <Text style={styles.label}>Product Sub Category:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#4075c9'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={subCategoryData}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Sub Category' : 'Select One'}
            value={subValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSubValue(item.value);
              setIsFocus(false);
            }}
          />
          <Text style={styles.label}>Product Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            // onChangeText={(text) => setName(text)}
            // value={name}
          />
          <Text style={styles.label}>Product Image:</Text>

          {!image ? (
            <View
              style={{
                height: 130,
                width: '80%',
                borderColor: '#74a1e8',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
                marginBottom: 10,
                backgroundColor: '#ededed',
                marginLeft: 45,
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
                    marginTop: -35,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  +Add Photo
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
          <Text style={styles.label}>Sizes Available:</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Dropdown
              style={[styles.sizedropdown, isFocus && {borderColor: '#4075c9'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={sizeData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select size' : 'Select One'}
              value={size}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSize(item.value);
                setIsFocus(false);
              }}
            />
            <TextInput
              style={{
                width: '35%',
                height: 50,
                borderWidth: 1,
                borderColor: '#74a1e8',
                borderRadius: 10,
                marginBottom: 15,
                paddingHorizontal: 15,
                fontSize: 16,
                alignSelf: 'center',
                marginLeft: 15,
              }}
              placeholder="Enter quantity"
              onChangeText={handleInputChange}
              value={quantity}
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              // onChangeText={(text) => setName(text)}
              // value={name}
            />
          </View>
          <Text style={styles.label}>Colors Available:</Text>
          <DropDownPicker
            style={{
              height: 50,
              width: '80%',
              alignSelf: 'center',
              borderColor: '#74a1e8',
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
              width: 314,
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
              borderColor: '#74a1e8',
              borderRadius: 10,
              marginBottom: 15,
              paddingHorizontal: 15,
              fontSize: 16,
              alignSelf: 'center',
            }}
            placeholder="Enter Price"
            onChangeText={handleInputChange}
            value={quantity}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            // onChangeText={(text) => setName(text)}
            // value={name}
          />
          <Text style={styles.label}>Minimum Quantity for Order:</Text>

          <TextInput
            style={{
              width: '80%',
              height: 50,
              borderWidth: 1,
              borderColor: '#74a1e8',
              borderRadius: 10,
              marginBottom: 15,
              paddingHorizontal: 15,
              fontSize: 16,
              alignSelf: 'center',
            }}
            placeholder="Enter Price"
            onChangeText={handleInputChange}
            value={quantity}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            // onChangeText={(text) => setName(text)}
            // value={name}
          />
          <Text style={styles.label}>Product Description:</Text>
          <TextInput
            style={{
              width: '80%',
              height: 50,
              borderWidth: 1,
              borderColor: '#74a1e8',
              borderRadius: 10,
              marginBottom: 15,
              paddingHorizontal: 15,
              fontSize: 16,
              alignSelf: 'center',
              height: 100,
              paddingVertical: 8,
            }}
            placeholder="Enter product description..."
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            multiline={true}
            numberOfLines={5} // You can adjust the number of visible lines
            // onChangeText={(text) => setName(text)}
            // value={name}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              <Ionicons name="add-circle-outline" size={25} /> Add
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
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
    color: '#0f387a',
    marginTop: 10,
    marginLeft: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#74a1e8',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    borderColor: '#74a1e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  sizedropdown: {
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderColor: '#74a1e8',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#acafb5',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
  },
  loginButtonText: {
    color: '#fff',
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
