import React, { useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import Divider from '../Components/atoms/Divider';
import HeaderImage from '../Components/atoms/HeaderImage';
import Logo from '../Components/atoms/Logo';
import Button from '../Components/molecules/Button';
import FixedContainer from '../Components/molecules/FixedContainer';
import InputField from '../Components/molecules/InputField';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';

const ForgotPassScreen = ({navigation}) => {

  const [country, setCountry] = useState('esp');
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../assets/blurBg.png')} style={styles.bgImage}>

        <HeaderImage />

        <FixedContainer>

          <View style={{ marginBottom: 12, flex: 1, flexDirection: 'row', marginTop: 25 }}>

            <View style={{flex: 1}}>
              <Logo />
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
                <Text style={styles.welcomeText}>Forgot Your Password?</Text>
                <Text style={{ fontSize: 12, color: 'gray', fontWeight: '700' }}>Confirm your email and we'll send the instructions</Text>

                <Divider style={{ marginTop: 10 }} />

                <InputField
                  style={{ marginTop: 22 }}
                  title='Email'
                  placeholder='Email Address'
                  iconName='mail'
                />

                <Button title='Reset Password' style={{ marginTop: 25 }} />

                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>

                  <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 12 }}>Already have an account?</Text>

                  <TouchableOpacity onPress={() => navigation.navigate(Constants.screen.LoginScreen)}>
                    <Text style={styles.loginIn}>Log In</Text>
                  </TouchableOpacity>

                </View>

                <Divider style={{ marginTop: 15 }} />

                <CompanyLabel style={{ marginTop: 15 }} />


              </View>

            </View>

          </View>

        </FixedContainer>

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    height: Dimensions.get('screen').height,
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

export default ForgotPassScreen;

