import React, {useEffect} from 'react';
import { Dimensions, Image, Text, StatusBar, StyleSheet, View } from 'react-native';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import colors from '../Constants/colors';
import { CommonActions } from '@react-navigation/native';
import Constants from '../Constants/Constants.json';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    
    setTimeout(() => {
      navigation.dispatch(CommonActions.reset({index:0, routes:[{name: Constants.screen.LoginScreen}]}));
    }, 1000)

}, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.primaryColor} />

      <Image source={require('../../assets/bgUp.jpg')} resizeMode='cover' style={styles.image}/>

      <View style={styles.logoContainer}>

        <Image resizeMode='contain' source={require('../../assets/logo.png')} style={styles.logo} />

        <CompanyLabel style={{ color: colors.white ,marginTop: 15}}/>

      </View>

      <Image source={require('../../assets/bgDown.jpg')} resizeMode='cover' style={styles.image}/>

    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer:{
    backgroundColor: colors.primaryColor, 
    flex: 0.5, 
    borderWidth: 1.5, 
    borderColor:colors.white, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image:{
    flex: 1, 
    width: '100%'
  },
  logo:{
    flex: 0.9,
    width: Dimensions.get('window').width * 0.75,
  },
})

export default SplashScreen;