import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import BookCard from '../components/BookCard';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';



const HomeScreen = () => {
  const { userName, userId, userProvince } = useAuth();
  const {user, logout} = useAuth();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Define searchResults state
  const [forYouBooks, setForYouBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    // Fetch a list of books from your API using Axios or fetch
    axios.get('http://localhost:3000/book/all')
      .then((response) => {
        // Filter the books where isAvailable is true
        const availableBooks = response.data.filter((book) => book.isAvailable === true);
        setBooks(availableBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    axios.get(`http://localhost:3000/book/byProvince/${userProvince}`)
      .then((response) => {
        setForYouBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userProvince]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Prevent empty search queries
      return;
    }

    setLoading(true);
    // Fetch books that match the search query
    axios.get(`http://localhost:3000/book/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data); // Set search results
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#55898D', marginBottom:10}}>
          KeepIt!
        </Text>
        {/* display user profile completion value */ }
     
      <View style={styles.searchContainer}>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Search by book name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.SearchButton} onPress={handleSearch}>
          <Text style={styles.SearchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forYouContainer}>
        <Text style={styles.forYouText}>For You</Text>
        <FlatList
          data={forYouBooks}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <BookCard book={item} />}
          contentContainerStyle={styles.forYouBooksList}
        />
      </View>
      <View>
        <Text style={styles.forYouText}>All Books</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <BookCard book={item} />}
        />
      ) : books.length > 0 ? (
        <FlatList
          data={books}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <BookCard book={item} />}
        />
      ) : (
        <Text>No books found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  forYouContainer: {
    marginBottom: 10,
    height: 250,
      width: '120%',
  },
  forYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58524C',
    marginBottom: 10,
  },
  forYouBooksList: {
    marginHorizontal: -5,
  },
  SearchButton: {
    backgroundColor: '#55898D',
    padding: 10,
    borderRadius: 10,
  },
  SearchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
