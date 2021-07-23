import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../Constants/colors';

const PasswordField = ({title, placeholder, secureTextEntry, onPress, iconName}) => {
  return(
    <View style={{ marginTop: 10 }}>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputFieldContainer}>

        <Ionicons
          name='lock-closed'
          size={18}
          style={{ marginLeft: 10 }}
          color={colors.gray}
        />

        <TextInput
          style={{ marginLeft: 3, flex: 0.96 }}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />

        <TouchableOpacity onPress={onPress}>
          <Ionicons name={iconName} size={18} color={colors.gray} />
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    color: colors.primaryColor, 
    fontWeight: '700', 
    marginLeft: 7 
  },
  inputFieldContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1.5,
    height: Dimensions.get('window').height * 0.065
  },
});

export default PasswordField;