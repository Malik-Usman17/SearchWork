import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import Divider from '../Components/atoms/Divider';
import HeaderImage from '../Components/atoms/HeaderImage';
import Loader from '../Components/atoms/Loader';
import MenuIcon from '../Components/atoms/MenuIcon';
import Button from '../Components/molecules/Button';
import FixedContainer from '../Components/molecules/FixedContainer';
import PasswordField from '../Components/molecules/PasswordField';
import CustomModal from '../Components/organisms/CustomModal';
import ErrorModal from '../Components/organisms/ErrorModal';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';
import { login } from '../redux/slices';
import { apiCall } from '../service/ApiCall';
import ApiConstants from '../service/ApiConstants.json';

const ChangePassword = ({navigation}) => {

  const [country, setCountry] = useState('esp');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [eye, setEye] = useState(true);
  const [newPasswordEye, setNewPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmptyField, setIsEmptyField] = useState(false);

  const dispatch = useDispatch();


  
  async function resetPassword() {

    try{
     setLoader(true);

     let body = {
      password: oldPassword, 
      new_password: newPassword,
      confirm_password: confirmPassword
     }
 
      var apiResponse = await apiCall(
        ApiConstants.methods.POST,
        ApiConstants.endPoints.UpdatePassword,
        body
      );

      if(apiResponse.isAxiosError == true){
        setModalMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setErrorModalVisible(true)
        setLoader(false)
        setIsEmptyField(false)
      }
      else{
        setModalVisible(true)
        setModalMessage('Your password has been reset. Please login.')
        setLoader(false)
        setIsEmptyField(false)
      }
    }
    catch(error){
      console.log('Catch Body:',error);
      setLoader(false)
    }
  }

  if(loader == true){
    return(
      <Loader />
    )
  }

  function onResetPassword(){
    if(oldPassword == '' || newPassword == '' || confirmPassword == ''){
      setErrorModalVisible(true)
      setIsEmptyField(true)
      setModalMessage('Some fields are missing.')
    }
    else{
      resetPassword()
    }
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      <ErrorModal 
        isVisible={errorModalVisible}
        message={modalMessage}
        onPress={() => setErrorModalVisible(false)}
      />

      <CustomModal
        type='confirmation' 
        isVisible={modalVisible}
        imageSource={require('../../assets/checked.png')}
        message={modalMessage}
        onPressOk={() => {
          dispatch(login(null))
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Constants.screen.LoginScreen }] }));
          setModalVisible(false)
        }}
      />

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../assets/blurBg.png')} style={styles.bgImage}>

        <HeaderImage />

        <FixedContainer>

          <View style={{ marginBottom: 12, flex: 1, flexDirection: 'row', marginTop: 15 }}>

            <View style={{flex: 1}}>
            <MenuIcon onPress={() => navigation.openDrawer()}/>
            </View>

            <LanguagePicker
              viewStyle={{width: 80}}
              containerStyle={{ flex: 1 }}
              value={country}
              open={dropDownOpen}
              setOpen={() => setDropDownOpen(!dropDownOpen)}
              setValue={setCountry}
            />

          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            <View style={styles.loginFieldContainer}>

              <View style={styles.fieldContainer}>
                <Text style={styles.welcomeText}>Change Password</Text>
                <Text style={{ fontSize: 12, color: 'gray', fontWeight: '700' }}>Change your password</Text>

                <Divider style={{ marginTop: 10 }} />

                  <PasswordField
                    titleStyle={{color: isEmptyField == true && oldPassword == '' ? 'red' : colors.primaryColor}} 
                    title='Old Password'
                    placeholder='Old Password'
                    secureTextEntry={eye ? true : false}
                    maxLength={30}
                    iconName={eye ? 'eye-off' : 'eye'}
                    onPress={() => setEye(!eye)}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                  />

                  <PasswordField
                    titleStyle={{color: isEmptyField == true && newPassword == '' ? 'red' : colors.primaryColor}} 
                    title='New Password'
                    placeholder='New Password'
                    secureTextEntry={newPasswordEye ? true : false}
                    maxLength={30}
                    iconName={newPasswordEye ? 'eye-off' : 'eye'}
                    onPress={() => setNewPasswordEye(!newPasswordEye)}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />

                  <PasswordField
                    titleStyle={{color: isEmptyField == true && confirmPassword == '' ? 'red' : colors.primaryColor}} 
                    title='Confirm Password'
                    placeholder='Confirm Password'
                    secureTextEntry={confirmPasswordEye ? true : false}
                    maxLength={30}
                    iconName={confirmPasswordEye ? 'eye-off' : 'eye'}
                    onPress={() => setConfirmPasswordEye(!confirmPasswordEye)}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />

                <Button 
                  title='Reset Password' 
                  style={{ marginTop: 25 }}
                  onPress={() => onResetPassword()}
                  // onPress={() => {
                  //   console.log('Pressed')
                  //   if(oldPassword == '' || newPassword == '' || confirmPassword == ''){
                  //     setErrorModalVisible(true)
                  //     setIsEmptyField(true)
                  //     setModalMessage('Some fields are missing.')
                  //   }
                  //   else{
                  //     resetPassword()
                  //   }
                  // }} 
                />

                <Divider style={{ marginTop: 15 }} />

                <CompanyLabel style={{ marginTop: 15 }} />

              </View>

            </View>

          </View>

        </FixedContainer>

      </ImageBackground>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    height: Dimensions.get('screen').height - 60,
    width: Dimensions.get('window').width,
  },
  loginFieldContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.9
  },
  fieldContainer: {
    padding: 15
  },
  welcomeText: {
    marginTop: 8,
    color: colors.primaryColor,
    fontSize: 22,
    fontWeight: 'bold'
  },
  loginIn:{
    marginLeft: 10, 
    textDecorationLine: 'underline', 
    color: colors.buttonColor, 
    fontWeight: 'bold', 
    fontSize: 12
  }
});

export default ChangePassword;

