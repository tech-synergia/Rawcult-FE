import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesCard from '../components/CategoriesCard';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';

export default function WomenCasual({navigation}) {
  const [womenCasualData, setWomenCasualData] = useState([]);
  const image8 = require('../assets/womenBottom.webp');

  const WomenCasualWearData = async () => {
    const categoryData = {
      category: 'womens wear',
      subCategory: 'sports wear',
    };

    try {
      const response = await axios.post(
        'https://rawcult-be.vercel.app/products/getSubCategory',
        categoryData,
      );
      if (response.status === 200 || 201) {
        setWomenCasualData(response?.data?.product);
      } else {
        // Show error message
        Alert.alert('Error', 'Something Went Wrong!');
      }
    } catch (error) {
      Alert.alert('Error', error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    WomenCasualWearData();
  });

  return (
    <View style={{marginTop: 10, marginBottom: 100}}>
      <TouchableOpacity onPress={() => navigation.navigate('ReatilerHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginBottom: 10,
        }}>
        WOMEN'S CASUAL WEAR ({womenCasualData?.length})
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
          }}>
          {womenCasualData.map((item, index) => (
            <CategoriesCard
              key={index}
              name={item?.name}
              price={Number(item?.price).toFixed(2)}
              image={{uri: item?.image[0]}}
              productId={item?._id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
