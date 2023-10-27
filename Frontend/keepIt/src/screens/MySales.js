import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import MyOrderCard from '../components/MyOrderCard';
import MySalesOrderCard from '../components/MySalesOrderCard';


const MySales = ({ navigation }) => {
  const { userId, userName } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchSales();
    }
  }, [userId]);

  const fetchSales = async () => {
    try {
      const response = await fetch(`http://localhost:3000/order/sales?sellerId=${userId}`);
      if (response.ok) {
        const salesData = await response.json();
        const updatedSales = await Promise.all(
          salesData.map(async (order) => {
            const bookDetailsResponse = await fetch(`http://localhost:3000/book/details/${order.bookId}`);
            if (bookDetailsResponse.ok) {
              const bookDetails = await bookDetailsResponse.json();
              return { ...order, bookName: bookDetails.bookName, bookCover: bookDetails.coverPhoto, bookPrice: bookDetails.price, authorName: bookDetails.authorName };
            }
            return order;
          })
        );
        setSales(updatedSales);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sales: ', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text className="my-4 text-center text-xl font-semibold  text-[#55898D]">My Sales</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : sales.length > 0 ? (
          sales.map((order, index) => (
            <MySalesOrderCard key={index} order={order} navigation={navigation} />
          ))
        ) : (
            <Text style={styles.txt}>You have no sales yet.</Text>,
          <Image source={require('../assets/empty.jpg')} style={styles.emptyImage} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
  },
  emptyImage: {
    marginTop: 50,
    width: 300,
    height: 400,
  },
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

export default MySales;
