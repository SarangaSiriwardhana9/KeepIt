import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../src/screens/MenuScreen';
import UpdatePaymentDetails from '../src/screens/UpdatePaymentDetails';
import UpdateProfileDetails from '../src/screens/UpdateProfileDetails';

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
  </MenuStack.Navigator>
);

export default MenuStackNavigator;
