import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ProfileUpdatedSuccessfullAlert from '../components/alerts/ProfileUpdateSuccessfullAlert';
import ProfileUpdatedFailed from '../components/alerts/ProfileUpdatedFailedAlert';
import { ScrollView } from 'react-native-gesture-handler';

const UpdatePaymentDetails = ({ navigation }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);

  const openSuccessAlert = () => {
    setIsSuccessAlertVisible(true);
  };

  const closeSuccessAlert = () => {
    setIsSuccessAlertVisible(false);
    navigation.navigate('Home'); // Navigate to HomeScreen
  };

  const openErrorAlert = () => {
    setIsErrorAlertVisible(true);
  };

  const closeErrorAlert = () => {
    setIsErrorAlertVisible(false);
  };



  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardNumber: '',
    cardType: '',
    cardExpirationDate: '',
    cvvNumber: '',
  });
 
  const [existingPaymentData, setExistingPaymentData] = useState(null);

  useEffect(() => {
    // Fetch the user's existing payment data when the component mounts
    if (user) {
      axios
        .get(`http://localhost:3000/user/get-user-by-email?email=${user.email}`)
        .then((response) => {
          setExistingPaymentData(response.data);
          // Populate the payment data input fields with existing data
          setPaymentData({
            cardHolderName: response.data.cardHolderName || '',
            cardNumber: response.data.cardNumber || '',
            cardType: response.data.cardType || '',
            cardExpirationDate: response.data.cardExpirationDate || '',
            cvvNumber: response.data.cvvNumber || '',
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const handleUpdatePayment = () => {
    // Send a PUT request to update the payment data
    axios
      .put(`http://localhost:3000/user/update-payment?email=${user.email}`, paymentData)
      .then((response) => {
        openSuccessAlert();
        console.log('Payment information updated successfully');
        // You can add navigation logic to the next screen here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView >
    <View style={styles.container}>
      <Text style={styles.title}>Update Payment Details</Text>
      <Text style={styles.text}>Card Holder Name</Text>
      <TextInput
  style={styles.inputField}
  placeholder="Card Holder Name"
  value={paymentData.cardHolderName}
  onChangeText={(text) => setPaymentData({ ...paymentData, cardHolderName: text })}
/>
<Text style={styles.text}>Card Number</Text>
<TextInput
  style={styles.inputField}
  placeholder="Card Number"
  value={paymentData.cardNumber}
  onChangeText={(text) => setPaymentData({ ...paymentData, cardNumber: text })}
/>
<Text style={styles.text}>Card Type</Text>
<TextInput
  style={styles.inputField}
  placeholder="Card Type"
  value={paymentData.cardType}
  onChangeText={(text) => setPaymentData({ ...paymentData, cardType: text })}
/>
<Text style={styles.text}>Card Expiration Date</Text>
<TextInput
  style={styles.inputField}
  placeholder="Card Expiration Date"
  value={paymentData.cardExpirationDate}
  onChangeText={(text) => setPaymentData({ ...paymentData, cardExpirationDate: text })}
/>
<Text style={styles.text}>CVV Number</Text>
<TextInput
  style={styles.inputField}
  placeholder="CVV Number"
  value={paymentData.cvvNumber}
  onChangeText={(text) => setPaymentData({ ...paymentData, cvvNumber: text })}
/>

      <Button title="Update Payment" onPress={handleUpdatePayment} />
    </View>
    </SafeAreaView>
    
      <ProfileUpdatedSuccessfullAlert isVisible={isSuccessAlertVisible} onClose={closeSuccessAlert} />
      <ProfileUpdatedFailed isVisible={isErrorAlertVisible} onClose={closeErrorAlert} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default UpdatePaymentDetails;
