import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import Colors from '../components/Colors';
import LinearGradient from 'react-native-linear-gradient';
// import HomeScreen from '../home/RetailerHomeScreen';
import * as Animatable from 'react-native-animatable';
// import Categories from '../screen/Categories';
// import Wishlist from '../screen/Wishlist';
// import Cart from '../screen/Cart';
// import Profile from '../screen/Profile';
// import ProductListScreen from '../manufacturerScreen/ProductListScreen';
import RetailerHomeScreen from '../home/RetailerHomeScreen';
// import TabViewExample from '../screen/Tabview';
import Cart from '../retailerScreen/Cart';
import Categories from '../retailerScreen/Categories';
import Profile from '../retailerScreen/Profile';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: RetailerHomeScreen,
  },
  {
    route: 'Categories',
    label: 'Categories',
    type: Icons.Ionicons,
    activeIcon: 'grid',
    inActiveIcon: 'grid-outline',
    component: Categories,
  },

  {
    route: 'Search',
    label: 'Search',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'shopping',
    inActiveIcon: 'shopping-outline',
    component: Cart,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons.FontAwesome,
    activeIcon: 'user',
    inActiveIcon: 'user-o',
    component: Profile,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? '#fff' : Colors.gray}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function RetailerBottomTabNavigation() {
  // useEffect(() => {
  //   if (TabArr[0].route === 'Home') {
  //     const backAction = () => {
  //       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );

  //     return () => backHandler.remove();
  //   }
  // }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
          position: 'absolute',
          bottom: 5,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: '#006DFF',
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              //   tabBarShowLabel: false,
              tabBarLabel: item.label,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
