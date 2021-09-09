import React, { useState } from 'react';
import { Dimensions, ImageBackground, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Heading from '../../Components/atoms/Haeding';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import Button from '../../Components/molecules/Button';
import Description from '../../Components/molecules/Description';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import ProfileTextField from '../../Components/molecules/ProfileTextField';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const EmployerProfile = ({ navigation }) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [website, setWebsite] = useState('www.searchwork.com')
  const [emailAddress, setEmailAddress] = useState('testinguser@mail.com')
  const [contactNo, setContactNo] = useState('03101234567')
  const [businessName, setBusinessName] = useState('My Testing Business')
  const [address, setAddress] = useState('mehmoodabad Gate street 2 Karachi 75460')
  const [state, setState] = useState('Texas')
  const [city, setCity] = useState('Houston')
  const [zipCode, setZipCode] = useState('75601')
  const [editFields, setEditFields] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  console.log('Image Url:',imageUrl)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <HeaderImage style={{ height: Dimensions.get('window').height * 0.29 }} />

      <HeaderRowContainer>
        <MenuIcon onPress={() => navigation.openDrawer()} />

        <View>
          <ProfilePicture 
            iconSize={40} 
            onPress={() => {
              launchImageLibrary({
                mediaType: 'photo',
              }, (response) => {
                console.log('Response:',response)
                if(response?.didCancel){
                  setImageUrl('')
                }else if (response?.errorMessage){
                  console.log('Error:',response?.errorMessage)
                } else {
                  setImageUrl(response?.assets[0].uri)
                }
              })
            }}
            imageSource={imageUrl != '' ? imageUrl : undefined}
            imageStyle={{height: 80, width: 80, borderRadius: 40, borderWidth: 2, borderColor: colors.white}}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.white }}>John Doe</Text>
        </View>

        <LanguagePicker
          viewStyle={{ width: 80 }}
          containerStyle={{ flex: 1 }}
          value={lang}
          setValue={setLang}
          open={dropDown}
          setOpen={setDropDown}
        />

      </HeaderRowContainer>

      <Text style={{alignSelf: 'center', paddingHorizontal: 9, color: colors.white, position: 'absolute', top: 120 }}>
        Lorem ipsum dolognr sit amet, consectetur adipiscings elit. Etiam pellentesque erat vitae nibh feugiat sollicitudin.
      </Text>

      <View style={styles.infoContainer}>

        <Heading title='BUSINESS INFORMATION' style={{marginTop: 5}}/>

        <ProfileTextField 
          title='BUSINESS NAME'
          multiline={true}
          value={businessName}
          onChangeText={setBusinessName}
          editable={editFields}
        />

        <ProfileTextField 
          title='CONTACT NO'
          value={contactNo}
          onChangeText={setContactNo}
          keyboardType='phone-pad'
          editable={editFields}
        />

        <ProfileTextField 
          title='EMAIL'
          multiline={true}
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType='email-address'
          editable={editFields}
        />

        <ProfileTextField 
          title='WEBSITE'
          multiline={true}
          value={website}
          onChangeText={setWebsite}
          editable={editFields}
        />

        <Heading title='BUSINESS LOCATION' style={{ marginTop: 16 }} />

        <ProfileTextField 
          title='ADDRESS'
          multiline={true}
          value={address}
          onChangeText={setAddress}
          editable={editFields}
        />

        <ProfileTextField 
          title='STATE'
          value={state}
          onChangeText={setState}
          editable={editFields}
        />

        <ProfileTextField 
          title='CITY'
          value={city}
          onChangeText={setCity}
          editable={editFields}
        /> 

        <ProfileTextField 
          title='ADDRESS'
          multiline={true}
          value={zipCode}
          onChangeText={setZipCode}
          editable={editFields}
        />

      </View>

      <View style={{ flexDirection: 'row' }}>
        <Button 
          title='Edit Profile' 
          style={styles.button} 
          onPress={() => setEditFields(!editFields)}
        />

        <Button
          title='Saved'
          style={{ ...styles.button, borderTopRightRadius: 30, borderTopLeftRadius: 0, backgroundColor: colors.primaryColor }}
        />
      </View>
      
      {/* <View style={{borderBottomLeftRadius: 20, marginTop: 10, height: 100, marginBottom: 10, backgroundColor: 'pink', overflow:'hidden'}}>
        <Text>hooooooolljiedhviu</Text>
      <ImageBackground source={require('../../../assets/bgUpG.jpg')} style={{flex: 1}}>
        <Text>Hello there</Text>
      </ImageBackground>
      </View> */}

      {/* <Image source={require('../../../assets/bgUpG.jpg')} style={{height: 120, width: '100%', borderRadius: 20, borderWidth: 2, borderColor: 'white'}}/> */}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height * 0.3,
  },
  infoContainer: {
    paddingVertical: 9,
    paddingHorizontal: 9
  },
  button: {
    flex: 0.5,
    height: Dimensions.get('screen').height * 0.08,
    borderTopLeftRadius: 30,
    borderRadius: 0
  },
  userImageContainer: {
    backgroundColor: colors.lightGray,
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EmployerProfile;