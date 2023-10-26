import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';


function CartScreen() {
const {userId} = useAuth();

    return (
        <View>
           
            <Text>{userId}</Text>
           <Text> Cart Items</Text>
            </View>
    );
}

export default CartScreen;
