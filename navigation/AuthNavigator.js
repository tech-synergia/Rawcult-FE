import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../auth/LoginScreen';
import {useNavigation} from '@react-navigation/native';
import RegisterScreen from '../auth/RegisterScreen';
import ForgetPassword from '../auth/ForgetPassword';
import RetailerHomeScreen from '../home/RetailerHomeScreen';
import ManufacturerHomeScreen from '../home/ManufacturerHomeScreen';
import Categories from '../retailerScreen/Categories';
import Cart from '../retailerScreen/Cart';
import Profile from '../retailerScreen/Profile';
import RetailerBottomTabNavigation from './RetailerBottomTabNavigation';
import ManufacturorBottomTabNavigation from './ManufacturorBottomTabNavigation';
import SplashScreen from '../screens/SplashScreen';
import AddProduct from '../manufacturerScreen/AddProduct';
import ProductDetail from '../retailerScreen/ProductDetail';
import ProductInfo from '../manufacturerScreen/ProductDetail';
import AdminDashboardScreen from '../admin/AdminDashboardScreen';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  const navigation = useNavigation();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {showSplashScreen ? (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      ) : null}
      <Stack.Screen name="Signin" component={LoginScreen} />
      <Stack.Screen name="Signup" component={RegisterScreen} />
      <Stack.Screen name="Forget" component={ForgetPassword} />
      <Stack.Screen
        name="ReatilerHome"
        component={RetailerBottomTabNavigation}
      />
      <Stack.Screen name="MfHome" component={ManufacturorBottomTabNavigation} />
      <Stack.Screen name="add" component={AddProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
