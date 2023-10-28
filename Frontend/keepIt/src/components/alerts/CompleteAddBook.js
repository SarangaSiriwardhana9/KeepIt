import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const CompleteAddBook = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.successModal}>
      <Text style={styles.successModalText}>Book Aded Successfuly!</Text>
      <Image source={require('../../assets/success.png')} style={styles.logoImage} />
        
        <Text style={styles.modalMessage}>Your book has been added to the system successfully.</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.successModalCloseText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  successModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    
  },
  successModalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  successModalCloseText: {
    fontSize: 18,
    color: '#67F562',
    
  },
  logoImage: {
    resizeMode: 'contain',
    width: 90,
    height: 80,
    marginBottom: 10,
  },
});

export default CompleteAddBook;
