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
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../redux/slices';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import ErrorModal from '../../Components/organisms/ErrorModal';
import Loader from '../../Components/atoms/Loader';
import CustomModal from '../../Components/organisms/CustomModal';



const EmployerProfile = ({ navigation }) => {

  const user = useSelector(userLogin);

  const [loader, setLoader] = useState(false);
  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [emailAddress, setEmailAddress] = useState(user?.email)
  const [contactNo, setContactNo] = useState(user?.phone)
  const [businessName, setBusinessName] = useState(user?.name)
  const [address, setAddress] = useState(user?.address)
  const [state, setState] = useState(user?.state)
  const [city, setCity] = useState(user?.city)
  const [zipCode, setZipCode] = useState(user?.zipcode.toString())
  const [editFields, setEditFields] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  function profileImage(){
    if(imageUrl == ''){
      if(user?.image_urls != undefined){
        return user?.image_urls['3x']
      }
    }
    else{
      return imageUrl
    }
  }

  const pickFromGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 500,
      maxWidth: 500
    }, (response) => {
      if(response?.didCancel){
        setImageUrl('')
      }
      else if (response?.errorMessage){
        console.log('Error:',response?.errorMessage)
      }
      else{
        const source = response?.assets[0].uri
        setImageUrl(source)
      }
    })
  }

  var bodyFormData = new FormData();

   businessName != '' && bodyFormData.append('name', businessName)
  contactNo != '' && bodyFormData.append('phone', contactNo)
  imageUrl != '' && bodyFormData.append('image', {uri: imageUrl, name: 'profile_picture', type: 'image/*'})
  address != '' && bodyFormData.append('address', address)
  state != '' && bodyFormData.append('state', state)
  city != '' && bodyFormData.append('city', city)

  

  async function updateProfile(){
    setLoader(true)

    try{
      var response = await apiCall(
        ApiConstants.methods.POST, 
        ApiConstants.endPoints.UpdateProfile,
        bodyFormData
      );

      if(response.isAxiosError == true){
        setModalMessage(response.response.data.error.messages.map(val => val+'\n'))
        //setErrorMessage(response.response.data.error.messages.map(val => val+'\n'))
        setModalVisible(true)
        //setErrorModal(true)
        setLoader(false)
      }
      else{
        setModalMessage('Profile has been successfully updated')
        setModalVisible(true)
        setLoader(false)
      }
    }
    catch(error){
      console.log('Catch Body:',error);
      setLoader(false)
    }
  }

  if(loader == true){
    return(
      <Loader />
    )
  }

  return (
    <ScrollView 
      style={{backgroundColor: colors.white, flex: 1 }} 
      showsVerticalScrollIndicator={false}
    >

      <StatusBar backgroundColor={colors.primaryColor} />

      <CustomModal
        type='confirmation'
        message={modalMessage} 
        imageSource={modalMessage != 'Profile has been successfully updated' ? require('../../../assets/warning.png') : require('../../../assets/checked.png')}
        isVisible={modalVisible}
        onPressOk={() => setModalVisible(false)}
      />

      <HeaderImage style={{ height: Dimensions.get('window').height * 0.21 }} />

      <HeaderRowContainer>
        <MenuIcon onPress={() => navigation.openDrawer()} />

        <View style={{alignItems: 'center'}}>

          <ProfilePicture
            disabled={editFields == true ? false : true} 
            iconSize={40}
            onPress={() => pickFromGallery()} 
            imageSource={profileImage()}
            imageStyle={styles.profileImage}
          />

          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.white }}>{user?.name}</Text>
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

      <View style={styles.infoContainer}>

        <Heading title='BUSINESS INFORMATION' style={{marginTop: 5}}/>

        <ProfileTextField 
          title='BUSINESS NAME'
          maxLength={30}
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
          editable={false}
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
          title='ZIP CODE'
          multiline={true}
          value={zipCode}
          onChangeText={setZipCode}
          editable={editFields}
        />

      </View>

    <View style={{height: 100}}>
      <View style={{flexDirection: 'row', marginTop: 'auto'}}>
        <Button 
          title='Edit Profile' 
          style={styles.button} 
          onPress={() => setEditFields(true)}
        />

        <Button
          title='Saved'
          style={{ ...styles.button, borderTopRightRadius: 30, borderTopLeftRadius: 0, backgroundColor: colors.primaryColor }}
          onPress={() => {
            updateProfile()
            setEditFields(false)
          }}
        />
      </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 9,
    paddingHorizontal: 9
  },
  button: {
    flex: 1,
    height: Dimensions.get('window').height * 0.093,
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
  },
  profileImage:{
    height: 80, 
    width: 80, 
    borderRadius: 40, 
    borderWidth: 2, 
    borderColor: colors.white
  }
});

export default EmployerProfile;