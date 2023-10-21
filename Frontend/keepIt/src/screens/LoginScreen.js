import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { themeColors } from '../theme';
import backButton from '../assets/icons/back-button.png';
import LoginSuccessAlert from '../components/alerts/LoginSuccessAlert';
import LoginErrorAlert from '../components/alerts/LoginErrorAlert';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);

  const openSuccessAlert = () => {
    setIsSuccessAlertVisible(true);
  };

  const closeSuccessAlert = () => {
    setIsSuccessAlertVisible(false);
    navigation.navigate('Home'); // Navigate to HomeScreen
  };

  const openErrorAlert = () => {
    setIsErrorAlertVisible(true);
  };

  const closeErrorAlert = () => {
    setIsErrorAlertVisible(false);
  };

  const handleLogin = async () => {
    const apiUrl = 'http://localhost:3000/user/login'; // Replace with your backend URL

    try {
      const response = await axios.post(apiUrl, { email, password });

      if (response.status === 200) {
        login(response.data.user);
        openSuccessAlert();
        // Navigation to HomeScreen will occur in closeSuccessAlert
      } else {
        openErrorAlert();
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      console.error(error);
      openErrorAlert();
      
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image source={backButton} style={styles.backButtonImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.middleSection}>
              <Image
                source={require('../assets/images/login.png')}
                style={styles.logoImage}
              />
            </View>
          </SafeAreaView>
          <View style={styles.bottomSection}>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Email Address</Text>
              <TextInput
                value={email}
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
                placeholder="email"
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
                placeholder="password"
              />
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.bottomSectionLinks}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signUpLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <LoginSuccessAlert isVisible={isSuccessAlertVisible} onClose={closeSuccessAlert} />
      <LoginErrorAlert isVisible={isErrorAlertVisible} onClose={closeErrorAlert} />
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
  bottomSection: {
    height: 500,
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'gray',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#08E133',
    borderRadius: 30,
    paddingVertical: 15,
  },
  loginButtonText: {
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
  bottomSectionLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'olive',
  },
});

export default LoginScreen;
