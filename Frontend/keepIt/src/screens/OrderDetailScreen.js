import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const OrderDetailScreen = ({route}) => {
  const {order} = route.params;
  const [bookData, setBookData] = useState(null);
  const [isReceived, setIsReceived] = useState(false); // Initialize isReceived as false
  const [isAccepted, setIsAccepted] = useState(order.isAccepted || false); // Initialize isAccepted based on order data
  const [isDispatched, setIsDispatched] = useState(order.isDispatched || false); // Initialize isDispatched based on order data
  const navigation = useNavigation();

  // Fetch book data and isReceived value when the component mounts or when order changes
  useEffect(() => {
    axios
      .get(`http://localhost:3000/book/details/${order.bookId}`)
      .then(response => {
        setBookData(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });

    // Fetch the isReceived value for the order
    axios
      .get(`http://localhost:3000/order/isReceived/${order._id}`)
      .then(response => {
        setIsReceived(response.data.isReceived);
      })
      .catch(error => {
        console.error('Error fetching isReceived value:', error);
      });

    // Fetch isAccepted and isDispatched values
    axios
      .get(`http://localhost:3000/order/isAccepted/${order._id}`)
      .then(response => {
        setIsAccepted(response.data.isAccepted);
      })
      .catch(error => {
        console.error('Error fetching isAccepted value:', error);
      });

    axios
      .get(`http://localhost:3000/order/isDispatched/${order._id}`)
      .then(response => {
        setIsDispatched(response.data.isDispatched);
      })
      .catch(error => {
        console.error('Error fetching isDispatched value:', error);
      });
  }, [order]);

  const contactSeller = () => {
    navigation.navigate('SellerContactScreen', {
      sellerName: bookData.sellerName,
      sellerId: bookData.sellerId,
    });
  };

  const handleOrderReceived = () => {
    // Send a request to your backend to update isReceived for this order
    axios
      .put(`http://localhost:3000/order/received/${order._id}`)
      .then(() => {
        setIsReceived(true); // Update the local state to show the message
      })
      .catch(error => {
        console.error('Error marking order as received:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">
        Order Details
      </Text>
      {bookData && (
        <View style={styles.contentContainer}>
          {bookData.coverPhoto &&
            bookData.secondaryImage &&
            bookData.thirdImage && (
              <View style={styles.swiperContainer}>
                <Swiper showsButtons={true} showsPagination={true}>
                  <Image
                    source={{uri: bookData.coverPhoto}}
                    style={styles.image}
                  />
                  <Image
                    source={{uri: bookData.secondaryImage}}
                    style={styles.image}
                  />
                  <Image
                    source={{uri: bookData.thirdImage}}
                    style={styles.image}
                  />
                </Swiper>
              </View>
            )}
          <View className="flex flex-col  gap-2">
            <Text className="text-[#55898D] font-semibold text-2xl">
              {bookData.bookName}
            </Text>
            <Text className="text-base text-black">
              by {bookData.authorName}
            </Text>
            <Text className="text-base text-black leading-normal whitespace-nowrap">
              {bookData.description}
            </Text>
            <Text className="text-teal-800 text-xl">
              Rs. {bookData.price}.00
            </Text>
            <Text className="text-black text-base font-semibold">
              Sell by : {bookData.sellerName}
            </Text>
            <TouchableOpacity
              className="bg-amber-400 flex w-1/3 py-2 flex-row justify-center rounded-xl mt-2"
              onPress={contactSeller}>
              <Text className="text-base text-black ">Contact Seller</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusContainer}>
            <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">Order Status {order.status}</Text>

            {isAccepted ? (
              <Text style={styles.receivedText}>Your order is Accepted</Text>
            ) : (
              <Text> waiting for the seller to accept your order</Text>
            )}

            {isDispatched ? (
              <Text style={styles.receivedText}>Your order is Dispatched</Text>
            ) : (
              <Text> waiting for the seller to dispatch your order</Text>
            )}

            {isReceived ? (
              <Text style={styles.receivedText}>
                You already received your package
              </Text>
            ) : (
              <TouchableOpacity
              className="flex flex-row justify-center items-center mx-10 mt-4 py-4 rounded-xl bg-[#55898D]"
                onPress={handleOrderReceived}>
                <Text style={styles.OrderReceivedText}>Order Received</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default OrderDetailScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  swiperContainer: {
    height: 200,
    width: '80%',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    width: '30%',
    backgroundColor: '#DEDECF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#32322B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginBottom: 30,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  OrderReceivedButton: {
    marginLeft: 80,
    width: '50%',
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  OrderReceivedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  receivedText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63B758',
  },
});
