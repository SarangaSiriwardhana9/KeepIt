import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SellerContactScreen = ({ route }) => {
  const { sellerId } = route.params;
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    // Fetch seller information by sellerId from your backend
    const fetchSellerInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-seller-by-id/${sellerId}`);
        setSellerInfo(response.data);
      } catch (error) {
        console.error('Error fetching seller information:', error);
      }
    };

    fetchSellerInfo();
  }, [sellerId]);

  return (
    <View style={styles.container}>
      {sellerInfo ? (
        <>
          <Text style={styles.title}>Seller Contact Information</Text>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{sellerInfo.fullName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{sellerInfo.email}</Text>
          <Text style={styles.label}>Mobile Number:</Text>
          <Text style={styles.text}>{sellerInfo.mobileNo}</Text>
          {/* Add more seller information fields here */}
        </>
      ) : (
        <Text style={styles.loading}>Loading seller information...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  loading: {
    fontSize: 16,
  },
});

export default SellerContactScreen;
