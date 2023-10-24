import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';

const ProfileUpdatedFailed = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.errorModal}>
        <Text style={styles.errorModalText}>profile updating Failed</Text>
        <Image source={require('../../assets/failed.png')} style={styles.logoImage} />
        <Text style={styles.modalMessage}>Something went wrong. Please try again later..</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.errorModalCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errorModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  errorModalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DA6464',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 90,
    height: 80,
    marginBottom: 10,
  },
  errorModalCloseText: {
    fontSize: 18,
    color: '#EC7D7D',
    
  },
});

export default ProfileUpdatedFailed;
