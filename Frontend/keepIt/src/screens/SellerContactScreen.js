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
        <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">Contact Seller</Text>
      </View>
      
      {sellerData && (
        <View style={styles.sellerInfoContainer}>
          <Image source={{ uri: sellerData.profilePicture }} style={styles.profileImage} />
          <Text className="text-[#55898D] font-semibold text-2xl">{sellerData.fullName}</Text>
          <Text className="text-base text-black">📧 {sellerData.email}</Text>
          <Text className="text-base text-black">☎️ {sellerData.mobileNo}</Text>
          <Text className="text-base text-black">🗺️ {sellerData.address}</Text>
          {/* Include other seller details as needed */}
        </View>
        )}

      <TouchableOpacity className="flex flex-row justify-center items-center mx-10 mt-4 py-4 rounded-xl bg-[#55898D]">
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
