import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SellsDetailsScreen = ({route}) => {
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

    // Fetch the isReceived value for the order
    axios
      .get(`http://localhost:3000/order/isReceived/${order._id}`)
      .then(response => {
        setIsReceived(response.data.isReceived);
      })
      .catch(error => {
        console.error('Error fetching isReceived value:', error);
      });
  }, [order]);

  const contactSeller = () => {
    navigation.navigate('SellerContactScreen', {
      sellerName: bookData.sellerName,
      sellerId: bookData.sellerId,
    });
  };

  const handleOrderAccepted = () => {
    axios
      .put(`http://localhost:3000/order/accepted/${order._id}`)
      .then(() => {
        setIsAccepted(true);
      })
      .catch(error => {
        console.error('Error marking order as accepted:', error);
      });
  };

  const handleOrderDispatched = () => {
    axios
      .put(`http://localhost:3000/order/dispatched/${order._id}`)
      .then(() => {
        setIsDispatched(true);
      })
      .catch(error => {
        console.error('Error marking order as dispatched:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">
        Sell Details
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
          <Text style={styles.title}>order Id: #{order._id}</Text>
          <Text style={styles.title}>{bookData.bookName}</Text>
          <Text style={styles.text}>Author: {bookData.authorName}</Text>
          <Text style={styles.text}>Description: {bookData.description}</Text>
          <Text style={styles.text}>Price: Rs. {bookData.price}</Text>

          <Text className="my-4 text-center text-2xl font-semibold  text-[#55898D]">
            Order Status {order.status}
          </Text>
          <View className="flex flex-col gap-4 mt-6 px-14 items-center">
            {isAccepted ? (
              <Text className="text-center text-base text-[#0C356A]">
                You already accepted order !✅
              </Text>
            ) : (
              <TouchableOpacity
                className="bg-[#fbbf24] py-2 w-full flex flex-row justify-center rounded-xl"
                onPress={handleOrderAccepted}>
                <Text className="text-black text-base font-semibold">
                  Accept Order
                </Text>
              </TouchableOpacity>
            )}

            {isDispatched ? (
              <Text className="text-center text-base text-[#0C356A]">
                Order dispatched already 🚚
              </Text>
            ) : (
              <TouchableOpacity
                className="bg-[#fbbf24] py-2 w-full flex flex-row justify-center rounded-xl"
                onPress={handleOrderDispatched}>
                <Text className="text-black text-base font-semibold">
                  Dispatch Order
                </Text>
              </TouchableOpacity>
            )}

            {isReceived ? (
              <Text className="text-center text-base text-2xl font-semibold text-[#219C90]">
                Order Received ✔️
              </Text>
            ) : (
              <Text style={styles.notReceivedText}>Order Not Received yet</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SellsDetailsScreen;
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
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E8921',
  },
  receivedText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63B758',
  },
  acceceptedButton: {
    marginLeft: 80,
    width: '50%',
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  dispatchedButton: {
    marginLeft: 80,
    width: '50%',
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  OrderAcceceptedText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3136E0',
    marginBottom: 10,
  },
  OrderDispatchedText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3136E0',
    marginBottom: 10,
  },
  notReceivedText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E37A2C',
  },
});
