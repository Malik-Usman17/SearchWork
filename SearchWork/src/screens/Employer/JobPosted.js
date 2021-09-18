import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
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
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { jobPostedSelector } from '../../redux/slices';
import { setJobPost } from '../../redux/slices';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import translate from 'translate-google-api';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import CustomPicker from '../../Components/organisms/CustomPicker';
import Constants from '../../Constants/Constants.json';
import CustomModal from '../../Components/organisms/CustomModal';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
//import translate from 'google-translate-api';
//import {GoogleTranslator} from '@translate-tools/core/translators/GoogleTranslator';



const JobPosted = ({ navigation }) => {
  const isFocused = useIsFocused();
  //console.log('Focus:',isFocused)
  //const job = useSelector(jobPostedSelector);
  var job = useSelector(jobPostedSelector);
  console.log('Access Zip Code Outside:',job.zipCode)
  //console.log('JOB SLICE', job)

  // console.log('Job Duration:',job.duration)
  // console.log('Job Person required:',job.noOfEmployees)

  const dispatch = useDispatch();

  var jobObj = { ...job }
  //console.log('Job Object:',jobObj)

  //console.log('Job Duration:',jobObj.duration)


  // console.log('Job Title:',job.jobTitle)
  // console.log('Hourly pay:',job.hourlyPay)
  // console.log('Job Duration:',job.duration)
  // console.log('Job Category:',job.jobCategory)
  // console.log('Job Sub Category:',job.jobSubCategory) 


  //console.log('Length:',job.length)


  // const translator = new GoogleTranslator();

  // const value = translator.translate('Hello World').then((translate) => {
  //   console.log('Tranlate Result:',translate)
  // })

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [hourlyPay, setHourlyPay] = useState('');
  const [jobDuration, setJobDuration] = useState('');
  const [jobCategory, setJobCategroy] = useState(0);
  const [jobSubCategory, setJobSubCategory] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [jobPostNos, setJobPostNos] = useState('');
  const [statePicker, setStatePicker] = useState(0);
  const [city, setCity] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [draftModal, setDraftModal] = useState(false);


  //console.log('Draft Modal:',draftModal)

  // console.log()

  // console.log('Job Title:',jobTitle.length)
  

  //console.log('ImageUrl:',imageUrl)

  const cities = cityStates.filter((value) => value.state == job.state)
  const cityItems = cities.length > 0 ? cities[0].cities : null

  const job_Category = [
    {'category': 'Petrol Pump'}, {'category': 'Office Helper'}, {'category': 'Lawn Mower'}
  ]

  const job_sub_Category = [
    {category: 'Gas Station Boy'}, {category: 'Office Boy'}, {category: 'Help Desk Person'}
  ]

  var test;

  useEffect(() => {
    console.log('Zip Code:',job.zipCode)
        if(job.jobTitle != '' || job.hourlyPay != ''  || job.duration != 0  || job.jobCategory != 0  || job.jobSubCategory != 0  || job.jobDescription != '' || job.noOfEmployees != 0  || job.state != 0  || job.city != 0 || job.zipCode != '' || job.address != ''){
        console.log('If running')
        setDraftModal(!draftModal)
    }
  }, [isFocused])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     //job = useSelector(jobPostedSelector);
  //     if(job.jobTitle != '' || job.hourlyPay != ''  || job.duration != 0  || job.jobCategory != 0  || job.jobSubCategory != 0  || job.jobDescription != '' || job.noOfEmployees != 0  || job.state != 0  || job.city != 0 || job.zipCode != '' || job.address != ''){
  //       console.log('If running')
  //       setDraftModal(!draftModal)
  //   }
  //   console.log('Zip Code:',job.zipCode)
  //   setJobTitle('')
  //   setHourlyPay('')
  //   setJobDuration(0)
  //   setJobCategroy(0)
  //   setJobSubCategory(0)
  //   setJobDescription('')
  //   setJobPostNos(0)
  //   setStatePicker(0)
  //   setCity(0)
  //   setZipCode('')
  //   setAddress('')
  //   }, [])
  // )

  // useFocusEffect(() => {
  //   if(job.jobTitle != '' || job.hourlyPay != ''  || job.duration != 0  || job.jobCategory != 0  || job.jobSubCategory != 0  || job.jobDescription != '' || job.noOfEmployees != 0  || job.state != 0  || job.city != 0 || job.zipCode != '' || job.address != ''){
  //     console.log('if running')
  //     setDraftModal(true)
  //   }
  // }, [])
  
  // const result = translate("I'm fine.", {
  //   tld: 'cn',
  //   to: 'es'
  // });

  // console.log('RESULT:',result);

  // const result = async() => {
  //   const x = await translate("How are you?", {
  //     //tld: 'cn',
  //     to: 'es'
  //   })
  //   return x
  // }

  // function testing(){
  //   result().then(res => console.log('RESPONSE:',res))
  // }

  // console.log(testing())
  

  // async function testing(){
  //   return await result();
  // }

  //console.log('TESTING:',testing())

  // async const y = console.log('TESTING:',await result());

  //Need to See THis
  // function translation(){
  //   translate(description, {
  //     to: 'es'
  //   }).then(res => {
  //     console.log('Translate:',res)
  //     if(res != undefined){
  //       setDescription(res)
  //     }
  //     //setDescription(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // translation();

  // function translation() {
  //   translate(job.jobDescription,{
  //     to: 'es'
  //   }).then(res => {
  //     test= res
  //     console.log('Translation:',res)
  //   }).catch(err => {
  //     console.log('Error:',err)
  //   })
  // }

  //console.log('Translation func call:',translation())

  // function jobFieldChecking(jobField){
  //   var color;
  //   if(job.jobTitle != '' || job.hourlyPay != '' || job.duration != 0 || job.jobCategory != 0 || job.jobSubCategory != 0 || job.jobDescription != '' || job.noOfEmployees != 0 || job.state != 0 || job.city || job.zipCode != 0 || job.address != ''){
  //     console.log('if block running')
  //     if(jobField == 0 || jobField == ''){
  //       console.log('inner if block')
  //       return color= 'red';
  //     }
  //     else{
  //       return color = colors.primaryColor
  //     }
  //   }
  // }

  // console.log(jobFieldChecking(job.jobTitle))

  // function jobField(){
  //   if(job.jobTitle == '' && job.hourlyPay == '' && job.duration == 0 && job.jobCategory == 0 && job.jobSubCategory == 0 && job.jobDescription == '' && job.noOfEmployees != 0 && job.state != 0 && job.city && job.zipCode != 0 && job.address != ''){
  //     return 'red'
  //   }
  //   else{
  //     return colors.primaryColor
  //   }
  // }


  // const translate = require('google-translate-api');
  // translate('Hello there', {from: 'en', to: 'es'}).then(res => {
  //   console.log(res.text);
  // }).catch(err => {
  //   console.log(err)
  // });


   //console.log('Title:',jobTitle)

   
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      {
        (jobObj.jobTitle == '' || jobObj.hourlyPay == ''  || jobObj.duration == 0  || jobObj.jobCategory == 0  || jobObj.jobSubCategory == 0  || jobObj.jobDescription == '' || jobObj.noOfEmployees == 0  || jobObj.state == 0  || jobObj.city == 0 || jobObj.zipCode == '' || jobObj.address == '') ?
        <CustomModal 
          type='confirmation'
          isVisible={modalVisible}
          message='Some fields are missing.'
          imageSource={require('../../../assets/warning.png')}
          onPressOk={() => setModalVisible(false)}
          buttonText='Ok'
        />
        :
        <CustomModal 
          type='confirmation'
          isVisible={modalVisible}
          message='Job has successfully created.'
          imageSource={require('../../../assets/checked.png')}
          onPressOk={() => {
            setModalVisible(false)
            navigation.navigate(Constants.screen.JobPostedList)
            //setJobTitle('')
                jobObj.jobTitle = '' 
                jobObj.hourlyPay = '' 
                jobObj.duration = 0 
                jobObj.jobCategory = 0 
                jobObj.jobSubCategory = 0 
                jobObj.jobDescription = '' 
                jobObj.noOfEmployees = 0 
                jobObj.state = 0 
                jobObj.city = 0
                jobObj.zipCode = '' 
                jobObj.address = ''
                dispatch(setJobPost(jobObj))
          }}
          buttonText='Ok'
        />
      }
      
      <CustomModal 
          isVisible={draftModal}
          message='You have unposted job.'
          imageSource={require('../../../assets/diagnostic.png')}
          onPressYes={() => {
            navigation.navigate(Constants.screen.Draft)
            setDraftModal(!draftModal)
          }}
          onPressNo={() => setDraftModal(!draftModal)}
      />

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.15 }} />

        <HeaderRowContainer>

          <MenuIcon onPress={() => navigation.openDrawer()} />

          <ScreenTitle title='Post A Job'/>

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
            //textStyle={{color: job.jobTitle == '' ? 'red' : colors.primaryColor}}
            title='Job Title'
            iconName='person'
            placeholder='Job Title'
            value={jobTitle}
            onChangeText={(val) => {
              setJobTitle(val)
              jobObj.jobTitle = val
              dispatch(setJobPost(jobObj))     
            }}
            // value={job.jobTitle}
            // onChangeText={(val) => {
            //   jobObj.jobTitle = val
            //   dispatch(setJobPost(jobObj))
            // }} 
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <InputField
              //textStyle={{color: job.hourlyPay == '' ? 'red' : colors.primaryColor}}
              style={{ flex: 0.45 }}
              keyboardType={'number-pad'}
              maxLength={3}
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
              //pickerTitleStyle={{color: job.duration == 0 ? 'red' : colors.primaryColor}}
              pickerContainerStyle={{ marginTop: 10, flex: 0.52  }}
              label='Job Type'
              pickerTitle='Duration'
              selectedValue={jobDuration}
              onValueChange={(itemValue, itemIndex) => {
              setJobDuration(itemValue)
              jobObj.duration = itemValue
              dispatch(setJobPost(jobObj))
            }}
            >
            <Picker.Item label='Part Time' value={'Part Time'} />
            <Picker.Item label='Full Time' value={'Full Time'} />
            
          </CustomPicker>

          </View>

          <CustomPicker
            //pickerTitleStyle={{color: job.jobCategory == 0 ? 'red' : colors.primaryColor}}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select Job Category'
            pickerTitle='Job Category'
            selectedValue={jobCategory}
            onValueChange={(itemValue, itemIndex) => {
              setJobCategroy(itemValue)
              jobObj.jobCategory = itemValue
              dispatch(setJobPost(jobObj))
            }}
          >
            {
              job_Category.map((val, index) => (
                <Picker.Item 
                  key={index}
                  label={val.category}
                  value={val.category}
                />
              ))
            }
          </CustomPicker>

          <CustomPicker
            //pickerTitleStyle={{color: job.jobSubCategory == 0 ? 'red' : colors.primaryColor}}
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
              job_sub_Category.map((val, index) => (
                <Picker.Item 
                  key={index}
                  label={val.category}
                  value={val.category}
                />
              ))
            }
          </CustomPicker>

           <Text style={styles.uploadImageText}>Upload Image</Text>

           <View style={{flexDirection: 'row', marginTop: 4, justifyContent: 'space-between'}}>
             <View style={imageUrl == '' ? styles.EmptyUploadImageContainer : styles.UploadImageContainer}>
               <MaterialIcons name='cloud-upload' size={18} color={colors.gray}/>
               <Text style={imageUrl == '' ? styles.emptyUploadImageText : {color: colors.gray, opacity: 0.7}}>Upload Image</Text>
               {
              imageUrl != '' ? <Image source={imageUrl} style={{height: 40, width: 50, borderRadius: 5}}/>
            : null
            }
             </View>

            <Button
              style={{backgroundColor: colors.primaryColor, padding: 5, borderRadius: 15, height: Dimensions.get('window').height * 0.065}}
              titleStyle={{marginLeft: 5}} 
              iconName={'cloud-upload'}
              title='Upload'
              onPress={() => {
                let options;
                launchImageLibrary(options={
                  mediaType: 'photo',
                  includeBase64: true
                }, (response) => {
                  //console.log('Response:',response)

                  if(response.didCancel){
                    console.log('User cancelled image picker');
                    setImageUrl('')
                  } else if (response.errorMessage){
                    console.log('Error:',response.errorMessage)
                  }else{
                    const source = {uri: response.assets[0].uri}
                    setImageUrl(source)
                    //setImageFileName(response.assets[0].fileName)
                  }
                })
              }}
            />
           </View>

          <InputField
            //textStyle={{color: job.jobDescription == '' ? 'red' : colors.primaryColor}}
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
            {`${job.jobDescription.length} / 250 Characters`}
          </Text>

          <CustomPicker
            //pickerTitleStyle={{color: job.noOfEmployees == 0 ? 'red' : colors.primaryColor}}
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
            <Picker.Item label={'1'} value={'1'} />
            <Picker.Item label={'2'} value={'2'} />
            <Picker.Item label={'3'} value={'3'} />
            <Picker.Item label={'4'} value={'4'} />
            <Picker.Item label={'5'} value={'5'} />
          </CustomPicker>

            <StatePicker
              //pickerTitleStyle={{color: job.state == 0 ? 'red' : colors.primaryColor}}
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
              //pickerTitleStyle={{color: job.city == 0 ? 'red' : colors.primaryColor}}
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
                      key={index}
                      label={val.city}
                      value={val.city}
                    />
                  ))
                  : null
              }
            </CustomPicker>

          <InputField
            //textStyle={{color: job.zipCode == '' ? 'red' : colors.primaryColor}}
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

          <InputField
            //textStyle={{color: job.address == '' ? 'red' : colors.primaryColor}}
            title='Address'
            placeholder='Address'
            iconName='location-sharp'
            value={address}
            onChangeText={(val) => {
              setAddress(val)
              jobObj.address = val
              dispatch(setJobPost(jobObj))
            }}
          />

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 7}}>
            <TouchableOpacity
             onPress={() => Linking.openURL('https://www.google.com/maps/search/' + 'Sybrid Pvt Ltd Karachi Pakistan').catch(err => console.error('An error occurred', err))}
            >
              <Text style={{fontSize: 12, color: colors.buttonColor}}>Click here to view full address</Text>
            </TouchableOpacity>

            <MaterialIcons name='location-city' size={20} color={colors.primaryColor} style={{ marginLeft: 3 }} />

          </View>

        </View>

        <View style={styles.bottomButtonContainer}>

          <Button
            style={{ ...styles.button, backgroundColor: colors.primaryColor }}
            title='Post'
            onPress={() => {
              if(jobTitle == '' || jobObj.hourlyPay == ''  || jobObj.duration == 0  || jobObj.jobCategory == 0  || jobObj.jobSubCategory == 0  || jobObj.jobDescription == '' || jobObj.noOfEmployees == 0  || jobObj.state == 0  || jobObj.city == 0 || jobObj.zipCode == '' || jobObj.address == ''){
                setModalVisible(!modalVisible)
              }
              else{
                setModalVisible(!modalVisible)
              }
            }}
          />

          <Button
            style={styles.button}
            title='Cancel'
            onPress={() => navigation.goBack()}
          />

        </View>

      </ImageBackground>

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
  emptyUploadImageText:{
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
  uploadImageText:{
    marginLeft: 7, 
    marginTop: 10, 
    fontWeight: 'bold', 
    color: colors.primaryColor
  },
  EmptyUploadImageContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    borderRadius: 15, 
    borderColor: colors.gray, 
    borderWidth: 1.5, 
    flex: 0.93, 
    height: Dimensions.get('window').height * 0.065
  },
  UploadImageContainer:{
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