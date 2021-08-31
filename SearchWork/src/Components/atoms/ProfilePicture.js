import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../../Constants/colors";


const ProfilePicture = ({style, onPress, disabled, iconSize, imageSource}) => {
  //console.log('Image Source:',imageSource)

  return(
    <TouchableOpacity 
      style={[styles.pictureContainer, style]} 
      disabled={disabled}
      onPress={onPress}
    >
      {
        imageSource != undefined && imageSource != false ?
          <Image source={{uri: imageSource}} style={styles.imageStyle}/> 
        : 
          <FontAwesome5 name='user' size={iconSize} color={colors.gray}/>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pictureContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: '#C5C4C7',
    overflow: 'hidden'
  },
  imageStyle:{
    flex: 1,
    width: '100%'
  }
});

export default ProfilePicture;