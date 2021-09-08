import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import colors from '../Constants/colors';
import Constants from '../Constants/Constants.json';
import EmployerDashboard from '../screens/Employer/EmployerDashboard';
import EmployerProfile from '../screens/Employer/EmployerProfile';
import EmployerDrawerContent from '../screens/Employer/EmployerDrawerContent';
import JobPosted from '../screens/Employer/JobPosted';
import JobPostedList from '../screens/Employer/JobPostedList';
import IndividualJob from '../screens/IndividualJob';
import AppliedJobsList from '../screens/Employer/AppliedJobsList';
import Applicants from '../screens/Employer/Applicants';
import Resume from '../screens/Resume';
import UpdateJob from '../screens/Employer/UpdateJob';
import Draft from '../screens/Employer/Draft';


const Drawer = createDrawerNavigator();

const EmployerDrawerStack = () => {
  return(
    <Drawer.Navigator 
      drawerStyle={{borderBottomRightRadius: 40, width: 320, backgroundColor: colors.white}} 
      drawerContent={props => <EmployerDrawerContent {...props} />} 
      initialRouteName={Constants.screen.EmployerDashboard}
    >
      <Drawer.Screen name={Constants.screen.EmployerDashboard} component={EmployerDashboard} />
      <Drawer.Screen name={Constants.screen.EmployerProfile} component={EmployerProfile} />
      <Drawer.Screen name={Constants.screen.JobPosted} component={JobPosted} />
      <Drawer.Screen name={Constants.screen.JobPostedList} component={JobPostedList} />
      <Drawer.Screen name={Constants.screen.IndividualJob} component={IndividualJob} />
      <Drawer.Screen name={Constants.screen.AppliedJobsList} component={AppliedJobsList}/>
      <Drawer.Screen name={Constants.screen.Applicants} component={Applicants}/>
      <Drawer.Screen name={Constants.screen.Resume} component={Resume}/>
      <Drawer.Screen name={Constants.screen.UpdateJob} component={UpdateJob}/>
      <Drawer.Screen name={Constants.screen.Draft} component={Draft} />

    </Drawer.Navigator>
  )
}

export default EmployerDrawerStack;