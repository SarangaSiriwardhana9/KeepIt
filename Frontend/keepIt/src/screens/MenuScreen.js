import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import UpdateProfileDetails from './UpdateProfileDetails'; // Import UpdateProfileDetails

const MenuScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation(); 

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/pro.png')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user ? user.fullName : 'Guest'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('UpdateProfileDetails');
          }}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('MySales');
        }}>
          <Text style={styles.buttonText}>My Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>My Purchases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbutton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  buttonContainer: {
    alignItems: 'flex-start', // Align items to the left
    marginLeft: 20, // Add some margin to the left
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
   
  },
  buttonText: {
    textAlign: 'left', // Align text to the left
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 20, // Add some margin to the left of the text
    paddingTop: 15,
  },
  logoutbutton: {
    width: 300,
    height: 50,
    backgroundColor: '#F7BBBF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
   
  },
});

export default MenuScreen;
