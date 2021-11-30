import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../Constants/colors';

const LanguagePicker = ({viewStyle, value, open, setOpen, setValue, containerStyle}) => {
  return(
    <View style={viewStyle}>
      <DropDownPicker 
        items={[
          {
            label: 'Eng',
            value: 'eng',
            icon: () => (<Image source={require('../../../assets/usa.png')} style={styles.iconImage} />)
          },
          {
            label: 'Mex',
            value: 'mex',
            icon: () => (<Image source={require('../../../assets/Mexico.png')} style={styles.iconImage} />)
          },
        ]}
        placeholder='Select Language'
        listMode='SCROLLVIEW'
        value={value}
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        style={{ borderRadius: 30}}
        textStyle={{fontSize: 11}}
        //labelStyle={{fontWeight: 'bold'}}
        containerStyle={containerStyle}
        dropDownContainerStyle={{ backgroundColor: colors.white, marginTop: 3}}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  iconImage: {
    height: 16,
    width: 20
  },
});

export default LanguagePicker;
