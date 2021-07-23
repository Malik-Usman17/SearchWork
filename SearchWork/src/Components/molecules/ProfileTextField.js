import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Divider from '../atoms/Divider';

const ProfileTextField = ({title, value, onChangeText, editable }) => {
  return (
    <View style={{paddingHorizontal: 10}}>
    
    <View style={styles.container}>
      
      <Text style={styles.title}>{title}</Text>
      
      <TextInput
        style={styles.textField}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />

    </View>

    <Divider />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  title:{
    width: Dimensions.get('window').width * 0.35, 
    fontSize: 16, 
  },
  textField:{
    marginLeft: 7, 
    flex: 1 
  }
})
export default ProfileTextField;