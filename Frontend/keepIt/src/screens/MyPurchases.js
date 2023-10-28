import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import MyOrderCard from '../components/MyOrderCard';

const MyPurchases = ({ navigation }) => {
  const { userId, userName } = useAuth();
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  // Fetch user's purchased books when the component mounts
  useEffect(() => {
    if (userId) {
      fetchPurchasedBooks();
    }
  }, [userId]);

  const fetchPurchasedBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/order/all?buyerId=${userId}`);
      if (response.ok) {
        const orders = await response.json();

        // Fetch book details for each order
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const bookDetailsResponse = await fetch(`http://localhost:3000/book/details/${order.bookId}`);
            if (bookDetailsResponse.ok) {
              const bookDetails = await bookDetailsResponse.json();
              return { ...order, bookName: bookDetails.bookName, bookCover: bookDetails.coverPhoto, bookPrice: bookDetails.price, authorName: bookDetails.authorName };
            }
            return order;
          })
        );

        setPurchasedBooks(updatedOrders); // Set the entire order data with book details
      }
    } catch (error) {
      console.error('Error fetching purchased books: ', error);
    }
  };

  return (
    <ScrollView>
      <View>
 
        <Text className="my-4 text-center text-xl font-semibold  text-[#55898D]">Purchased Orders</Text>
        {purchasedBooks.map((order, index) => (
          <MyOrderCard key={index} order={order} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  HeaderTxt: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
});

export default MyPurchases;
