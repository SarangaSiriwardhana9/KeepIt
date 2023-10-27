import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MySalesOrderCard = ({ order, navigation }) => {
  const handleCardPress = () => {
    // Navigate to the OrderDetailScreen and pass the order details as params
    navigation.navigate('SellsDetailsScreen', { order });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.bookImage} source={{ uri: order.bookCover }} />
        </View>
        <View className="flex flex-col justify-center min-w-[100px]">
          <Text className="text-[#55898D] text-lg font-semibold whitespace-nowrap">{order.bookName}</Text>
          <Text className="text-black text-base ">By {order.authorName}</Text>
          <Text className="text-black text-base ">RS. {order.bookPrice}</Text>
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
    display: 'flex',
    justifyContent: 'space-between',
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

export default MySalesOrderCard;