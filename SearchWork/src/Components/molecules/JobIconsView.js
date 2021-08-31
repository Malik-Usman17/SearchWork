import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../Constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const JobIconsView = ({onPress, title, style}) => {
  return (
    <View style={[styles.mainContainer, style]}>

    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <Entypo name='briefcase' size={20} color={colors.white}/>
    </TouchableOpacity>
    <Text style={{marginTop: 4, fontWeight: 'bold', fontSize: 11}}>{title}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'center', 
    //justifyContent: 'center', 
    //backgroundColor: 'gray',
    height: 60,
    width: 100
  },
  container:{
    height: 40, 
    width: 40, 
    borderRadius: 20, 
    backgroundColor: colors.primaryColor, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

export default JobIconsView;