import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import BookDetailScreen from '../src/screens/BookDetailScreen';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="BookDetail"
      component={BookDetailScreen}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
