import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from "../../Constants/colors";

const ProfilePicture = ({style}) => {
  return(
    <View style={[styles.pictureContainer, style]}>
      <FontAwesome5 name='user' size={30} color={colors.gray}/>
    </View>
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
    backgroundColor: '#C5C4C7'
  }
});

export default ProfilePicture;