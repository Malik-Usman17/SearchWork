import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';
import EmployerDashboard from '../screens/EmployerDashboard';
import EmployerDrawerContent from '../screens/EmployerDrawerContent';
import JobPosted from '../screens/JobPosted';
import JobPostedList from '../screens/JobPostedList';
import EmployerJobView from '../screens/EmployerJobView';
import AppliedJobsList from '../screens/AppliedJobsList';
import Applicants from '../screens/Applicants';
import EmployerProfile  from '../screens/EmployerProfile';

const Drawer = createDrawerNavigator();

const EmployerDrawerStack = () => {
  return(
    <Drawer.Navigator 
      drawerStyle={{borderBottomRightRadius: 40, width: 320, backgroundColor: colors.white}} 
      drawerContent={props => <EmployerDrawerContent {...props} />} 
      initialRouteName={Constants.screen.EmployerProfile}
    >
      
      <Drawer.Screen name={Constants.screen.EmployerDashboard} component={EmployerDashboard} />
      <Drawer.Screen name={Constants.screen.JobPosted} component={JobPosted} />
      <Drawer.Screen name={Constants.screen.JobPostedList} component={JobPostedList} />
      <Drawer.Screen name={Constants.screen.EmployerJobView} component={EmployerJobView} />
      <Drawer.Screen name={Constants.screen.AppliedJobsList} component={AppliedJobsList} />
      <Drawer.Screen name={Constants.screen.Applicants} component={Applicants} />
      <Drawer.Screen name={Constants.screen.EmployerProfile} component={EmployerProfile}/>

    </Drawer.Navigator>
  )
}

export default EmployerDrawerStack;