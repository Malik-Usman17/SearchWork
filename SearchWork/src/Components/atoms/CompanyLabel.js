import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Constants from '../../Constants/Constants.json';


const CompanyLabel = ({style, onPress, disabled}) => {
  return(
    <TouchableOpacity
      activeOpacity={0.7} 
      disabled={disabled} 
      onPress={() => {
        Linking.openURL(Constants.url.webiste).catch(err => console.error('An error occurred', err))
      }}
    >
      <Text style={[styles.text, style]}>Powered by: Hegemonic Softwares</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text:{
    alignSelf: 'center', 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: 'gray'
  }
})

export default CompanyLabel;