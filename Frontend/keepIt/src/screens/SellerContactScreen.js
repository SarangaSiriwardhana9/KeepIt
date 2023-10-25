import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SellerContactScreen = ({ route }) => {
  const { sellerId } = route.params;
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    // Make an API request to fetch seller data by sellerId
    axios
      .get(`http://localhost:3000/user/seller/${sellerId}`)
      .then((response) => {
        setSellerData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sellerId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contact Seller</Text>
      </View>
      
      {sellerData && (
        <View style={styles.sellerInfoContainer}>
          <Image source={{ uri: sellerData.profilePicture }} style={styles.profileImage} />
          <Text style={styles.sellerName}>{sellerData.fullName}</Text>
          <Text style={styles.sellerDetail}>Email: {sellerData.email}</Text>
          <Text style={styles.sellerDetail}>Phone: {sellerData.mobileNo}</Text>
          <Text style={styles.sellerDetail}>Address: {sellerData.address}</Text>
          {/* Include other seller details as needed */}
        </View>
        )}

      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Seller</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Background color
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F3F35', // Text color
  },
  sellerInfoContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // Add a shadow
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  sellerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3F3F35',
  },
  sellerDetail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#474740',
  },
  contactButton: {
    backgroundColor: '#007bff', // Button color
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  contactButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SellerContactScreen;
