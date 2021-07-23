import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native';
import HeaderImage from '../Components/atoms/HeaderImage';
import colors from '../Constants/colors';
import MenuIcon from '../Components/atoms/MenuIcon';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import EmployerLogo from '../Components/atoms/EmployerLogo';
import Logo from '../Components/atoms/Logo';
import InputField from '../Components/molecules/InputField';
import { Picker } from '@react-native-picker/picker';
import Button from '../Components/molecules/Button';

const JobPosted = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage />

        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon />
              <Logo />
            </View>


            <LanguagePicker
              viewStyle={{ flex: 0.65 }}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
            />

          </View>

          <Text style={styles.screenTitle}>Post a Job</Text>

        </View>

        <View style={styles.infoContainer}>
          <InputField
            title='Job Title'
            iconName='person'
            placeholder='Job Title'
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <InputField
              inputFieldStyle={{ width: 150 }}
              keyboardType={'number-pad'}
              title='Hourly Pay'
              iconName='person'
              placeholder='$'
            />

            <View style={{ marginTop: 10, flex: 0.9 }}>
              <Text style={{ color: colors.primaryColor, fontWeight: '700', marginLeft: 7 }}>
                Duration
              </Text>
              <View style={styles.picker}>
                <Picker
                  mode={'dropdown'}
                  dropdownIconColor={colors.primaryColor}
                >
                  <Picker.Item label='Job Type' value={0} />
                  <Picker.Item label='Part Time' value={0} />
                  <Picker.Item label='Full Time' value={0} />
                </Picker>
              </View>
            </View>

          </View>

          <InputField
            title='Job Category'
            iconName='person'
            placeholder='Job Category'
          />

          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>

            <View>
              <Text style={{ fontWeight: '700', color: colors.primaryColor, marginLeft: 7 }}>Upload Image</Text>
              <View style={styles.UploadImageContainer}>
                <Text>hello there</Text>
              </View>
            </View>

            <Button
              title='Choose File'
              style={styles.chooseFileButton}
            />

          </View>

          <InputField
            title='Description'
            placeholder='Your Job Description'
            editable={description.length == 250 ? true : false}
            //inputFieldStyle
            inputFieldStyle={{alignItems: 'flex-start', height: Dimensions.get('window').height * 0.2 }}
            value={description}
            onChaneText={setDescription}
          //placeholder='Job Description'
          />
          <Text style={{alignSelf: 'flex-end', color: colors.darkGray, fontWeight: 'bold', fontSize: 12}}>{`${description.length} / 250 Characters`}</Text>

          <InputField
            title='No Of Posts'
            placeholder='No Of Posts'
          />

          <InputField
            title='Address'
            placeholder='Address'
            iconName='location-sharp'
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ marginTop: 10, flex: 0.47 }}>
              <Text style={{ color: colors.primaryColor, fontWeight: '700', marginLeft: 7 }}>
                City
              </Text>
              <View style={styles.picker}>
                <Picker
                  mode={'dialog'}
                  dropdownIconColor={colors.primaryColor}
                //selectedValue={selectedValue}
                //onValueChange={onValueChange}
                >
                  <Picker.Item label='Select City' value={0} />
                  <Picker.Item label='Houston' value={0} color={colors.primaryColor} />
                  <Picker.Item label='Texas' value={0} />
                  <Picker.Item label='Illinois' value={0} />

                </Picker>
              </View>
            </View>

            <View style={{ marginTop: 10, flex: 0.47 }}>
              <Text style={{ color: colors.primaryColor, fontWeight: '700', marginLeft: 7 }}>
                State
              </Text>
              <View style={styles.picker}>
                <Picker
                  mode={'dropdown'}
                  dropdownIconColor={colors.primaryColor}
                >
                  <Picker.Item label='Select State' value={0} />
                  <Picker.Item label='Houston' value={0} />
                  <Picker.Item label='Texas' value={0} />
                  <Picker.Item label='Illinois' value={0} />
                  <Picker.Item label='Houston' value={0} />
                </Picker>
              </View>
            </View>

          </View>

          <View style={styles.mapView}>
            <Text>Map View</Text>
          </View>



        </View>

        <View style={styles.bottomButtonContainer}>
          
          <Button
            style={{ ...styles.button, backgroundColor: colors.primaryColor }}
            title='Post'
          />

          <Button
            style={styles.button}
            title='Cancel'
          />

        </View>

      </ImageBackground>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    //height: Dimensions.get('screen').height + 550,
    width: Dimensions.get('window').width
  },
  screenTitle: {
    alignSelf: 'center',
    marginTop: 20,
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold'
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10
  },
  picker: {
    marginTop: 4,
    height: Dimensions.get('window').height * 0.065,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.gray,
    justifyContent: 'center'
  },
  UploadImageContainer: {
    marginTop: 4,
    justifyContent: 'center',
    paddingLeft: 10,
    width: 200,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1.5,
    height: Dimensions.get('window').height * 0.065
  },
  chooseFileButton: {
    height: Dimensions.get('window').height * 0.06,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: colors.primaryColor,
    width: 130
  },
  picker: {
    marginTop: 4,
    height: Dimensions.get('window').height * 0.065,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.gray,
    justifyContent: 'center'
  },
  mapView: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1.5,
    height: Dimensions.get('window').height * 0.065
  },
  bottomButtonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
    height: Dimensions.get('window').height * 0.07,
  }
})

export default JobPosted;