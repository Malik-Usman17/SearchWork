import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import UnAuthorizedStack from './UnAuthorizedStack';


const AppNavigation = () => {
  return (
    <NavigationContainer>
      <UnAuthorizedStack />
    </NavigationContainer>
  )
}

export default AppNavigation;