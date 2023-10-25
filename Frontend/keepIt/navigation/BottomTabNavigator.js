import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../src/screens/HomeScreen';
import AddNewBook from '../src/screens/AddNewBook';
import CartScreen from '../src/screens/CartScreen';
import MenuScreen from '../src/screens/MenuScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Home',
      }}
    />

    <Tab.Screen
      name="AddNewBook"
      component={AddNewBook}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Add',
      }}
    />

    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Cart',
      }}
    />

    <Tab.Screen
      name="MenuScreen"
      component={MenuScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="menu-outline" color={color} size={size} />
        ),
        tabBarLabel: 'Menu',
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
