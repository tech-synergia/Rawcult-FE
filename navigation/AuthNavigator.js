import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../auth/LoginScreen';
import {useNavigation} from '@react-navigation/native';
import RegisterScreen from '../auth/RegisterScreen';
import ForgetPassword from '../auth/ForgetPassword';
import Cart from '../retailerScreen/Cart';
import RetailerBottomTabNavigation from './RetailerBottomTabNavigation';
import ManufacturorBottomTabNavigation from './ManufacturorBottomTabNavigation';
import SplashScreen from '../screens/SplashScreen';
import AddProduct from '../manufacturerScreen/AddProduct';
import ProductDetail from '../retailerScreen/ProductDetail';
import ProductInfo from '../manufacturerScreen/ProductDetail';
import WishlistScreen from '../screens/WishlistScreen';
import NotificationScreen from '../screens/NotificationScreen';
import WomenTopScreen from '../screens/WomenTopScreen';
import RetailerForm from '../retailerScreen/RetailerForm';
import WaitingApprovalScreen from '../screens/FormApproval';
import ManufacturorForm from '../manufacturerScreen/ManufacturorForm';
import PaymentOptions from '../retailerScreen/PaymentOptions';
import WomenBottomWearScreen from '../screens/WomenBottomWearScreen';
import AllOrders from '../manufacturerScreen/profile/AllOrders';
import Setting from '../manufacturerScreen/profile/Settting';
import AboutUs from '../screens/AboutUs';
import HelpCenter from '../screens/HelpCenter';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import MyOrders from '../retailerScreen/profile/MyOrders';
import Settings from '../retailerScreen/profile/Settings';

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
      <Stack.Screen name="role" component={ManufacturorForm} />
      <Stack.Screen name="retailerForm" component={RetailerForm} />
      <Stack.Screen name="formApproval" component={WaitingApprovalScreen} />

      <Stack.Screen
        name="ReatilerHome"
        component={RetailerBottomTabNavigation}
      />
      <Stack.Screen name="MfHome" component={ManufacturorBottomTabNavigation} />
      <Stack.Screen name="add" component={AddProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="womenTop" component={WomenTopScreen} />
      <Stack.Screen name="womenBottom" component={WomenBottomWearScreen} />
      <Stack.Screen name="payment" component={PaymentOptions} />
      <Stack.Screen name="allOrders" component={AllOrders} />
      <Stack.Screen name="myOrders" component={MyOrders} />
      <Stack.Screen name="about" component={AboutUs} />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="help" component={HelpCenter} />
      <Stack.Screen name="privacy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
