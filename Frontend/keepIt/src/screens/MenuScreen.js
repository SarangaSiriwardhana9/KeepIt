import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const MenuScreen = () => {
  
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profileCompletion, setProfileCompletion] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchProfileCompletion = () => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/get-profile-completion?email=${user.email}`)
        .then((response) => {
          setProfileCompletion(response.data.profileCompletion);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchProfilePicture = () => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/get-user-by-email?email=${user.email}`)
        .then((response) => {
          setProfilePicture(response.data.profilePicture);
          // Set the user's _id in the state
          setUserId(response.data._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  useEffect(() => {
    fetchProfileCompletion();
    fetchProfilePicture();

    const intervalId = setInterval(fetchProfileCompletion, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Image source={require('../assets/pro.png')} style={styles.profileImage} />
        )}
        <Text style={styles.username}>
          {user ? `${user.fullName} ` : 'Guest'}
        </Text>
        {profileCompletion !== null && (
          <Text style={styles.profileMessage}>
            {profileCompletion ? 'Your profile is set up' : 'Please update your account'}
          </Text>
        )}
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
    marginRight: 20,
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
    alignItems: 'flex-start', 
    marginLeft: 20, 
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#F2F2F2',
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
  profileMessage: {
    fontSize: 14,
    color: '#333333',
  },
});

export default MenuScreen;
