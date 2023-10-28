import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Image,ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

const UpdateProfileDetails = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    fullName: '',
    mobileNo: '',
    nicCardNo: '',
    province: '',
    address: '',
    birthDate: '',
    profilePicture: '',
  });

  const selectProfilePicture = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setUpdatedData({ ...updatedData, profilePicture: image.path });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/user/update-user?email=${user.email}`, updatedData)
      .then((response) => {
        console.log('Profile updated successfully');
        setUserData(response.data);
        navigation.navigate('UpdatePaymentDetails');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/get-user-by-email?email=${user.email}`)
        .then((response) => {
          setUserData(response.data);
          setUpdatedData({
            fullName: response.data.fullName,
            mobileNo: response.data.mobileNo,
            nicCardNo: response.data.nicCardNo,
            province: response.data.province,
            address: response.data.address,
            birthDate: response.data.birthDate,
            profilePicture: response.data.profilePicture,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <ScrollView>
    <View className="mt-8">
      <TouchableOpacity onPress={selectProfilePicture} style={styles.imageContainer}>
        {updatedData.profilePicture ? (
          <Image
            source={{ uri: updatedData.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.selectProfileText}>Tap to select profile picture</Text>
        )}
      </TouchableOpacity>

      <View style={styles.formContainer}>
        {userData ? (
          <React.Fragment className="flex flex-col gap-4">
            <Text className="text-center mb-4 text-2xl font-bold text-[#55898D]">Update Profile Details</Text>
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="Full Name"
              value={updatedData.fullName}
              onChangeText={(text) => setUpdatedData({ ...updatedData, fullName: text })}
            />
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="Mobile No"
              value={updatedData.mobileNo}
              onChangeText={(text) => setUpdatedData({ ...updatedData, mobileNo: text })}
            />
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="NIC Card No"
              value={updatedData.nicCardNo}
              onChangeText={(text) => setUpdatedData({ ...updatedData, nicCardNo: text })}
            />
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="Province"
              value={updatedData.province}
              onChangeText={(text) => setUpdatedData({ ...updatedData, province: text })}
            />
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="Address"
              value={updatedData.address}
              onChangeText={(text) => setUpdatedData({ ...updatedData, address: text })}
            />
            <TextInput
              className="border  border-[#55898D] bg-white rounded-lg pl-4 mx-4"
              placeholder="Date of Birth"
              value={updatedData.birthDate}
              onChangeText={(text) => setUpdatedData({ ...updatedData, birthDate: text })}
            />

            {/* <Button title="Update Profile" onPress={handleUpdate} /> */}

            <TouchableOpacity  onPress={handleUpdate} className="bg-[#55898D] flex flex-row justify-center items-center py-3 rounded-3xl">
              <Text className="font-semibold text-white text-lg" >Update Profile</Text>
            </TouchableOpacity>
          </React.Fragment>
        ) : (
          <Text style={styles.loadingText}>Loading</Text>
        )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  selectProfileText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
  },
  formContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#333333',
  },
  loadingText: {
    textAlign: 'center',
  },
});

export default UpdateProfileDetails;
