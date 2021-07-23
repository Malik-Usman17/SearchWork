// import DatePicker from 'react-native-date-picker';
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
import CityPicker from '../Components/organisms/CityPicker';
import {DateFormat} from '../Components/atoms/DateFormat';
import Constants from '../Constants/Constants.json';

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

  console.log('State:',statePicker)
  //console.log('States:',cityStates)

  const cities = cityStates.filter((value) => value.stateId == statePicker)
  //console.log('Cities:',cities)

  const cityItems = cities.length > 0 ? cities[0].cities : null

  console.log('City:',city)
 

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

  //console.log(country)

  return (
    <ScrollView 
      style={{ flex: 1 }} 
      //nestedScrollEnabled={true}
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
                          style={{flex: 0.5, height: '100%', justifyContent: 'center', alignItems: 'center' }}
                          onPress={() => navigation.push(Constants.screen.LoginScreen)}
                        >
                          <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={styles.activeContainer}
                          onPress={() => navigation.navigate(Constants.screen.RegisterScreen)}
                        >
                          <Text style={styles.loginText}>Create Account</Text>
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
                        <InputField
                          title='Full Name'
                          placeholder='Enter Your Full Name'
                          iconName='person'
                        />

                        <InputField
                          title='Email'
                          placeholder='Email Address'
                          iconName='mail'
                        />

                        <InputField
                          title='Phone'
                          placeholder='Phone Number'
                          keyboardType='phone-pad'
                          iconName='phone-portrait'
                        />

                        {
                          register == false ?
                        

                        <View style={{ marginTop: 10 }}>
                          {show && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={date}
                              mode={mode}
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

                        <InputField
                          title='Address'
                          placeholder='Your Full Address'
                          iconName='location-sharp'
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                          <StatePicker 
                            pickerContainerStyle={{marginTop: 10, flex: 0.49}}
                            items={cityStates}
                            selectedValue={statePicker}
                            onValueChange={(itemValue, itemIndex) => {
                              setStatePicker(itemValue)
                            }}
                          />

                          <CityPicker 
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
                          </CityPicker>

                        </View>

                        <PasswordField
                          title='Password'
                          placeholder='Set Password'
                          secureTextEntry={eye ? true : false}
                          iconName={eye ? 'eye-off' : 'eye'}
                          onPress={() => setEye(!eye)}
                        />


                        <PasswordField
                          title='Confirm Password'
                          placeholder='Confirm Password'
                          secureTextEntry={confirmEye ? true : false}
                          iconName={confirmEye ? 'eye-off' : 'eye'}
                          onPress={() => setConfirmEye(!confirmEye)}
                        />

                        <Button title='Create Account' style={{marginTop: 15}}/>

                        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'center' }}>

                          <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 12 }}>Already have an account?</Text>

                          <TouchableOpacity>
                            <Text style={{ marginLeft: 10, textDecorationLine: 'underline', color: colors.buttonColor, fontWeight: 'bold', fontSize: 12 }}>Log In</Text>
                          </TouchableOpacity>

                        </View>

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
    height: Dimensions.get('screen').height + 310,
    width: Dimensions.get('window').width,
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
    height: Dimensions.get('window').height * 0.075
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
    backgroundColor: colors.primaryColorLight,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 10
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