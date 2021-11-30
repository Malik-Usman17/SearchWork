import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, ImageBackground, ScrollView, TouchableOpacity, Linking, StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import Button from '../../Components/molecules/Button';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import InputField from '../../Components/molecules/InputField';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import { cityStates } from '../../Components/organisms/CityStates';
import StatePicker from '../../Components/organisms/StatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { jobPostedSelector, jobsCategoryList, userLogin, setJobPost } from '../../redux/slices';
//import { setJobPost } from '../../redux/slices';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import translate from 'translate-google-api';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import CustomPicker from '../../Components/organisms/CustomPicker';
import Constants from '../../Constants/Constants.json';
import CustomModal from '../../Components/organisms/CustomModal';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../Components/atoms/Loader';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import { useRoute } from '@react-navigation/native';
import ErrorModal from '../../Components/organisms/ErrorModal';
//import translate from 'google-translate-api';
//import {GoogleTranslator} from '@translate-tools/core/translators/GoogleTranslator';



const JobPosted = ({ navigation }) => {

  const route = useRoute();
  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [hourlyPay, setHourlyPay] = useState('');
  const [jobDuration, setJobDuration] = useState('');
  const [jobCategory, setJobCategory] = useState(0);
  const [jobSubCategory, setJobSubCategory] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [jobPostNos, setJobPostNos] = useState('');
  const [statePicker, setStatePicker] = useState(0);
  const [city, setCity] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [missingFieldModal, setMissinFieldModal] = useState(false);
  const [missingField, setMissingField] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isModal, setisModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorModal, setErrorModal] = useState(false);


  const dispatch = useDispatch();

  var job = useSelector(jobPostedSelector);
  var jobObj = { ...job }
  
  const categoryList = useSelector(jobsCategoryList);
  const subCategoryItems = categoryList.filter(val => val.category_id_decode == jobCategory)[0]?.subcategories

  const cities = cityStates.filter((value) => value.state == job.state)
  const cityItems = cities.length > 0 ? cities[0].cities : null


  var bodyFormData = new FormData();

  bodyFormData.append('title', jobTitle)
  bodyFormData.append('category_id', jobCategory)
  jobSubCategory != 0 && bodyFormData.append('sub_category_id', jobSubCategory)
  bodyFormData.append('hourly_pay', hourlyPay)
  bodyFormData.append('duration', jobDuration)
  bodyFormData.append('description', jobDescription)
  bodyFormData.append('st_address', address)
  bodyFormData.append('city', city)
  bodyFormData.append('state', statePicker)
  imageUrl != '' && bodyFormData.append('image', { uri: imageUrl, name: 'test_image', type: 'image/*' })
  bodyFormData.append('zipcode', zipCode)
  jobPostNos != 0 && bodyFormData.append('no_of_posts', jobPostNos)


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if ((job.jobTitle != '' || job.address != '' ||
        job.city != 0 || job.duration != 0 ||
        job.hourlyPay != '' || job.jobCategory != 0 ||
        job.jobDescription != '' || job.jobSubCategory != 0 ||
        job.zipCode != ''
     ) && (route.name == "JobPosted")) {
        setisModal(true)
      }
      else {
        setisModal(false)
      }
    });
  }, [navigation, job])


  useFocusEffect(
    useCallback(() => {
      setJobTitle('');
      setHourlyPay('');
      setJobDuration(0);
      setJobCategory(0);
      setJobSubCategory(0);
      setImageUrl('');
      setJobDescription('');
      setJobPostNos(0);
      setAddress('');
      setStatePicker(0);
      setCity(0);
      setZipCode('');
    }, [])
  )

  const onCancel = () => {
    jobObj.jobTitle = '',
    jobObj.hourlyPay = '',
    jobObj.duration= 0,
    jobObj.jobCategory= 0,
    jobObj.jobSubCategory= 0,
    jobObj.jobDescription= '',
    jobObj.noOfEmployees= 0,
    jobObj.state= 0,
    jobObj.city= 0,
    jobObj.zipCode= '',
    jobObj.address= '',
    dispatch(setJobPost(jobObj))
  }

 

  async function jobPosted() {

    try {
      setLoader(true);

      var apiResponse = await apiCall(ApiConstants.methods.POST, ApiConstants.endPoints.PostJob, bodyFormData);

      if (apiResponse.isAxiosError == true) {
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setErrorModal(true)
        setLoader(false)
      }
      else {
        setLoader(false)
        setErrorModal(false);
        setSuccessModal(true);
      }
    }
    catch (error) {
      console.log('Job Posted Catch Body:', error);
      setLoader(false)
    }
  }

  if (loader == true) {
    return (
      <Loader />
    )
  }


  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      <ErrorModal 
        isVisible={errorModal}
        message={errorMessage}
        onPress={() => setErrorModal(false)}
      />

      <CustomModal
        type='confirmation'
        isVisible={missingFieldModal}
        message={'Please fill all the mandatory fields.'}
        imageSource={require('../../../assets/warning.png')}
        onPressOk={() => {
          setMissinFieldModal(false)
          setMissingField(true)
        }}
        buttonText='Ok'
      />



      <CustomModal
        type='confirmation'
        isVisible={successModal}
        message={'Job has been successfully created.'}
        imageSource={require('../../../assets/checked.png')}
        onPressOk={() => {
          setMissinFieldModal(false)
          setMissingField(false)
          setSuccessModal(false)
          setJobTitle('')
          setHourlyPay('')
          setImageUrl('')
          setJobDuration(0)
          setJobCategory(0)
          setJobSubCategory(0)
          setJobDescription('')
          setJobPostNos(0)
          setAddress('')
          setStatePicker(0)
          setCity(0)
          setZipCode('')
          jobObj.jobTitle = '',
          jobObj.hourlyPay = '',
          jobObj.duration= 0,
          jobObj.jobCategory= 0,
          jobObj.jobSubCategory= 0,
          jobObj.jobDescription= '',
          jobObj.noOfEmployees= 0,
          jobObj.state= 0,
          jobObj.city= 0,
          jobObj.zipCode= '',
          jobObj.address= '',
          dispatch(setJobPost(jobObj))
          navigation.navigate(Constants.screen.JobPostedList)
        }}
        buttonText='Ok'
      />

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.15 }} />

        <HeaderRowContainer>

          <MenuIcon onPress={() => navigation.openDrawer()} />

          <ScreenTitle title='Post A Job' />

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
          <InputField
            textStyle={{ color: jobTitle == '' && missingField == true ? 'red' : colors.primaryColor }}
            title='Job Title'
            iconName='person'
            placeholder='Job Title'
            maxLength={30}
            value={jobTitle}
            onChangeText={(val) => {
              setJobTitle(val)
              jobObj.jobTitle = val
              dispatch(setJobPost(jobObj))
            }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <InputField
              textStyle={{ color: hourlyPay == '' && missingField == true ? 'red' : colors.primaryColor }}
              style={{ flex: 0.45 }}
              keyboardType={'number-pad'}
              maxLength={5}
              title='Hourly Pay'
              iconName='person'
              placeholder='0$'
              value={hourlyPay}
              onChangeText={(val) => {
                setHourlyPay(val)
                jobObj.hourlyPay = val
                dispatch(setJobPost(jobObj))
              }}
            />

            <CustomPicker
              pickerTitleStyle={{ color: jobDuration == '' && missingField == true ? 'red' : colors.primaryColor }}
              pickerContainerStyle={{ marginTop: 10, flex: 0.52 }}
              label='Job Type'
              pickerTitle='Duration'
              selectedValue={jobDuration}
              onValueChange={(itemValue, itemIndex) => {
                setJobDuration(itemValue)
                jobObj.duration = itemValue
                dispatch(setJobPost(jobObj))
              }}
            >
              <Picker.Item label='Part Time' value={'part_time'} style={{fontSize: 14}}/>
              <Picker.Item label='Full Time' value={'full_time'} style={{fontSize: 14}}/>

            </CustomPicker>

          </View>

          <CustomPicker
            pickerTitleStyle={{ color: jobCategory == 0 && missingField == true ? 'red' : colors.primaryColor }}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select Job Category'
            pickerTitle='Job Category'
            selectedValue={jobCategory}
            onValueChange={(itemValue, itemIndex) => {
              setJobCategory(itemValue)
              jobObj.jobCategory = itemValue
              dispatch(setJobPost(jobObj))
            }}
          >
            {
              categoryList.map((val, index) => (
                <Picker.Item style={{fontSize: 14}} key={index} label={val.name} value={val.category_id_decode} />
              ))
            }
          </CustomPicker>

          <CustomPicker
            pickerTitleStyle={{ color: (subCategoryItems != null && jobSubCategory == 0 && missingField == true) ? 'red' : colors.primaryColor }}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select Job Sub Category'
            pickerTitle='Job Sub Category'
            selectedValue={jobSubCategory}
            onValueChange={(itemValue, itemIndex) => {
              setJobSubCategory(itemValue)
              jobObj.jobSubCategory = itemValue
              dispatch(setJobPost(jobObj))
            }}
          >
            {
              subCategoryItems != null ?
                subCategoryItems.map((val, index) => (
                  <Picker.Item style={{fontSize: 14}} key={index} label={val.name} value={val.id} />
                ))
                : null
            }
          </CustomPicker>

          <Text style={styles.uploadImageText}>Upload Image</Text>

          <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-between' }}>
            <View style={imageUrl == '' ? styles.EmptyUploadImageContainer : styles.UploadImageContainer}>
              <MaterialIcons name='cloud-upload' size={18} color={colors.gray} />
              <Text style={imageUrl == '' ? styles.emptyUploadImageText : { color: colors.gray, opacity: 0.7 }}>Upload Image</Text>
              {
                imageUrl != '' ? <Image source={{ uri: imageUrl }} style={{ height: 40, width: 50, borderRadius: 5 }} />
                  : null
              }
            </View>

            <Button
              style={{ backgroundColor: colors.primaryColor, padding: 5, borderRadius: 15, height: Dimensions.get('window').height * 0.065 }}
              titleStyle={{ marginLeft: 5 }}
              iconName={'cloud-upload'}
              title='Upload'
              onPress={() => {
                let options;
                launchImageLibrary(options = {
                  mediaType: 'photo',
                  maxHeight: 500,
                  maxWidth: 500
                  //includeBase64: true
                }, (response) => {
                  //console.log('Response:',response)

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                    setImageUrl('')
                  } else if (response.errorMessage) {
                    console.log('Error:', response.errorMessage)
                  } else {
                    const source = response?.assets[0].uri
                    //const source = { uri: response.assets[0].uri }
                    setImageUrl(source)
                    //setImageFileName(response.assets[0].fileName)
                  }
                })
              }}
            />
          </View>

          <InputField
            textStyle={{ color: jobDescription == '' && missingField == true ? 'red' : colors.primaryColor }}
            title='Description'
            placeholder='Job Description'
            maxLength={250}
            multiline={true}
            inputFieldStyle={{ alignItems: 'flex-start', height: Dimensions.get('window').height * 0.2 }}
            value={jobDescription}
            onChangeText={(val) => {
              setJobDescription(val)
              jobObj.jobDescription = val
              dispatch(setJobPost(jobObj))
            }}
          />
          <Text style={{ alignSelf: 'flex-end', color: colors.darkGray, fontWeight: 'bold', fontSize: 12 }}>
            {`${jobDescription.length} / 250 Characters`}
          </Text>

          <CustomPicker
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select No. Of Employees'
            pickerTitle='No. Of Employees'
            selectedValue={jobPostNos}
            onValueChange={(itemValue, itemIndex) => {
              setJobPostNos(itemValue)
              jobObj.noOfEmployees = itemValue
              dispatch(setJobPost(jobObj))
            }}
          >
            <Picker.Item label={'1'} value={'1'} style={{fontSize: 14}}/>
            <Picker.Item label={'2'} value={'2'} style={{fontSize: 14}}/>
            <Picker.Item label={'3'} value={'3'} style={{fontSize: 14}}/>
            <Picker.Item label={'4'} value={'4'} style={{fontSize: 14}}/>
            <Picker.Item label={'5'} value={'5'} style={{fontSize: 14}}/>
          </CustomPicker>

          <InputField
            inputFieldStyle={address.length > 35 && {height: Dimensions.get('window').height * 0.078}}
            textStyle={{ color: address == '' && missingField == true ? 'red' : colors.primaryColor }}
            title='Address'
            placeholder='Address'
            iconName='location-sharp'
            maxLength={50}
            multiline={address.length > 35 ? true : false}
            value={address}
            onChangeText={(val) => {
              setAddress(val)
              jobObj.address = val
              dispatch(setJobPost(jobObj))
            }}
          />

          <StatePicker
            pickerTitleStyle={{ color: statePicker == 0 && missingField == true ? 'red' : colors.primaryColor }}
            pickerContainerStyle={{ marginTop: 10, flex: 0.49 }}
            items={cityStates}
            selectedValue={statePicker}
            onValueChange={(itemValue, itemIndex) => {
              setStatePicker(itemValue)
              jobObj.state = itemValue
              dispatch(setJobPost(jobObj))
            }}
          />

          <CustomPicker
            pickerTitleStyle={{ color: city == 0 && missingField == true ? 'red' : colors.primaryColor }}
            pickerContainerStyle={{ marginTop: 10, flex: 0.49 }}
            label='Select City'
            pickerTitle='City'
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => {
              setCity(itemValue)
              jobObj.city = itemValue
              dispatch(setJobPost(jobObj))
            }}
          >
            {
              cities.length > 0 ?
                cityItems.map((val, index) => (
                  <Picker.Item
                    style={{fontSize: 14}}
                    key={index}
                    label={val.city}
                    value={val.city}
                  />
                ))
                : null
            }
          </CustomPicker>

          <InputField
            textStyle={{ color: zipCode == '' && missingField == true ? 'red' : colors.primaryColor }}
            keyboardType={'number-pad'}
            maxLength={5}
            title='Zip Code'
            placeholder='Zip Code'
            value={zipCode}
            onChangeText={(val) => {
              setZipCode(val)
              jobObj.zipCode = val
              dispatch(setJobPost(jobObj))
            }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 7 }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`https://www.google.com/maps/search/'${address}, ${city}, ${statePicker}, ${zipCode}`).catch(err => console.error('An error occurred', err))}
            >
              <Text style={{ fontSize: 12, color: colors.buttonColor }}>Click here to view full address</Text>
            </TouchableOpacity>

            <MaterialIcons name='location-city' size={20} color={colors.primaryColor} style={{ marginLeft: 3 }} />

          </View>

        </View>

        <View style={styles.bottomButtonContainer}>

          <Button
            style={{ ...styles.button, backgroundColor: colors.primaryColor }}
            title='Post'
            onPress={() => {
              if (jobTitle == '' || hourlyPay == '' || jobDuration == 0 || jobCategory == 0 || jobDescription == '' || address == '' || statePicker == 0 || city == 0 || zipCode == '') {
                setMissinFieldModal(true)
              }
              else {
                jobPosted()
              }
            }}
          />

          <Button
            style={styles.button}
            title='Cancel'
            onPress={() => {
              navigation.navigate(Constants.screen.EmployerDashboard)
              onCancel()
            }}
          />

        </View>

      </ImageBackground>

      {isModal &&
        <CustomModal
          message={"You have an unposted job."}
          isVisible={isModal} 
          imageSource={require('../../../assets/diagnostic.png')}
          onPressYes={() => {
            setisModal(false)
            navigation.navigate(Constants.screen.Draft)
          }} 
          onPressNo={() => setisModal(false)}   
        />
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
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
    marginVertical: 9,
    marginHorizontal: 9,
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
  emptyUploadImageText: {
    color: colors.gray,
    opacity: 0.7,
    marginLeft: 7
  },
  chooseFileButton: {
    //flexDirection: 'column',
    height: Dimensions.get('window').height * 0.06,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: colors.primaryColor,
    padding: 5
    //flex: 0.45
    //width: 130
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
    overflow: 'hidden',
    height: Dimensions.get('window').height * 0.15,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: 'gray'
  },
  bottomButtonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
    height: Dimensions.get('window').height * 0.085,
  },
  uploadImageText: {
    marginLeft: 7,
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.primaryColor
  },
  EmptyUploadImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 1.5,
    flex: 0.93,
    height: Dimensions.get('window').height * 0.065
  },
  UploadImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 1.5,
    flex: 0.93,
    height: Dimensions.get('window').height * 0.065
  }
})

export default JobPosted;