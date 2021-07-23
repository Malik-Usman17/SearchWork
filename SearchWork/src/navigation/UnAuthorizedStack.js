import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Constants from '../Constants/Constants.json';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import IndividualJob from '../screens/IndividualJob';
import JobListing from '../screens/JobListing';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import TestScreen from '../screens/TestScreen';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNavigation from './DrawerNavigation';
import EmployerDrawerStack from './EmployerDrawerStack';
import RegisterScreen from '../screens/RegisterScreen';
import JobCategoryList from '../screens/JobCategoryList';


const {Screen, Navigator} = createStackNavigator();

const UnAuthorizedStack = () => {
    return(
        <Navigator initialRouteName={Constants.screen.SplashScreen} screenOptions={{headerShown: false}}>
          <Screen name={Constants.screen.SplashScreen} component={SplashScreen}/>
          <Screen name={Constants.screen.LoginScreen} component={LoginScreen}/>
          <Screen name={Constants.screen.ForgotPassScreen} component={ForgotPassScreen}/>
          <Screen name={Constants.screen.RegisterScreen} component={RegisterScreen}/>
          {/* <Screen name={Constants.screen.JobListing} component={JobListing}/>
          <Screen name={Constants.screen.IndividualJob} component={IndividualJob}/> */}
          <Screen name={Constants.screen.BottomTabNavigation} component={BottomTabNavigation}/>
          <Screen name={Constants.screen.DrawerNavigation} component={DrawerNavigation}/>
          <Screen name={Constants.screen.EmployerDrawerStack} component={EmployerDrawerStack} />
          <Screen name={Constants.screen.JobCategoryList} component={JobCategoryList}/>
          <Screen name='TestScreen' component={TestScreen}/>
        </Navigator> 
    )
}


export default UnAuthorizedStack;

