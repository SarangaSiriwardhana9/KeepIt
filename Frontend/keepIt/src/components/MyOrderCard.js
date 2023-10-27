import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MyOrderCard = ({ order, navigation }) => {
  const handleCardPress = () => {
    // Navigate to the OrderDetailScreen and pass the order details as params
    navigation.navigate('OrderDetailScreen', { order });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.bookImage} source={{ uri: order.bookCover }} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{order.bookName}</Text>
          <Text style={styles.author}>Author: {order.authorName}</Text>
          <Text style={styles.price}>RS. {order.bookPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  bookImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginRight: 10,
    textAlign: 'right',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
   marginTop: 20,
    color: '#333',
  },
  author: {
    marginRight: 10,
    textAlign: 'right',
    fontSize: 16,
    color: '#666',
  },
  price: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color: '#D96656',
  },
});

export default MyOrderCard;