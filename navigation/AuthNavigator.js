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
import AllOrders from '../manufacturerScreen/profile/AllOrders';
import Setting from '../manufacturerScreen/profile/Settting';
import AboutUs from '../retailerScreen/profile/AboutUs';
import HelpCenter from '../retailerScreen/profile/HelpCenter';
import PrivacyPolicy from '../retailerScreen/profile/PrivacyPolicy';
import MyOrders from '../retailerScreen/profile/MyOrders';
import Settings from '../retailerScreen/profile/Settings';
import Privacy from '../manufacturerScreen/profile/PrivacyPolicy';
import Help from '../manufacturerScreen/profile/HelpCenter';
import WomenFormal from '../screens/WomenFormal';
import WomenCasual from '../screens/WomenCasual';
import MenTopScreen from '../screens/MenTopScreen';
import MenBottomScreen from '../screens/MenBottomScreen';
import MenCasual from '../screens/MenCasual';
import MenFormal from '../screens/MenFormal';
import KidsTopScreen from '../screens/KidsTopScreen';
import KidsBottomScreen from '../screens/KidsBottomScreen';
import KidsCasual from '../screens/KidsCasual';
import KidsFormal from '../screens/KidsFormal';
import WomenAccessories from '../screens/WomenAccessories';
import MenAccessories from '../screens/MenAccessories';
import KidsAccessories from '../screens/KidsAccessories';
import AllProducts from '../screens/AllProducts';
import PreoductNotification from '../manufacturerScreen/ProductsNotifucation';
import WomenBottomScreen from '../screens/WomenBottomWearScreen';
import Categories from '../retailerScreen/Categories';
import About from '../manufacturerScreen/profile/AboutUs';

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
      <Stack.Screen name="womenBottom" component={WomenBottomScreen} />
      <Stack.Screen name="womenCasual" component={WomenCasual} />
      <Stack.Screen name="womenFormal" component={WomenFormal} />
      <Stack.Screen name="menTop" component={MenTopScreen} />
      <Stack.Screen name="menBottom" component={MenBottomScreen} />
      <Stack.Screen name="menCasual" component={MenCasual} />
      <Stack.Screen name="menFormal" component={MenFormal} />
      <Stack.Screen name="kidsTop" component={KidsTopScreen} />
      <Stack.Screen name="kidsBottom" component={KidsBottomScreen} />
      <Stack.Screen name="kidsFormal" component={KidsFormal} />
      <Stack.Screen name="kidsCasual" component={KidsCasual} />
      <Stack.Screen name="womenAcess" component={WomenAccessories} />
      <Stack.Screen name="menAcess" component={MenAccessories} />
      <Stack.Screen name="kidsAcess" component={KidsAccessories} />
      <Stack.Screen name="payment" component={PaymentOptions} />
      <Stack.Screen name="allOrders" component={AllOrders} />
      <Stack.Screen name="myOrders" component={MyOrders} />
      <Stack.Screen name="about" component={AboutUs} />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="help" component={HelpCenter} />
      <Stack.Screen name="privacy" component={PrivacyPolicy} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="allProducts" component={AllProducts} />
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="Notify" component={PreoductNotification} />
      <Stack.Screen name="categories" component={Categories} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
