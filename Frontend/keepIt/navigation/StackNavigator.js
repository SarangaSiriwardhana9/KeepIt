import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext'; // Import CartProvider
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import BookDetailScreen from '../src/screens/BookDetailScreen';
import UpdateProfileDetails from '../src/screens/UpdateProfileDetails';
import BottomTabNavigator from './BottomTabNavigator';
import UpdatePaymentDetails from '../src/screens/UpdatePaymentDetails';
import AddNewBook from '../src/screens/AddNewBook';
import SellerContactScreen from '../src/screens/SellerContactScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <AuthProvider>
  
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfileDetails" component={UpdateProfileDetails} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePaymentDetails" component={UpdatePaymentDetails} options={{ headerShown: false }} />
        <Stack.Screen name="SellerContact" component={SellerContactScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

  </AuthProvider>
);

export default StackNavigator;
