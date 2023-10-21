import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const SignupSuccessAlert = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.successModal}>
      <Text style={styles.successModalText}>Signup Successful!</Text>
      <Image source={require('../../assets/success.png')} style={styles.logoImage} />
        
        <Text style={styles.modalMessage}>Your account has been created successfully. Please log in to get started.</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.successModalCloseText}>Close</Text>
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
    color: '#DA6464',
    
  },
  logoImage: {
    resizeMode: 'contain',
    width: 90,
    height: 80,
    marginBottom: 10,
  },
});

export default SignupSuccessAlert;
