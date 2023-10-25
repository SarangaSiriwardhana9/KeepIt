import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Swiper style={styles.swiperContainer} showsButtons={true} showsPagination={false}>
        <Image source={{ uri: book.coverPhoto }} style={styles.image} />
        <Image source={{ uri: book.secondaryImage }} style={styles.image} />
        <Image source={{ uri: book.thirdImage }} style={styles.image} />
      </Swiper>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Book Name: {book.bookName}</Text>
        <Text style={styles.author}>Author: {book.authorName}</Text>
        <Text style={styles.price}>Price: Rs. {book.price}</Text>
        <Text style={styles.description}>Description: {book.description}</Text>
        <Text style={styles.SellerInfo}>Seller: {book.sellerName}</Text>
        <TouchableOpacity> 
          <Text style={styles.contactSeller} > Contact Seller
           </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Add functionality here
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

BookDetailsScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  swiperContainer: {
    height: 200,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3F3F35',
  },
  author: {
    fontSize: 18,
    color: '#474740',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'red',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#474740',
  },
  SellerInfo: {
    fontSize: 16,
    marginBottom: 16,
    color: '#474740',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSeller: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookDetailsScreen;
