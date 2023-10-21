import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UpdatePaymentDetails = ({ route, navigation }) => {
  const { personalInfo } = route.params;
  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardType: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleUpdatePayment = () => {
    // Combine the personal information and payment data before sending to the server
    const updatedData = { ...personalInfo, ...paymentData };

    // Make a request to your backend to update the user's profile with payment details
    axios
      .put(`http://localhost:3000/user/update-payment-details?email=${personalInfo.email}`, updatedData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log('Payment details updated successfully');
        // You can choose to navigate back to the personal information screen or perform any other actions.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Payment Details</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Cardholder's Name"
        placeholderTextColor={'#C4C4C4'}
        value={paymentData.cardHolderName}
        onChangeText={(text) => setPaymentData({ ...paymentData, cardHolderName: text })}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Card Type"
        placeholderTextColor={'#C4C4C4'}
        value={paymentData.cardType}
        onChangeText={(text) => setPaymentData({ ...paymentData, cardType: text })}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Card Number"
        placeholderTextColor={'#C4C4C4'}
        value={paymentData.cardNumber}
        onChangeText={(text) => setPaymentData({ ...paymentData, cardNumber: text })}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Expiration Date"
        placeholderTextColor={'#C4C4C4'}
        value={paymentData.expirationDate}
        onChangeText={(text) => setPaymentData({ ...paymentData, expirationDate: text })}
      />
      <TextInput
        style={styles.inputField}
        placeholder="CVV"
        placeholderTextColor={'#C4C4C4'}
        value={paymentData.cvv}
        onChangeText={(text) => setPaymentData({ ...paymentData, cvv: text })}
      />
      <Button title="Update Payment" onPress={handleUpdatePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
    
  },
});

export default UpdatePaymentDetails;
