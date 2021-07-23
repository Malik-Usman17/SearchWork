import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../Constants/colors';


const CityPicker = (props) => {

  // const data = items;

  return(
    <View style={props.pickerContainerStyle}>
      <Text style={styles.pickerTitle}>
        City
      </Text>

      <View style={styles.picker}>
        <Picker
          mode={'dropdown'}
          dropdownIconColor={colors.primaryColor}
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
        >
          <Picker.Item label='Select City' value={0} />

          {props.children}

          {/* {data.length > 0 ?
          
            data.map((val, index) => (
              <Picker.Item 
                key={index}
                label={val.city}
                value={val.cityId}
              />
            )) : null} */}
          {/* // : null } */}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pickerTitle:{
    color: colors.primaryColor, 
    fontWeight: '700', 
    marginLeft: 7
  },
  picker:{
    marginTop: 4, 
    height: Dimensions.get('window').height * 0.065, 
    borderRadius: 15, 
    borderWidth: 1.5, 
    borderColor: colors.gray, 
    justifyContent: 'center' 
  },
});

export default CityPicker;