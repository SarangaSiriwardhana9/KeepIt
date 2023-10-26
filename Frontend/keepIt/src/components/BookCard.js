import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookCard = ({ book }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: book.coverPhoto }} style={styles.coverImage} />
      <Text className="text-lg text-black">{book.bookName}</Text>
      <Text className="text-base text-gray-500">{book.authorName}</Text>
      <Text className="text-[#55898D] text-base">{`Price: Rs. ${book.price}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  coverImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});

export default BookCard;