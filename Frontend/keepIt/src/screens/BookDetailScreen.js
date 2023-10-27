import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Axios from 'axios';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();
  const { userId } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);


  const contactSeller = () => {
    navigation.navigate('SellerContactScreen', {
      sellerName: book.sellerName,
      sellerId: book.sellerId,
    });
  };

  const addToCart = () => {
    Axios.post('http://localhost:3000/cart/add-to-cart', {
      bookId: book._id,
      userId,
    })
      .then(() => {
        setAddedToCart(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buyNow = () => {
    navigation.navigate('AddPaymentScreen', {
      sellerId: book.sellerId,
      bookName: book.bookName,
      bookPrice: book.price,
      bookId: book._id,
      userId,
    
    });
  };

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
        <TouchableOpacity style={styles.contactSeller} onPress={contactSeller}>
            <Text style={styles.buttonText}>Contact Seller</Text>
          </TouchableOpacity>

        <View style={styles.buttonContainer}>



         
          <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        {addedToCart && (
          <Text style={styles.addedToCartText}>Added to Cart</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: '100%',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addedToCartText: {
    // Style for the "Added to Cart" text
    // You can adjust the styling as needed
  },
});

export default BookDetailsScreen;
