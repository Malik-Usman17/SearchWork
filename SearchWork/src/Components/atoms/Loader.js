import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../Constants/colors';
import EmployerLogo from './EmployerLogo';


const Loader = () => {
  return <View style={styles.Container}>
    <EmployerLogo />
    
    <ActivityIndicator
      style={{marginTop: 10}}
      size='large'
      color={colors.primaryColor}
    />

  </View>;
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;