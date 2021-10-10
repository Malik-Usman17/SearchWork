import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native';
import colors from '../../Constants/colors';

const NoData = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/noData.jpg')} resizeMode='contain' style={{ height: 300, width: 400 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default NoData;
