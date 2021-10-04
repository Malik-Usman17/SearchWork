import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';


const CompanyLabel = ({style, onPress}) => {
  return(
    <TouchableOpacity onPress={onPress}>
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