import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BookCard = ({ book, navigation }) => {
  const handleCardPress = () => {
    navigation.navigate('BookDetail', { book });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Image source={{ uri: book.coverPhoto }} style={styles.coverImage} />
        <Text numberOfLines={1} style={styles.title}>
          {book.bookName}
        </Text>
        <Text style={styles.author}>{book.authorName}</Text>
        <Text style={styles.price}>{`Price: Rs. ${book.price}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    height: 200, // Reduced the card's height
  },
  coverImage: {
    width: '100%',
    height: 100, // Reduced the cover image's height
    borderRadius: 5,
  },
  title: {
    marginLeft: 4, 
    fontSize: 16, // Slightly reduced the title's font size
    fontWeight: 'bold',
    marginTop: 5, // Adjusted the margin for title
    color: '#333',
  },
  author: {
    marginLeft: 4, 
    fontSize: 14, // Slightly reduced the font size for author
    color: '#555',
  },
  price: {
    marginLeft: 4, 
    fontSize: 14, // Slightly reduced the font size for price
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 5,
  },
});

export default BookCard;
