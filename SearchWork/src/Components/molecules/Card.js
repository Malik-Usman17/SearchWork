import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../Constants/colors';

const Card = ({style, title, imageSource}) => {
  return(
    <TouchableOpacity style={[styles.card, style]} activeOpacity={0.7}>

      <Image source={imageSource} resizeMode='contain' style={styles.image}/>

      <Text style={styles.text}>{title}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primaryColorLight,
    width: Dimensions.get('window').width * 0.44,
    height: Dimensions.get('window').height * 0.18,
    elevation: 8
  },
  text:{
    fontWeight: 'bold',
    color: colors.white
  },
  image:{
    width: 60,
    height: 60
  }
});

export default Card;
