import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Constants from '../Constants/Constants.json';
import EmployeeDashboard from '../screens/EmployeeDashboard';
import SavedJobs from '../screens/SavedJobs';
import DrawerContent from '../screens/DrawerContent';
import colors from '../Constants/colors';
import Divider from '../Components/atoms/Divider';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return(
    <Drawer.Navigator 
      drawerStyle={{borderBottomRightRadius: 40, width: 320, backgroundColor: colors.white}} 
      drawerContent={props => <DrawerContent {...props} />} 
      initialRouteName={Constants.screen.BottomTabNavigation}
    >
      <Drawer.Screen name={Constants.screen.EmployeeDashboard} component={EmployeeDashboard}/>
      <Drawer.Screen name={Constants.screen.SavedJobs} component={SavedJobs}/>
      <Drawer.Screen name={Constants.screen.BottomTabNavigation} component={BottomTabNavigation}/>
      {/* <Drawer.Screen name={Constants.screen.DrawerContent} component={DrawerContent} /> */}

    </Drawer.Navigator>
  )
}

export default DrawerNavigation;