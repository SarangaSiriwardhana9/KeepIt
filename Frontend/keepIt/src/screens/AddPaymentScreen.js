import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Axios from 'axios';

function AddPaymentScreen({route}) {
  const {userId} = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Fetch user data based on the userId
    Axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
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
      .then(response => {
        // Order created successfully
        setIsPaymentConfirmed(true);

        // Update the book's isAvailable to false
        Axios.put(
          `http://localhost:3000/book/setUnavailable/${route.params.bookId}`,
        )
          .then(response => {
            // Book availability updated
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return <Text>User data not found.</Text>;
  }

  function formatCardNumber(cardNumber) {
    // Ensure cardNumber is a string
    const cardNumberStr = cardNumber.toString();

    // Keep the first 4 and last 4 digits
    const first4 = cardNumberStr.slice(0, 4);
    const last4 = cardNumberStr.slice(-4);

    // Replace the middle digits with 'x'
    const middleDigits = 'x'.repeat(cardNumberStr.length - 8);

    // Combine the formatted parts
    return first4 + middleDigits + last4;
  }

  //delivery charge
  const deliveryCharge = 350;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerHeader}>
        <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">
          Add Payment
        </Text>
      </View>

      {/* Full Name */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg text-[#55898D] pl-1">Customer Name: </Text>
        <View style={styles.box}>
          <Text className="text-black text-lg">{userData.fullName}</Text>
        </View>
      </View>

      {/* Address */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg text-[#55898D] pl-1">Address : </Text>
        <View style={styles.box}>
          <Text className="text-lg font-semibold  text-black">
            {userData.province}
          </Text>
          <Text className="text-black text-lg">{userData.address}</Text>
        </View>
      </View>

      {/* Card Details */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg text-[#55898D] pl-1">Payment Method : </Text>

        <View style={styles.cardbox}>
          <View style={styles.cardheader}>
            <View style={styles.cardLeft}>
              <Image
                source={require('../assets/card.png')}
                style={styles.cardImage}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-black text-lg">
                {userData.cardHolderName}
              </Text>
              <Text style={styles.cardNumber}>
                {formatCardNumber(userData.cardNumber)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Item Details */}

      <Text className="text-lg text-[#55898D]">Item Details</Text>
      <View className="flex flex-col gap-2">
        <View className="flex flex-row  justify-between px-4">
          <Text style={styles.label}>Book Name:</Text>
          <Text className="text-black text-lg">{route.params.bookName}</Text>
        </View>
        <View className="flex flex-row  justify-between px-4">
          <Text style={styles.label}>Price:</Text>
          <Text className="text-black text-lg">
            Rs. {route.params.bookPrice}.00
          </Text>
        </View>
        <View className="flex flex-row  justify-between px-4">
          <Text style={styles.label}>Delivery Charge:</Text>
          <Text className="text-black text-lg">Rs. {deliveryCharge}.00</Text>
        </View>
      </View>
      <View className="h-[2px] bg-[#55898D] mx-4 my-2" />
      <View>
        <Text className="text-[#55898D] px-4 text-right font-semibold text-lg">
          Total = Rs. {route.params.bookPrice + deliveryCharge}.00
        </Text>
      </View>

      {/* Confirm Payment Button */}
      {!isPaymentConfirmed ? (
        <View style={styles.centerButton}>
          <TouchableOpacity
            className="flex flex-row justify-center items-center mx-10 mt-4 mb-10 py-4 rounded-xl bg-[#55898D]"
            onPress={handleConfirmPayment}>
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
  AddressText: {
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
  fullName: {
    fontSize: 16,
    color: 'black',
  },
  Address: {
    fontSize: 16,
    color: 'black',
  },
  province: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  cardHolder: {
    fontSize: 16,
    color: 'black',
  },
  cardNumber: {
    fontSize: 16,
    color: 'black',
  },
  total: {
    marginLeft: 210,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  confirmButton: {
    marginBottom: 30,
    marginTop: 16,
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
  },
  bookID: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  cardImage: {
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
  paymentConfirmedText: {
    color: 'green',
  },
});
