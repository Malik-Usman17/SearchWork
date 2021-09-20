import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import Button from '../../Components/molecules/Button';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import InputField from '../../Components/molecules/InputField';
import { cityStates } from '../../Components/organisms/CityStates';
import CustomModal from '../../Components/organisms/CustomModal';
import CustomPicker from '../../Components/organisms/CustomPicker';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import StatePicker from '../../Components/organisms/StatePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { jobPostedSelector, setJobPost } from '../../redux/slices';


const Draft = ({ navigation }) => {
  const job = useSelector(jobPostedSelector);

  var jobObj = { ...job }
  //console.log('Job Fields',jobObj)


  const dispatch = useDispatch();

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [description, setDescription] = useState('');
  const [statePicker, setStatePicker] = useState(0);
  const [city, setCity] = useState(0);
  const [jobDuration, setJobDuration] = useState('');
  const [jobPostNos, setJobPostNos] = useState('');
  const [pay, setPay] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [employeesNo, setEmployeesNo] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

 // console.log(job.jobTitle.length)
  

  const cities = cityStates.filter((value) => value.state == job.state)
  const cityItems = cities.length > 0 ? cities[0].cities : null

  const job_Category = [
    {'category': 'Petrol Pump'}, {'category': 'Office Helper'}, {'category': 'Lawn Mower'}
  ]

  const job_sub_Category = [
    {category: 'Gas Station Boy'}, {category: 'Office Boy'}, {category: 'Help Desk Person'}
  ]

  return (
    (jobObj.jobTitle == '' && jobObj.hourlyPay == '' && jobObj.duration == 0  && jobObj.jobCategory == 0 && jobObj.jobSubCategory == 0 && jobObj.jobDescription == ''&& jobObj.noOfEmployees == 0  && jobObj.state == 0  && jobObj.city == 0 && jobObj.zipCode == '' && jobObj.address == '') ?

    <View style={styles.emptyScreenContainer}>
      <Image source={require('../../../assets/noData.jpg')} resizeMode='contain' style={{height: 300, width:400}}/>
      <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate(Constants.screen.JobPosted)}>
        <Text style={styles.buttonText}>Click here to post a job</Text>
      </TouchableOpacity>
    </View>
    :
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

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.15 }} />

        <HeaderRowContainer>

          <MenuIcon onPress={() => navigation.openDrawer()} />

          <ScreenTitle title= 'Draft'/>

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
            textStyle={{color: job.jobTitle == '' ? 'red' : colors.primaryColor}}
            title='Job Title'
            iconName='person'
            placeholder='Job Title'
            maxLength={30}
            value={job.jobTitle}
            onChangeText={(val) => {
              jobObj.jobTitle = val
              dispatch(setJobPost(jobObj))
            }} 
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <InputField
              textStyle={{color: job.hourlyPay == '' ? 'red' : colors.primaryColor}}
              style={{ flex: 0.45 }}
              keyboardType={'number-pad'}
              maxLength={5}
              title='Hourly Pay'
              iconName='person'
              placeholder='$0.00'
              value={job.hourlyPay}
              onChangeText={(val) => {
                jobObj.hourlyPay = val
                dispatch(setJobPost(jobObj))
              }}
            />

            <CustomPicker
              pickerTitleStyle={{color: job.duration == 0 ? 'red' : colors.primaryColor}}
              pickerContainerStyle={{ marginTop: 10, flex: 0.52  }}
              label='Job Type'
              pickerTitle='Duration'
              selectedValue={job.duration}
              onValueChange={(itemValue, itemIndex) => {
              jobObj.duration = itemValue
              dispatch(setJobPost(jobObj))
            }}
            >
            <Picker.Item label='Part Time' value={'Part Time'} style={{ fontSize: 14 }} />
            <Picker.Item label='Full Time' value={'Full Time'} style={{ fontSize: 14 }} />
            
          </CustomPicker>

          </View>

          <CustomPicker
            pickerTitleStyle={{color: job.jobCategory == 0 ? 'red' : colors.primaryColor}}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select Job Category'
            pickerTitle='Job Category'
            selectedValue={job.jobCategory}
            onValueChange={(itemValue, itemIndex) => {
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
            pickerTitleStyle={{color: job.jobSubCategory == 0 ? 'red' : colors.primaryColor}}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select Job Sub Category'
            pickerTitle='Job Sub Category'
            selectedValue={job.jobSubCategory}
            onValueChange={(itemValue, itemIndex) => {
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
            textStyle={{color: job.jobDescription == '' ? 'red' : colors.primaryColor}}
            title='Description'
            placeholder='Job Description'
            maxLength={250}
            multiline={true}
            inputFieldStyle={{ alignItems: 'flex-start', height: Dimensions.get('window').height * 0.2 }}
            value={job.jobDescription}
            onChangeText={(val) => {
              jobObj.jobDescription = val
              dispatch(setJobPost(jobObj))
              setDescription(val)
            }}
          />
          <Text style={{ alignSelf: 'flex-end', color: colors.darkGray, fontWeight: 'bold', fontSize: 12 }}>
            {`${job.jobDescription.length} / 250 Characters`}
          </Text>

          <CustomPicker
            pickerTitleStyle={{color: job.noOfEmployees == 0 ? 'red' : colors.primaryColor}}
            pickerContainerStyle={{ marginTop: 10 }}
            label='Select No. Of Employees'
            pickerTitle='No. Of Employees'
            selectedValue={job.noOfEmployees}
            onValueChange={(itemValue, itemIndex) => {
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

          <InputField
            textStyle={{color: job.address == '' ? 'red' : colors.primaryColor}}
            title='Address'
            placeholder='Address'
            iconName='location-sharp'
            value={job.address}
            onChangeText={(val) => {
              jobObj.address = val
              dispatch(setJobPost(jobObj))
            }}
          />

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}

            <StatePicker
              pickerTitleStyle={{color: job.state == 0 ? 'red' : colors.primaryColor}}
              pickerContainerStyle={{ marginTop: 10, flex: 0.49 }}
              items={cityStates}
              selectedValue={job.state}
              onValueChange={(itemValue, itemIndex) => {
                jobObj.state = itemValue
                dispatch(setJobPost(jobObj))
              }}
            />

            <CustomPicker
              pickerTitleStyle={{color: job.city == 0 ? 'red' : colors.primaryColor}}
              pickerContainerStyle={{ marginTop: 10, flex: 0.49 }}
              label='Select City'
              pickerTitle='City'
              selectedValue={job.city}
              onValueChange={(itemValue, itemIndex) => {
                jobObj.city = itemValue
                dispatch(setJobPost(jobObj))
              }}
            >
              {
                cities.length > 0 ?
                  cityItems.map((val, index) => (
                    <Picker.Item key={index} label={val.city} value={val.city} />
                  ))
                  : null
              }
            </CustomPicker>

          {/* </View> */}

          <InputField
            textStyle={{color: job.zipCode == '' ? 'red' : colors.primaryColor}}
            keyboardType={'number-pad'}
            maxLength={5}
            title='Zip Code'
            placeholder='Zip Code'
            value={job.zipCode}
            onChangeText={(val) => {
              jobObj.zipCode = val
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
              if(jobObj.jobTitle = '' || jobObj.hourlyPay == ''  || jobObj.duration == 0  || jobObj.jobCategory == 0  || jobObj.jobSubCategory == 0  || jobObj.jobDescription == '' || jobObj.noOfEmployees == 0  || jobObj.state == 0  || jobObj.city == 0 || jobObj.zipCode == '' || jobObj.address == ''){
                setModalVisible(!modalVisible)
              }
              else{
                setModalVisible(!modalVisible)
              }
            }}
            // onPress={() => {
            //   jobObj.jobTitle = '' 
            //   jobObj.hourlyPay = '' 
            //   jobObj.duration = 0 
            //   jobObj.jobCategory = 0 
            //   jobObj.jobSubCategory = 0 
            //   jobObj.jobDescription = '' 
            //   jobObj.noOfEmployees = 0 
            //   jobObj.state = 0 
            //   jobObj.city = 0
            //   jobObj.zipCode = '' 
            //   jobObj.address = ''
            //   dispatch(setJobPost(jobObj))
            //   alert('Job Has Been Successfully Posted')
            //   navigation.navigate(Constants.screen.JobPostedList)
            // }}
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
  },
  emptyScreenContainer:{
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonText:{
    color: colors.buttonColor, 
    fontWeight: 'bold', 
    textDecorationLine: 'underline'
  }
})

export default Draft;