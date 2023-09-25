import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRoute} from '@react-navigation/native';

// import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import SizeCard from '../components/SizeCard';
import {ImageSlider} from 'react-native-image-slider-banner';
import {useEffect} from 'react';
const ProductInfo = ({navigation}) => {
  const totalQuantity = 100;
  const [isFocus, setIsFocus] = useState(false);
  const [size, setSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0); // Default quantity
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [textColor, setTextColor] = useState('#000');
  const [availablelQuantity, setAvailablelQuantityy] = useState(totalQuantity);
  const [productSize, setProductSize] = useState();

  const route = useRoute();
  const {id: productId} = route.params;

  console.log('window', productId);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 20) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert(
        'Quantity Limit',
        'Minimum quantity is 20',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  useEffect(() => {
    console.log('QQQQ', quantity);

    setAvailablelQuantityy(totalQuantity - quantity);
  }, [quantity]);

  const handleSizeSelection = size => {
    setSelectedSize(size);
    setQuantity(20);
    setBackgroundColor('#000');
    setTextColor('#fff');
  };

  const handleQuantityChange = text => {
    // Validate and set the quantity
    const parsedQuantity = parseInt(text, 10);
    if (!isNaN(parsedQuantity)) {
      setQuantity(parsedQuantity);
    }
  };

  const images = [
    require('../assets/first.jpg'),
    require('../assets/second.jpg'),
    require('../assets/third.jpg'),
    require('../assets/forth.jpg'),
    require('../assets/fifth.jpg'),
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
  return (
    <View style={{marginTop: 15}}>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <ImageSlider
        caroselImageStyle={{resizeMode: 'cover'}}
        data={images}
        autoPlay={false}
        onItemChanged={item => console.log('item', item)}
        closeIconColor="#000"
      />
      <View>
        <Text style={{marginLeft: 10, fontWeight: '500'}}>
          Red Tape Men Polo Collar Pure Cotton T-shirt
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              fontWeight: '800',
              marginTop: 5,
            }}>
            Total availablle:
          </Text>
          <Text
            style={{
              marginLeft: 3,
              fontSize: 15,
              fontWeight: '700',
              marginTop: 5,
              color: '#000',
            }}>
            {availablelQuantity}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: '700',
            color: '#000',
            marginTop: 5,
            marginLeft: 12,
            fontSize: 20,
          }}>
          <FontAwesome name="rupee" size={18} /> 1200
        </Text>

        <Text
          style={{
            marginLeft: 12,
            marginTop: 15,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Size:
        </Text>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => handleSizeSelection('XS')}>
              <SizeCard
                size={'XS'}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSizeSelection('S')}>
              <SizeCard
                size={'S'}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSizeSelection('M')}>
              <SizeCard
                size={'M'}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSizeSelection('L')}>
              <SizeCard
                size={'L'}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSizeSelection('XL')}>
              <SizeCard
                size={'XL'}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: -25}}>
            <Text
              style={{
                marginLeft: 50,
                fontSize: 18,
                marginBottom: 10,
                fontWeight: '700',
              }}>
              Color:
            </Text>
            <Dropdown
              style={[styles.sizedropdown, isFocus && {borderColor: '#4075c9'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={Colordata}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : 'Select One'}
              value={size}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSize(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        {selectedSize && (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  fontWeight: '700',
                  marginBottom: 10,
                }}>
                Selected Size:
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontWeight: '900',
                  marginBottom: 10,
                  color: '#000',
                }}>
                {selectedSize}
              </Text>
            </View>
            <View style={styles.container}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Ionicons
                  name="remove-outline"
                  size={24}
                  color={quantity === 20 ? '#ccc' : '#000'}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Ionicons name="add-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductInfo;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 410,
    height: '90%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the vertical position as needed
    alignSelf: 'center', // Center the dots horizontally
  },
  paginationDot: {
    width: 8, // Adjust the dot size
    height: 8, // Adjust the dot size
    borderRadius: 4, // Make the dot round
    backgroundColor: '#14489c', // Dot color
    marginHorizontal: 4, // Adjust the space between dots
  },
  dropdown: {
    height: 50,
    width: '50%',
    alignSelf: 'center',
    borderColor: '#74a1e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  sizedropdown: {
    width: 120,
    height: 50,
    borderWidth: 1,
    borderColor: '#74a1e8',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 25,
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#acafb5',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 120,
    marginLeft: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
