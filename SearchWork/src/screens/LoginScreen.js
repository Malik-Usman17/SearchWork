import { CommonActions } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import Divider from '../Components/atoms/Divider';
import HeaderImage from '../Components/atoms/HeaderImage';
import Loader from '../Components/atoms/Loader';
import Logo from '../Components/atoms/Logo';
import Button from '../Components/molecules/Button';
import FixedContainer from '../Components/molecules/FixedContainer';
import InputField from '../Components/molecules/InputField';
import PasswordField from '../Components/molecules/PasswordField';
import CustomModal from '../Components/organisms/CustomModal';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';
import { isRememberMe, login, rememberMeOperation, saveUserCredential, userCredential } from '../redux/slices';
import { apiCall } from '../service/ApiCall';
import ApiConstants from '../service/ApiConstants.json';
import Axios from 'axios';
// import { useTranslation } from 'react-i18next';


const LoginScreen = ({navigation}) => {

  // const {t, i18n} = useTranslation();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [eye, setEye] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [lang, setLang] = useState('eng');
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [isEmptyField, setIsEmptyField] = useState(false);

  const credentials = useSelector(userCredential);
  const rememberMeCheck = useSelector(rememberMeOperation); 
  var credentialFields = { ...credentials }
  const dispatch = useDispatch();

  //console.log('Value:',lang)

  // const check = 'malik usman'
  // console.log('Check:',check)

  
  async function loginUser() {

    try{
     setLoader(true);
      
      let user = {
        email: credentials.email,
        password: credentials.password
      }

      var apiResponse = await apiCall(
        ApiConstants.methods.POST,
        ApiConstants.endPoints.Login,
        user
      );

      if(apiResponse.isAxiosError == true){
        setModalVisible(!modalVisible) 
        setLoader(false)
        setIsEmptyField(false)
      }
      else{
        dispatch(login(apiResponse.data.response.data))
        setLoader(false)
        setIsEmptyField(false)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${apiResponse.data.response.data.access_token}`;
        
        if(apiResponse.data.response.data.type == 'employer'){
          navigation.dispatch(CommonActions.reset({index:0, routes:[{name: Constants.screen.EmployerDrawerStack}]}));
        }
        else{
          navigation.dispatch(CommonActions.reset({index:0, routes:[{name: Constants.screen.DrawerNavigation}]}));
        }
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

  function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

// useEffect(() => {
//   i18n.changeLanguage(lang)
// }, [lang])


  return (
    <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>

      <CustomModal 
        isVisible={modalVisible}
        type = 'confirmation'
        onPressOk={() => {
          setModalVisible(false)
          setIsEmptyField(true)
        }}
        message={(email != '' || credentials.email != '') && (password != ''  || credentials.password != '') ? 'Invalid Email or Password.' : 'Some fields are missing.'}
        imageSource={require('../../assets/warning.png')}
        buttonText='Ok'
      />
      
      <StatusBar backgroundColor={colors.primaryColor} />
      
      <ImageBackground source={require('../../assets/blurBg.png')} style={styles.bgImage}>

        <HeaderImage />

          <FixedContainer>

            <View style={{marginBottom: 12, flex: 1, flexDirection: 'row', marginTop: 25}}>

            <View style={{flex: 1}}>
              <Logo />
            </View>

              <LanguagePicker
                viewStyle={{width: 80 }}
                containerStyle={{flex: 1}}
                value={lang}
                setValue={setLang}
                // setValue={(val) => {
                //   setLang(val)
                //  // alert(val)
                //  console.log('Valueee:',val)
                //  console.log('Language:',lang)
                //   i18n.changeLanguage(lang)
                // }}
                open={dropDown}
                setOpen={setDropDown}
              />

            </View>
              
              <View style={styles.loginFieldContainer}>
                
                <View style={styles.credentialHeadings}>

                  <TouchableOpacity
                    style={styles.activeContainer} 
                    onPress={() => navigation.navigate(Constants.screen.LoginScreen)}
                  >
                    <View>
                      <Text style={styles.loginText}>Login</Text>
                      <View style={{height:2, backgroundColor: colors.buttonColor, borderRadius: 5}}/>
                    </View>
    
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{...styles.activeContainer,borderTopRightRadius: 10, borderBottomLeftRadius: 15, backgroundColor: colors.primaryColorLight}}
                    onPress={() => navigation.navigate(Constants.screen.RegisterScreen)}
                  >
                    <Text style={styles.loginText}>Create Account</Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.fieldContainer}>
                  
                  <Divider />
                  
                  <Text style={styles.welcomeText}>Welcome To Search Work</Text>
                  
                  <Text style={{ fontSize: 12, color: colors.gray, fontWeight: '700' }}>Part Time - Full Time</Text>

                  <InputField
                    textStyle={{color: (isEmptyField == true && email == '' && credentials.email == '') ? 'red' : colors.primaryColor}}
                    title='Email'
                    placeholder='Email Address'
                    iconName='mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={credentials.email != '' ? credentials.email : email}
                    onChangeText={(val) => {
                      setEmail(val)
                      credentialFields.email = val
                      dispatch(saveUserCredential(credentialFields))
                    }}
                    onSubmitEditing={() => {
                      if(ValidateEmail(email) == false){
                        setValidEmail(false)
                      }
                      else{
                        setValidEmail(true)
                      }
                    }}
                  />

                  {validEmail == false && <Text style={{marginLeft: 7, fontWeight: 'bold', color: 'red'}}>Invalid Email Address</Text>}
                  
                  <PasswordField
                    titleStyle={{color: (isEmptyField == true && password == '' && credentials.password == '') ? 'red' : colors.primaryColor}} 
                    title='Password'
                    placeholder='Password'
                    secureTextEntry={eye ? true : false}
                    iconName={eye ? 'eye-off' : 'eye'}
                    onPress={() => setEye(!eye)}
                    value={credentials.password != '' ? credentials.password : password}
                    onChangeText={(val) => {
                      setPassword(val)
                      credentialFields.password = val
                      dispatch(saveUserCredential(credentialFields))
                    }}
                  />

                  <View style={styles.rememberForgetContainer}>
                    
                    <TouchableOpacity
                      activeOpacity={1} 
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        dispatch(isRememberMe(!rememberMeCheck))
                      }}
                    >
                      <MaterialIcons name={rememberMeCheck == false ? 'crop-square' : 'check-box'} size={18} color={colors.primaryColor}/>
                      <Text style={{ marginLeft: 3, color: rememberMeCheck == true ? colors.primaryColor : 'gray', fontWeight: '700', fontSize: 12 }}>
                        Remember Me
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push(Constants.screen.ForgotPassScreen)}>
                      <Text style={{...styles.underlineLink, color: colors.gray}}>Forgot Password?</Text>
                    </TouchableOpacity>

                  </View>

                  <Button 
                    style={{marginTop: 15}} 
                    title='Login' 
                    titleStyle={{marginLeft: 7}}
                    iconName='login'
                    onPress={() => {
                      if((email == '' && credentials.email == '') || (password == '' && credentials.password == '')){
                        setModalVisible(!modalVisible)
                      }
                      else{
                        loginUser()
                        if(rememberMeCheck == false){
                          credentialFields.email = ''
                          credentialFields.password = ''
                          dispatch(saveUserCredential(credentialFields))
                        }
                      }
                    }}
                  />

                  <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>

                    <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 12}}>Don't have an account?</Text>
                    
                    <TouchableOpacity onPress={() => navigation.push(Constants.screen.RegisterScreen)}>
                      <Text style={styles.underlineLink}>Create an Account</Text>
                    </TouchableOpacity>
                  
                  </View>

                  <Divider style={{marginTop: 10}}/>

                  <CompanyLabel style={{marginTop: 10}}/>
                  
                </View>

              </View>
              
            </FixedContainer>

      </ImageBackground>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginFieldContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.9
  },
  credentialHeadings: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.085
  },
  loginText: {
    color: colors.buttonColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeContainer: {
    flex: 0.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
  bgImage: {
    height: Dimensions.get('screen').height - 40,
    width: Dimensions.get('window').width
  },
  modalContainer: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 9
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 12
  },
  icon: {
    height: 60,
    width: 60,
    bottom: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  button: {
    backgroundColor: colors.primaryColor,
    width: 100,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  },
  underlineLink:{
    textDecorationLine: 'underline', 
    color: colors.buttonColor, 
    fontWeight: 'bold', 
    fontSize: 12
  },
  rememberForgetContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 7, 
    alignItems: 'center'
  }
});

export default LoginScreen;