import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';
import DrawerContent from '../screens/Employee/DrawerContent';
import JobCategoryList from '../screens/Employee/JobCategoryList';
import JobListing from '../screens/Employee/JobListing';
import BottomTabNavigation from './BottomTabNavigation';
import IndividualJob from '../screens/IndividualJob';
import JobCategory from '../screens/Employee/JobCategory';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return(
    <Drawer.Navigator 
      drawerStyle={styles.drawerStyle} 
      drawerContent={props => <DrawerContent {...props} />} 
      initialRouteName={Constants.screen.BottomTabNavigation}
    >
      <Drawer.Screen name={Constants.screen.BottomTabNavigation} component={BottomTabNavigation}/>
      <Drawer.Screen name={Constants.screen.IndividualJob} component={IndividualJob}/>
      <Drawer.Screen name={Constants.screen.JobListing} component={JobListing}/>
      <Drawer.Screen name={Constants.screen.JobCategoryList} component={JobCategoryList}/> 
      <Drawer.Screen name={Constants.screen.JobCategory} component={JobCategory}/>
    
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerStyle:{
    borderBottomRightRadius: 40, 
    width: 320, 
    backgroundColor: colors.white
  }
})

export default DrawerNavigation;