import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Axios from 'axios';

function AddPaymentScreen({ route }) {
  const { userId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Fetch user data based on the userId
    Axios.get(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]);

  const handleConfirmPayment = () => {
    // Prepare order details
    const orderData = {
      bookId: route.params.bookId,
      buyerId: userId,
      sellerId: route.params.sellerId, // You should retrieve the seller's ID from your data
      totalPrice: route.params.bookPrice,
      isAccepted: false,
      isDispatched: false,
      isReceived: false,
    };

    // Send the order data to the server
    Axios.post('http://localhost:3000/order/create', orderData)
      .then((response) => {
        // Order created successfully
        setIsPaymentConfirmed(true);

        // Update the book's isAvailable to false
        Axios.put(`http://localhost:3000/book/setUnavailable/${route.params.bookId}`)
          .then((response) => {
            // Book availability updated
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return <Text>User data not found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerHeader}>
        <Text style={styles.header}>Add Payment</Text>
      </View>


 
      {/* Full Name */}
      <View style={styles.rowContainer}>
        <Text style={styles.fullName}>{userData.fullName}</Text>
        <Text style={styles.AddressText}>Address</Text>
      </View>

      {/* Address */}
      <View style={styles.box}>
        <Text style={styles.province}>{userData.province}</Text>
        <Text style={styles.Address}>{userData.address}</Text>
      </View>

{/* Card Details */}
<View style={styles.cardbox}>
<View style={styles.cardheader}>
  <View style={styles.cardLeft}>
    <Image source={require('../assets/card.png')} style={styles.cardImage} />
  </View>
  <View style={styles.cardRight}>
    <Text style={styles.cardHolder}>{userData.cardHolderName}</Text>
    <Text style={styles.cardNumber}>{userData.cardNumber}</Text>
  </View>
</View>
</View>

      {/* Item Details */}

      <Text style={styles.cardheader}>Item Details</Text>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Book Name:</Text>
          <Text style={styles.value}>{route.params.bookName}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>Rs. {route.params.bookPrice}</Text>
        </View>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.total}>Total = Rs. {route.params.bookPrice}</Text>
      </View>

      
         {/* Confirm Payment Button */}
         {!isPaymentConfirmed ? (
        <View style={styles.centerButton}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmPayment}
          >
            <Text style={styles.confirmButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.paymentConfirmedText}>Payment Confirmed!</Text>
      )}
    </ScrollView>
  );
}

export default AddPaymentScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  centerHeader: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
  },
  cardbox: {
    
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,

  },

  cardheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
    marginTop: 16,

  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
  AddressText:{
    fontSize: 16,
    
    color: 'green',
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardbox: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  fullName:{
    fontSize: 16,
    color: 'black',
  },
    Address:{
        fontSize: 16,
        color: 'black',
    },
    province:{
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',

    },
    cardHolder:{
        fontSize: 16,
        color: 'black',
    },
    cardNumber:{
        fontSize: 16,
        color: 'black',
    },
    total:{
        marginLeft: 210,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    confirmButton:{
      marginBottom: 30,
        marginTop: 16,
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    confirmButtonText:{
        fontSize: 16,
        color: 'white',
    },
    bookID:{
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    }, cardImage: {
      width: 80, // Set the appropriate width
      height: 80, // Set the appropriate height
      marginRight: 10, // Adjust the margin as needed
    },
    cardDetails: {
      flex: 1,
    },
    cardheader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardLeft: {
      marginRight: 50, // Adjust the margin as needed
    },
    cardRight: {
      flex: 1,
    },
    paymentConfirmedText:{
      marginTop: 35,
      color:'green',
      textAlign:'center',
      fontWeight:'bold',
      fontSize:20,
    }
        

});
