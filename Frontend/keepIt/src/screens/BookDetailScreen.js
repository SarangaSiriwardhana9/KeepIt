import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation(); // Use useNavigation hook

  return (
    <ScrollView>
      <Swiper style={styles.swiperContainer} showsButtons={true} showsPagination={false}>
        <Image source={{ uri: book.coverPhoto }} style={styles.image} />
        <Image source={{ uri: book.secondaryImage }} style={styles.image} />
        <Image source={{ uri: book.thirdImage }} style={styles.image} />
      </Swiper>
      <Text style={styles.title}>{book.bookName}</Text>
      <Text style={styles.author}>{book.authorName}</Text>
      <Text style={styles.price}>{`Price: Rs. ${book.price}`}</Text>
      <Text style={styles.description}>Description: {book.description}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate('Home'); // Navigate back to the "Home" tab
        }}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

BookDetailsScreen.navigationOptions = {
  headerShown: false,
};

const styles = {
  swiperContainer: {
    height: 400,
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  backButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default BookDetailsScreen;
