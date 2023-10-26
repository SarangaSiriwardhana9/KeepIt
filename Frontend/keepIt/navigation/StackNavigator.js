import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../context/AuthContext';
import {CartProvider } from '../context/CartContext';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import BookDetailScreen from '../src/screens/BookDetailScreen';
import UpdateProfileDetails from '../src/screens/UpdateProfileDetails';
import UpdatePaymentDetails from '../src/screens/UpdatePaymentDetails';
import SellerContactScreen from '../src/screens/SellerContactScreen';
import AddPaymentScreen from '../src/screens/AddPaymentScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <AuthProvider>
    <CartProvider>
  
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfileDetails" component={UpdateProfileDetails} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePaymentDetails" component={UpdatePaymentDetails} options={{ headerShown: false }} />
       <Stack.Screen name="SellerContactScreen" component={SellerContactScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPaymentScreen" component={AddPaymentScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </CartProvider>

  </AuthProvider>
);

export default StackNavigator;
