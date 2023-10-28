import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import MyOrderCard from '../components/MyOrderCard';

const MyListinings = () => {

    
    return (
        <View style={styles.container}>
        <ScrollView>
          <view style={styles.container}>

            <Text style={styles.title}>My Listings</Text>
            </view>
        </ScrollView>
        </View>
    );
    }