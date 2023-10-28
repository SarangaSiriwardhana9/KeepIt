import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookCard = ({ book }) => {
  const navigation = useNavigation();

  const navigateToBookDetail = () => {
    navigation.navigate('BookDetail', { book });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={navigateToBookDetail}>
      <Image source={{ uri: book.coverPhoto }} style={styles.image} />
      <Text style={styles.bookName}>{book.bookName}</Text>
      <Text style={styles.authorName}>{book.authorName}</Text>
      <Text style={styles.price}>Rs. {book.price}.00</Text>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 4, // Reduced padding
    margin: 4, // Reduced margin
    width: '50%',
    alignItems: 'center',
  },
  image: {
    width: 100, // Reduced width
    height: 120, // Reduced height
    resizeMode: 'cover',
  },
  bookName: {
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    fontSize: 12, // Reduced font size
    color: 'teal',
    marginTop: 5,
  },
  authorName: {
    fontSize: 10, // Reduced font size
    color: 'black',
    marginTop: 5,
  },
  province: {
    fontSize: 10, // Reduced font size
    color: 'black',
    marginTop: 5,
  },
});

export default BookCard;
