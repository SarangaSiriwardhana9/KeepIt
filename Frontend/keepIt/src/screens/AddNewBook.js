import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddNewBook = () => {
  const { userName, userId } = useAuth();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    authorName: "",
    description: "",
    pages: "",
    price: "",
  });

  const handleImageSelection = async (imageType) => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });

      if (imageType === 'cover') {
        setCoverPhoto(image.path);
      } else if (imageType === 'secondary') {
        setSecondaryImage(image.path);
      } else if (imageType === 'third') {
        setThirdImage(image.path);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setBookDetails({
      ...bookDetails,
      [field]: value,
    });
  };

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const bookData = {
        bookName: bookDetails.bookName,
        authorName: bookDetails.authorName,
        description: bookDetails.description,
        pages: parseInt(bookDetails.pages),
        price: parseFloat(bookDetails.price),
        coverPhoto,
        secondaryImage,
        thirdImage,
      };

      const response = await axios.post('http://localhost:3000/book/add', bookData);

      if (response.status === 200) {
        console.log('Book data sent successfully.');
        
      } else {
        console.error('Error sending book data:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending book data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nametext} >Welcome, {userName}!</Text>
      <Text style={styles.nametext} >Your MongoDB ID: {userId}</Text>
      <Text style={styles.header}>Add a Book</Text>

      <Text style={styles.label}>Cover Image :</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImageSelection('cover')}
      >
        {coverPhoto ? (
          <Image source={{ uri: coverPhoto }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Select Cover Photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Other Image :</Text>
      <View style={styles.horizontalImages}>
        <TouchableOpacity
          style={styles.imageContainerSmall}
          onPress={() => handleImageSelection('secondary')}
        >
          {secondaryImage ? (
            <Image source={{ uri: secondaryImage }} style={styles.imageSmall} />
          ) : (
            <Text style={styles.imageText}>Select Secondary Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainerSmall}
          onPress={() => handleImageSelection('third')}
        >
          {thirdImage ? (
            <Image source={{ uri: thirdImage }} style={styles.imageSmall} />
          ) : (
            <Text style={styles.imageText}>Select Third Image</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Book Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Book Name"
        onChangeText={(value) => handleInputChange('bookName', value)}
        value={bookDetails.bookName}
      />

      <Text style={styles.label}>Author Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Author Name"
        onChangeText={(value) => handleInputChange('authorName', value)}
        value={bookDetails.authorName}
      />

      <Text style={styles.label}>Description :</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        onChangeText={(value) => handleInputChange('description', value)}
        value={bookDetails.description}
        multiline
      />

      <Text style={styles.label}>Number of Pages :</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Pages"
        onChangeText={(value) => handleInputChange('pages', value)}
        value={bookDetails.pages}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price :</Text>
      <TextInput
        style={styles.input}
        placeholder="Price in Rs"
        onChangeText={(value) => handleInputChange('price', value)}
        value={bookDetails.price}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonLabel}>Next step</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewBook;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignContent : 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageText: {
    fontSize: 16,
    color: "#777",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#666",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#666",
    height: 150, 
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  horizontalImages: {
    flexDirection: "row", // Arrange images horizontally
    justifyContent: "space-between", // Space between images
    marginBottom: 20,
  },
  imageContainerSmall: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    height: 100, // Decrease the height for secondary and third images
    width: "45%", // Adjust the width to fit two images in a row
    borderRadius: 10,
  },
  imageSmall: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  nametext: {
    color: '#333333',
  
  },
});
