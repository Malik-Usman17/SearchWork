import React, { useState, useCallback } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/atoms/Loader';
import { getSaveJobList, getViewJob, savedJobsList, getApplicantsList, applicants } from '../../redux/slices';
import { useFocusEffect } from '@react-navigation/native';
import NoData from '../../Components/organisms/NoData';


const AppliedJobsList = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const applicantsList = useSelector(applicants);
  console.log('Applicants List:',applicantsList)


  const jobCard = ({item}) => {
    return(
    <View style={styles.jobContainer}>

      <Image 
        source={item.image ? {uri: item.image} : require('../../../assets/people.jpg')} 
        style={styles.jobImage}
      />
    
    <View style={{marginLeft: 8, flex: 1}}>
      
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.jobTitle}>
        {item.title}
      </Text>
      
      <Text ellipsizeMode='tail' numberOfLines={3} style={{fontSize: 12}}>
        {item.description}
      </Text>

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.viewApplicantsButton}
        onPress={() => navigation.navigate(Constants.screen.Applicants)}
      >
        
        <View style={{height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}}>
          <Image 
            source={require('../../../assets/team.png')} 
            resizeMode='contain' 
            style={styles.applicantImageIcon}
          />
        </View>

        <Text style={{marginLeft: 3, color: colors.white, fontWeight: 'bold', fontSize: 12}}>View Applicants</Text>
      
      </TouchableOpacity>


    </View>

  </View>
  )
  }

  useFocusEffect(
    useCallback(() => {
      async function getAppliedJobList() {

        if(applicantsList == undefined){
          setLoader(true)
        }
  
    
        try {
          var apiResult = await apiCall(
            ApiConstants.methods.GET, 
            ApiConstants.endPoints.ApplicantsList,
            )
    
          if (apiResult.isAxiosError == true) {
            alert(apiResult.response.data.error.messages.map(val => val+'\n'))
            setLoader(false)
          }
          else {
            dispatch(getApplicantsList(apiResult.data.response.data))
            setLoader(false)
          }
        }
        catch (error) {
          console.log('Catch Body:', error);
          setLoader(false)
        }
      }
      getAppliedJobList()
    }, [])
  )

  if(loader == true){
    return(
      <Loader />
    )
  }

  // async function applicantsList() {
    
  //   setLoader(true)

  //   try {
  //     var apiResult = await apiCall(
  //       ApiConstants.methods.GET, 
  //       ApiConstants.endPoints.ApplicantsList,
  //       )

  //     if (apiResult.isAxiosError == true) {
  //       alert(apiResult.response.data.error.messages.map(val => val+'\n'))
  //       setLoader(false)
  //     }
  //     else {
  //       dispatch(getApplicantsList(apiResult.data.response.data))
  //       setLoader(false)
  //     }
  //   }
  //   catch (error) {
  //     console.log('Catch Body:', error);
  //     setLoader(false)
  //   }
  // }


  return(
    applicantsList != undefined ?
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.15 }} />

        <HeaderRowContainer>

          <MenuIcon onPress={() => navigation.openDrawer()}/>

          <ScreenTitle title='Applicants' />

          <LanguagePicker
            viewStyle={{ width: 75 }}
            containerStyle={{ flex: 1 }}
            value={lang}
            setValue={setLang}
            open={dropDown}
            setOpen={setDropDown}
          />

        </HeaderRowContainer>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={applicantsList}
          keyExtractor={(key, index) => index.toString()}
          renderItem={jobCard}
        />

        <CompanyLabelCard />

      </ImageBackground>

    </View>
    :
    <NoData />
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.white,
    flex: 1
  },
  bg:{
   flex: 1
  },
  jobContainer:{
    marginVertical: 6,
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 10, 
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  jobImage:{
    height: 120, 
    width: 120, 
    borderRadius: 15
  },
  manageJobButton:{
    borderRadius: 20, 
    marginLeft: 6, 
    backgroundColor: colors.darkGray, 
    height: Dimensions.get('window').height * 0.05, 
    width: 90
  },
  jobTitle:{
    color: colors.darkGray, 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  viewApplicantsButton:{
    marginTop: 'auto', 
    padding: 2, 
    borderRadius: 25, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.buttonColor, 
    width: 132
  },
  applicantImageIcon:{
    height: 25,
    width: 25
  }
});

export default AppliedJobsList;