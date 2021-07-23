import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../Constants/colors';

const Description = ({label, value}) => {
  return (
    <>
      <View style={styles.decriptionContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>

      <View style={styles.divider} />
    </>
  )
}

const styles = StyleSheet.create({
  decriptionContainer:{
    paddingHorizontal: 10, 
    flexDirection: 'row', 
    height: Dimensions.get('window').height * 0.07, 
    alignItems: 'center' 
  },
  labelText:{
    fontSize: 17,
    //fontWeight: 'bold', 
    //backgroundColor: 'green', 
    width: Dimensions.get('window').width * 0.38
  },
  valueText:{
    marginLeft: 20, 
    fontSize: 15, 
    //backgroundColor: 'pink', 
    flex: 1 
  },
  divider:{
    marginHorizontal: 12, 
    height: 0.5, 
    backgroundColor: colors.gray 
  }
});

export default Description;