import React, { useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HeaderImage from '../Components/atoms/HeaderImage';
import Logo from '../Components/atoms/Logo';
import Button from '../Components/molecules/Button';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import Divider from '../Components/atoms/Divider';
import FixedContainer from '../Components/molecules/FixedContainer';
import PasswordField from '../Components/molecules/PasswordField';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import InputField from '../Components/molecules/InputField';
import Constants from '../Constants/Constants.json';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, login } from '../redux/slices';
import Loader from '../Components/atoms/Loader';
import {apiCall} from '../service/ApiCall';
import ApiConstants from '../service/ApiConstants.json';
import Axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {

  // const user = useSelector(userLogin)
  // console.log('User:',user)

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [eye, setEye] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [lang, setLang] = useState('eng');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  

  async function loginUser() {

    try{
     setLoader(true);
      
      let user = {
        email: email,
        password: password
      }

      var apiResponse = await apiCall(
        ApiConstants.methods.POST,
        ApiConstants.endPoints.Login,
        user
      );

      console.log('Api Response:',apiResponse.data)

      if(apiResponse.isAxiosError == true){
        console.log(apiResponse.response.data)
        alert(apiResponse.response.data.error.messages[0])
        setLoader(false)
      }
      else{
        console.log('Api Response Success:',apiResponse.data.response.data)
        dispatch(login(apiResponse.data.response.data))
        setLoader(false)
        
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

//   function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
//   {
//     return (true)
//   }
//     //alert("You have entered an invalid email address!")
//     return (false)
// }
 
// console.log(ValidateEmail(email))

  return (
    <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>
      
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
                    title='Email'
                    placeholder='Email Address'
                    iconName='mail'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                  />

                  <PasswordField 
                    title='Password'
                    placeholder='Password'
                    secureTextEntry={eye ? true : false}
                    iconName={eye ? 'eye-off' : 'eye'}
                    onPress={() => setEye(!eye)}
                    value={password}
                    onChangeText={setPassword}
                  />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, alignItems: 'center'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name='check-circle' size={18} color={colors.primaryColor} />
                      <Text style={{ marginLeft: 5, color: 'gray', fontWeight: '700', fontSize: 12 }}>Remember Me</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.push(Constants.screen.ForgotPassScreen)}>
                      <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 12, textDecorationLine: 'underline'}}>Forgot Password?</Text>
                    </TouchableOpacity>

                  </View>

                  <Button 
                    style={{marginTop: 15}} 
                    title='Login' 
                    titleStyle={{marginLeft: 7}}
                    iconName='login'
                    onPress={() => loginUser()} 
                  />

                  <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>

                    <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 12}}>Don't have an account?</Text>
                    
                    <TouchableOpacity onPress={() => navigation.push(Constants.screen.RegisterScreen)}>
                      <Text style={{textDecorationLine: 'underline', color: colors.buttonColor, fontWeight: 'bold', fontSize: 12}}>Create an Account</Text>
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
    height: Dimensions.get('screen').height,
    width: Dimensions.get('window').width
  }
});

export default LoginScreen;