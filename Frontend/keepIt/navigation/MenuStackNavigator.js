import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../src/screens/MenuScreen';
import UpdatePaymentDetails from '../src/screens/UpdatePaymentDetails';
import UpdateProfileDetails from '../src/screens/UpdateProfileDetails';
import OrderDetailScreen from '../src/screens/OrderDetailScreen';
import MyPurchases from '../src/screens/MyPurchases';
import MySales from '../src/screens/MySales';
import SellsDetailsScreen from '../src/screens/SellsDetailsScreen';

const MenuStack = createStackNavigator();

const MenuStackNavigator = () => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name="MenuScreen"
      component={MenuScreen}
      options={{ headerShown: false }}
    />
    <MenuStack.Screen
      name="UpdatePaymentDetails"
      component={UpdatePaymentDetails}
      options={{ headerShown: false }}
    />
    <MenuStack.Screen
      name="UpdateProfileDetails"
      component={UpdateProfileDetails}
      options={{ headerShown: false }}
    />

    <MenuStack.Screen
      name="OrderDetailScreen"
      component={OrderDetailScreen}
      options={{ headerShown: false }}
    />

    <MenuStack.Screen
      name="MyPurchases"
      component={MyPurchases}
      options={{ headerShown: false }}
    />

    <MenuStack.Screen
      name="MySales"
      component={MySales}
      options={{ headerShown: false }}
    />

    <MenuStack.Screen
      name="SellsDetailsScreen"
      component={SellsDetailsScreen}
      options={{ headerShown: false }}
    />
  </MenuStack.Navigator>
);

export default MenuStackNavigator;
