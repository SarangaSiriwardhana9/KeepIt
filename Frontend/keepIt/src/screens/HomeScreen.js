import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet,Text } from 'react-native';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const { userName, userId } = useAuth();

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

  // Function to create pairs of books to display side by side
  const createPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = data.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  return (
    <View style={styles.container}>

      
      <FlatList
        data={createPairs(books)}
        keyExtractor={(item, index) => `pair-${index}`}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between gap-2 mt-3">
            {item.map((book) => (
              <TouchableOpacity
                key={book._id}
                style={styles.cardContainer}
                onPress={() => {
                  navigation.navigate('BookDetail', { book });
                }}
              >
                <BookCard book={book} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
  },
  cardPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  nametext: {
    color: '#333333',
  
  },
});

export default HomeScreen;
