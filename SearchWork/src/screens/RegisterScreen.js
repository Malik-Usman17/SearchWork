import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import HeaderImage from '../Components/atoms/HeaderImage';
import Logo from '../Components/atoms/Logo';
import Button from '../Components/molecules/Button';
import Divider from '../Components/atoms/Divider';
import InputField from '../Components/molecules/InputField';
import FixedContainer from '../Components/molecules/FixedContainer';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import PasswordField from '../Components/molecules/PasswordField';
import colors from '../Constants/colors';
import StatePicker from '../Components/organisms/StatePicker';
import {cityStates} from '../Components/organisms/CityStates';
import CustomPicker from '../Components/organisms/CustomPicker';
import {DateFormat} from '../Components/atoms/DateFormat';
import Constants from '../Constants/Constants.json';
import ProfilePicture from '../Components/atoms/ProfilePicture';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/atoms/Loader';
import {apiCall} from '../service/ApiCall';
import ApiConstants from '../service/ApiConstants.json';

const RegisterScreen = ({navigation}) => {

  const [eye, setEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(true);
  const [country, setCountry] = useState('esp');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false);
  const [statePicker, setStatePicker] = useState(0);
  const [city, setCity] = useState(0);
  const [register, setRegister] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState(0);
  const [loader, setLoader] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageType, setImageType] = useState('');

  const cities = cityStates.filter((value) => value.state == statePicker)
  const cityItems = cities.length > 0 ? cities[0].cities : null

  console.log(register)

  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  var bodyFormData = new FormData();

  bodyFormData.append('name', fullName)
  bodyFormData.append('email', email)
  bodyFormData.append('password', password)
  bodyFormData.append('phone', phone)
  bodyFormData.append('type', register == false ? 'employee' : 'employer')
  bodyFormData.append('address', address)
  bodyFormData.append('city', city)
  bodyFormData.append('state', statePicker)
  bodyFormData.append('confirm_password', confirmPassword)
  register == false && bodyFormData.append('gender', gender)
  register == false && bodyFormData.append('dob', DateFormat(date))
  imageUrl != '' && bodyFormData.append('image', {uri: imageUrl.uri, name: 'profile_picture', type: imageType})


  async function registerUser(){
    try{
      setLoader(true)
      var apiResponse = await apiCall(ApiConstants.methods.POST, ApiConstants.endPoints.Register, bodyFormData);

      //console.log('API RESPONSE:',apiResponse)

      if(apiResponse.isAxiosError == true){
        alert(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setLoader(false);
      }
      else{
        alert('Account Created.')
        setLoader(false)
        navigation.navigate(Constants.screen.LoginScreen)
        setFullName('');
        setEmail('');
        setPhone('');
        setGender('');
        setAddress('');
        setStatePicker(0);
        setCity(0);
        setPassword('');
        setConfirmPassword('');   
      }
    }
    catch(error){
      console.log('Catch Body:',error)
      setLoader(false)
    }
  }

    if(loader == true){
    return(
      <Loader />
    )
  }


  return (
    <ScrollView 
      style={{ flex: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor={colors.primaryColor} />

        <ImageBackground source={require('../../assets/blurBg.png')} resizeMode='cover' style={styles.bg}>

          <HeaderImage />

            <FixedContainer>
              <View style={{marginBottom: 12, flex: 1, flexDirection: 'row', marginTop: 25}}>

                <View style={{ flex: 1 }}>
                  <Logo />
                </View>

                <LanguagePicker
                  viewStyle={{width: 80}}
                  containerStyle={{flex: 1}} 
                  value={country}
                  open={dropDownOpen}
                  setOpen={() => setDropDownOpen(!dropDownOpen)}
                  setValue={setCountry}
                />

              </View>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <View style={styles.loginFieldContainer}>

                      <View style={styles.credentialHeadings}>

                        <TouchableOpacity 
                          style={{...styles.activeContainer, backgroundColor: colors.primaryColorLight, borderBottomRightRadius: 15}}
                          onPress={() => navigation.navigate(Constants.screen.LoginScreen)}>
                          <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.activeContainer} 
                          //style={{...styles.activeContainer, backgroundColor: colors.primaryColorLight, borderBottomLeftRadius: 15, borderTopRightRadius: 10}}
                          onPress={() => navigation.navigate(Constants.screen.RegisterScreen)}
                        >
                          <View>
                          <Text style={styles.loginText}>Create Account</Text>
                          <View style={{height:2, backgroundColor: colors.buttonColor, borderRadius: 5}}/>
                          </View>
                        </TouchableOpacity>

                      </View>

                      <View style={styles.fieldContainer}>
                        <Divider />

                        <View style={styles.registerSwitchContainer}>
                          
                          <TouchableOpacity 
                            style={{...styles.registerType, backgroundColor: register == false ? colors.yellow : '#E5DDDD'}}
                            onPress={() => setRegister(false)}
                          >
                            <Text style={{fontWeight: 'bold'}}>Employee</Text>
                          </TouchableOpacity>

                          <TouchableOpacity 
                            style={{...styles.registerType, backgroundColor: register == true ? colors.yellow : '#E5DDDD'}}
                            onPress={() => setRegister(true)}
                          >
                            <Text style={{fontWeight: 'bold'}}>Employer</Text>
                          </TouchableOpacity>

                        </View>

                        <Text style={styles.welcomeText}>Welcome To Search Work</Text>
                        <Text style={{ fontSize: 12, color: colors.gray, fontWeight: '700' }}>Part Time - Full Time</Text>

                        <Text style={{marginTop: 10, color: colors.primaryColor, fontWeight: 'bold'}}>Choose Picture</Text>
                        <View style={{alignItems: 'center', justifyContent: 'space-between', marginTop: 4}}>

                          <ProfilePicture
                            style={{overflow: 'hidden', borderColor: colors.gray}} 
                            iconSize={30}
                            onPress={() => {
                              let options;
                              launchImageLibrary(options={
                                mediaType: 'photo',
                                includeBase64: true
                              }, (response) => {
                                //console.log('RESPONSE:',response)             
                                if(response?.didCancel){
                                  console.log('User cancelled image picker');
                                  setImageUrl('');
                                } else if (response?.errorMessage){
                                  console.log('Error:',response?.errorMessage)
                                }else{
                                  const source = {uri: response?.assets[0].uri}
                                  setImageUrl(source)
                                  setImageType(response?.assets[0].type)
                                }
                              })
                            }}
                            imageSource={imageUrl != '' ? imageUrl.uri : undefined}
                          />

                        </View>

                        <InputField
                          title={register == false ? 'Full Name': 'Full Name / Business Name'}
                          placeholder={register == false ? 'Enter Your Name': 'Enter your Name / Business Name'}
                          iconName='person'
                          value={fullName}
                          onChangeText={setFullName}
                        />

                        <InputField
                          title='Email'
                          placeholder='Email Address'
                          iconName='mail'
                          autoCapitalize='none'
                          value={email}
                          onChangeText={setEmail}
                        />

                        <InputField
                          title='Phone'
                          placeholder='Phone Number'
                          keyboardType='phone-pad'
                          iconName='phone-portrait'
                          value={phone}
                          onChangeText={setPhone}
                        />

                        {/* <View style={{flexDirection: 'row', marginTop: 10, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'space-between'}}>
                          
                          <Text style={{color: colors.primaryColor, fontWeight: 'bold'}}>SignUp as</Text>

                          <View style={styles.registerSwitchContainer}>
                          
                          <TouchableOpacity 
                            style={{...styles.registerType, backgroundColor: register == false ? colors.yellow : '#E5DDDD'}}
                            onPress={() => setRegister(false)}
                          >
                            <Text style={{fontWeight: 'bold'}}>Employee</Text>
                          </TouchableOpacity>

                          <TouchableOpacity 
                            style={{...styles.registerType, backgroundColor: register == true ? colors.yellow : '#E5DDDD'}}
                            onPress={() => setRegister(true)}
                          >
                            <Text style={{fontWeight: 'bold'}}>Employer</Text>
                          </TouchableOpacity>

                        </View>

                        </View> */}

                        

                        {
                          register == false ?
                        
                        <View style={{ marginTop: 10 }}>
                          {show && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={date}
                              mode={mode}
                              maximumDate={date}
                              is24Hour={true}
                              display="default"
                              onChange={onChange}
                            />
                          )}
                          <Text style={{ marginLeft: 7, color: colors.primaryColor, fontWeight: '700' }}>Date Of Birth</Text>
                          
                          <View style={styles.calendarField}>

                            <Entypo 
                              name='calendar' 
                              size={18} 
                              color={colors.gray} 
                              style={{marginLeft: 10}}
                            />
                            <TouchableOpacity 
                              style={{marginLeft: 5, flex: 1, height: '100%', justifyContent: 'center'}}
                              onPress={() => showDatepicker()}
                            >
                              <Text>{DateFormat(date)}</Text>

                            </TouchableOpacity>

                          </View>

                        </View>
                      : null}

                      {
                        register == false && (
                          <CustomPicker
                            pickerTitle='Gender'
                            label='Select Gender' 
                            pickerContainerStyle={{marginTop: 10, flex: 0.49}}
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                          >
                            <Picker.Item label={'Male'} value={'male'}/>
                            <Picker.Item label={'Female'} value={'female'}/>
                          </CustomPicker>
                        )
                      }

                      

                        <InputField
                          title='Address'
                          placeholder='Your Full Address'
                          iconName='location-sharp'
                          value={address}
                          onChangeText={setAddress}
                        />

                          <StatePicker 
                            pickerContainerStyle={{marginTop: 10, flex: 0.49}}
                            items={cityStates}
                            selectedValue={statePicker}
                            onValueChange={(itemValue, itemIndex) => {
                              setStatePicker(itemValue)
                            }}
                          />

                          <CustomPicker
                            pickerTitle='City'
                            label='Select City' 
                            pickerContainerStyle={{marginTop: 10, flex: 0.49}}
                            selectedValue={city}
                            onValueChange={(itemValue, itemIndex) => {
                              setCity(itemValue)
                            }}
                          >
                            {
                              cities.length > 0 ?
                                cityItems.map((val, index) => (
                                  <Picker.Item
                                   key={index}
                                   label={val.city}
                                   value={val.city}
                                  />
                                )) 
                              : null
                            }
                          </CustomPicker>

                        <PasswordField
                          title='Password'
                          placeholder='Set Password'
                          secureTextEntry={eye ? true : false}
                          iconName={eye ? 'eye-off' : 'eye'}
                          onPress={() => setEye(!eye)}
                          value={password}
                          onChangeText={setPassword}
                        />


                        <PasswordField
                          title='Confirm Password'
                          placeholder='Confirm Password'
                          secureTextEntry={confirmEye ? true : false}
                          iconName={confirmEye ? 'eye-off' : 'eye'}
                          onPress={() => setConfirmEye(!confirmEye)}
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                        />

                        <Button 
                          title='Create Account' 
                          style={{marginTop: 15}}
                          onPress={() => {
                            if(register == true){
                              if(fullName != '' && email != '' && phone != '' && address != '' && statePicker != 0 && city != 0 && password != '' && confirmPassword != ''){
                                registerUser()
                              }
                              else{
                                alert('Some Information Are Missing')
                              }
                            }
                            else if(register == false){
                              if(fullName != '' && email != '' && phone != '' && gender != 0 && address != '' && statePicker != 0 && city != 0 && password != '' && confirmPassword != ''){
                                registerUser()
                              }
                              else{
                                alert('Some Information Are Missing')
                              }
                            }   
                          }}
                        />

                        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'center' }}>

                          <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 12 }}>Already have an account?</Text>

                          <TouchableOpacity onPress={() => navigation.navigate(Constants.screen.LoginScreen)}>
                            <Text style={{ marginLeft: 10, textDecorationLine: 'underline', color: colors.buttonColor, fontWeight: 'bold', fontSize: 12 }}>Log In</Text>
                          </TouchableOpacity>

                        </View>

                        {/* <Image 
                          source={{uri: "https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg"}}
                          style={{height: 70, width: 100, backgroundColor: 'pink'}}
                        /> */}

                        <Divider style={{ marginTop: 10 }} />

                        <CompanyLabel style={{ marginTop: 10 }} />

                      </View>

                    </View>

                  </View>

              </FixedContainer>

        </ImageBackground>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg: {
    //flex: 1
    //height: Dimensions.get('screen').height + 310,
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height + 600,
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height * 0.3,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
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
    fontWeight: 'bold'
  },
  activeContainer: {
    flex: 0.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  iconImage: {
    height: 20,
    width: 30
  },
  calendarField:{ 
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, 
    height: Dimensions.get('window').height * 0.065, 
    borderRadius: 15, 
    borderWidth: 1.5, 
    borderColor: colors.gray 
  },
  // picker:{
  //   marginTop: 4, 
  //   height: Dimensions.get('window').height * 0.065, 
  //   borderRadius: 15, 
  //   borderWidth: 1.5, 
  //   borderColor: colors.gray, 
  //   justifyContent: 'center' 
  // },
  registerSwitchContainer:{
    marginTop: 10, 
    width: '70%', 
    height: 30,
    alignSelf: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#E5DDDD', 
    borderRadius: 20
  },
  registerType:{
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    borderRadius: 20,
  }
});

export default RegisterScreen;