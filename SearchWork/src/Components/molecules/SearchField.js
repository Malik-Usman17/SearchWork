import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Constants/colors';


const SearchField = ({value, onChangeText, style}) => {
  return (
    <View style={[styles.searchFieldConatiner, style]}>

      <TextInput
        style={styles.inputField}
        placeholder='Search Job'
        value={value}
        onChangeText={onChangeText}
      />

      <View style={styles.chipContainer}>
        <FontAwesome5 name='search' size={16}/>
        <Text style={styles.text}>Find Job</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  searchFieldConatiner: {
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: colors.primaryColorLight
  },
  inputField: {
    flex: 1,
    marginLeft: 10
  },
  chipContainer: {
    flex: 0.4,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    borderRadius: 20
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 3
  }
});

export default SearchField;

