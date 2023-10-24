import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthProvider from '../context/AuthContext';
import BottomTabNavigator from './BottomTabNavigator';
import BookDetailScreen from '../src/screens/BookDetailScreen';
import UpdateProfileDetails from '../src/screens/UpdateProfileDetails';
import UpdatePaymentDetails from '../src/screens/UpdatePaymentDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfileDetails" component={UpdateProfileDetails} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePaymentDetails" component={UpdatePaymentDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default AppNavigator;