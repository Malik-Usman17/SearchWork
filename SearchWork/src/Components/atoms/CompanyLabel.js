import React from 'react';
import {Text, View, StyleSheet} from 'react-native';


const CompanyLabel = ({style}) => {
  return(
    <View>
      <Text style={[styles.text, style]}>Powered by: Hegemonic Softwares</Text>
    </View>
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