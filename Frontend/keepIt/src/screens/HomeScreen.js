import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const { userName, userId } = useAuth();
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    axios
      .get('http://localhost:3000/book/all')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      });
  }, []);

  const calculateCardWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return (screenWidth - 24) / 2; // Subtracting padding and margin
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { transform: [{ translateY: scrollY }] }]}>
        {/* You can add your header content and title here */}
        <Text style={styles.headerTitle}>Header Title</Text>
        {/* Add any other content to the header container */}
      </Animated.View>

      <FlatList
        data={books}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { width: calculateCardWidth() }]}>
            <BookCard book={item} navigation={navigation} />
          </View>
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  headerContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  flatListContent: {
    paddingTop: 100, // Adjust this value according to your header height
    padding: 6,
  },
  cardContainer: {
    
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',

  },
});

export default HomeScreen;
