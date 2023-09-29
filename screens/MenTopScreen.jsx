import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriesCard from '../components/CategoriesCard';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';

export default function MenTopScreen({navigation}) {
  const [womenTopData, setWomenTopData] = useState([]);
  const image8 = require('../assets/forth.jpg');

  const WomenTopWearData = async () => {
    const categoryData = {
      category: 'mens wear',
      subCategory: 'top wear',
    };

    try {
      const response = await axios.post(
        'https://rawcult-be.vercel.app/products/getSubCategory',
        categoryData,
      );
      if (response.status === 200 || 201) {
        setWomenTopData(response?.data?.product);
      } else {
        // Show error message
        Alert.alert('Error', 'Something Went Wrong!');
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.msg);
    }
  };

  useEffect(() => {
    WomenTopWearData();
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
        MEN'S TOP WEAR ({womenTopData?.length})
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
        {womenTopData.map((item, index) => (
          <CategoriesCard
            key={index}
            name={item?.name}
            price={Number(item?.price).toFixed(2)}
            image={image8}
            productId={item?._id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
