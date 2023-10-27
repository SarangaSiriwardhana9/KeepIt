import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {themeColors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import backButton from '../assets/icons/back-button.png';
import {StyleSheet} from 'react-native';

import SignupErrorAlert from '../components/alerts/SignupErrorAlert';
import SignupSuccessAlert from '../components/alerts/SignupSuccessAlert';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [nicCardNo, setNicCardNo] = useState('');
  const [province, setProvince] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  const handleSignup = () => {
    const apiUrl = 'http://localhost:3000/user/register';
    const user = {
      fullName,
      mobileNo,
      nicCardNo,
      province,
      email,
      password,
      address: '',
      birthDate: '',
      profilePicture: '',
      cardHolderName: '',
      cardNumber: '',
      cardType: '',
      cardExpirationDate: '',
      cvvNumber: '',
    };

    axios
      .post(apiUrl, user)
      .then(response => {
        setSuccessModalVisible(true);
      })
      .catch(error => {
        setErrorModalVisible(true);
        console.error(error);
      });
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Login');
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: themeColors.bg}}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={styles.topSection}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}>
                  <Image source={backButton} style={styles.backButtonImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.middleSection}>
                <Image
                  source={require('../assets/images/signup.png')}
                  style={styles.logoImage}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">Full Name</Text>
                <TextInput
                  value={fullName}
                  className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                  placeholder="name"
                  onChangeText={text => setFullName(text)}
                />
              </View>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">Mobile No</Text>
                <TextInput
                  value={mobileNo}
                  className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                  placeholder="mobile"
                  onChangeText={text => setMobileNo(text)}
                />
              </View>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">NIC Card No</Text>
                <TextInput
                  value={nicCardNo}
                  className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                  placeholder="nic"
                  onChangeText={text => setNicCardNo(text)}
                />
              </View>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">Province</Text>
                <View className="flex  border-[#55898D] bg-white border rounded-2xl item-center">
                  <Picker
                    className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                    selectedValue={province}
                    onValueChange={(itemValue, itemIndex) =>
                      setProvince(itemValue)
                    }>
                    <Picker.Item label="Select your Province" value="" />
                    <Picker.Item label="Central" value="Central" />
                    <Picker.Item label="Eastern" value="Eastern" />
                    <Picker.Item label="North Central" value="North Central" />
                    <Picker.Item label="Northern" value="Northern" />
                    <Picker.Item label="North Western" value="North Western" />
                    <Picker.Item label="Sabaragamuwa" value="Sabaragamuwa" />
                    <Picker.Item label="Southern" value="Southern" />
                    <Picker.Item label="Uva" value="Uva" />
                    <Picker.Item label="Western" value="Western" />
                  </Picker>
                </View>
              </View>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                  placeholder="email"
                />
              </View>
              <View style={styles.formInput} className="flex flex-col gap-4 ">
                <Text className="text-base text-black ml-3">Password</Text>
                <TextInput
                  className="border  border-[#55898D] bg-white rounded-2xl pl-4"
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="password"
                />
              </View>
              <TouchableOpacity
                onPress={handleSignup}
                className="bg-[#55898D] flex flex-row justify-center items-center py-3 rounded-3xl"
                >
                <Text className="font-semibold  text-white text-lg">Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>Or</Text>
              <View style={styles.loginLink}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text className="text-[#55898D]"> Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
      <SignupSuccessAlert
        isVisible={isSuccessModalVisible}
        onClose={closeSuccessModal}
      />
      <SignupErrorAlert
        isVisible={isErrorModalVisible}
        onClose={closeErrorModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.bg,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  middleSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  formContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formInput: {
    marginBottom: 20,
  },
  formLabel: {
    color: 'gray',
    marginLeft: 20,
  },
  textInput: {
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginBottom: 10,
    color: 'black',
  },
  pickerContainer: {
    padding: 5,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginBottom: 27,
    overflow: 'hidden',
    height: 60,
  },
  picker: {
    backgroundColor: 'lightgray',
    color: 'black',
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'gray',
    marginTop: 10,
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: 'yellow',
    borderRadius: 30,
    paddingVertical: 15,
  },
  signupButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  orText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    marginVertical: 10,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  loginButtonText: {
    fontWeight: 'bold',
    color: 'goldenrod',
  },
  defaultItem: {
    color: 'gray', // Set the text color to gray
  },

  // Styles for the success modal
  successModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successModalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successModalCloseText: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
