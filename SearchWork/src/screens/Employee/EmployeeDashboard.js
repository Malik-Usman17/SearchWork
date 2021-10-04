import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderImage from '../../Components/atoms/HeaderImage';
import Logo from '../../Components/atoms/Logo';
import MenuIcon from '../../Components/atoms/MenuIcon';
import JobIconsView from '../../Components/molecules/JobIconsView';
import JobCard from '../../Components/organisms/JobCard';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import { useSelector, useDispatch } from 'react-redux';
import {userLogin, getJobCategory, jobsCategoryList, getJobList, jobsListing} from '../../redux/slices';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../Components/atoms/Loader';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import { useIsFocused } from '@react-navigation/native';


const EmployeeDashboard = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user = useSelector(userLogin)
  const jobsCategory = useSelector(jobsCategoryList);
  const jobs = useSelector(jobsListing);
  //console.log('JOB CATEGORY:',jobsCategory)
 // console.log('Jobs Listing:',jobs)


  useEffect(() => {
    async function getJobsCategory(){
      setLoader(true)

      if(jobsCategory  != undefined){
        setLoader(false)
      }

      try{
        var response = await apiCall(
          ApiConstants.methods.GET, 
          ApiConstants.endPoints.JobsCategory,
        );

        if(response.isAxiosError == true){
          console.log('Axios error') 
          setLoader(false)
        }
        else{
          dispatch(getJobCategory(response.data.response.data))
          setLoader(false)
        }
      }
      catch(error){
        console.log('Catch Body:',error);
        setLoader(false)
      }
    }

    async function getJobsList(){
      setLoader(true)

      // if(jobs != undefined){
      //   setLoader(false)
      // }

      try{
        var apiResponse = await apiCall(
          ApiConstants.methods.GET, 
          ApiConstants.endPoints.JobsList,
        );

        if(apiResponse.isAxiosError == true){
          console.log('Axios error') 
          setLoader(false)
        }
        else{
          dispatch(getJobList(apiResponse.data.response.data))
          setLoader(false)
        }
      }
      catch(error){
        console.log('Catch Body:',error);
        setLoader(false)
      }
    }
    getJobsCategory();
    getJobsList();
  }, [isFocused])

  if(loader == true){
    return(
      <Loader />
    )
  }


  const jobDetails = [
    {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Gardener'},
    {description: 'In publishing and graphic design, demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Maid'},
  ]



  return(
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bgContainer}>

        <HeaderImage style={{height: Dimensions.get('window').height * 0.21}}/>

      <HeaderRowContainer>
        <View>
          <MenuIcon onPress={() => navigation.openDrawer()}/>
          <Logo />
        </View>

        <LanguagePicker
          viewStyle={{width: 80}}
          containerStyle={{ flex: 1 }}
          value={lang}
          setValue={setLang}
          open={dropDown}
          setOpen={setDropDown}
        />

      </HeaderRowContainer>

      <View style={{height: 145}}>
        
        <Swiper
          containerStyle={{flex: 1}}
          showsPagination={false}
          autoplay={true}
          autoplayTimeout={3}
        >
          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/people.jpg')} 
              style={styles.slideImage}  
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/slider.png')} 
              style={styles.slideImage}   
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/bgSlide.jpg')} 
              style={styles.slideImage} 
            />
          </View>

        </Swiper>

      </View>

      

        <View style={{top: -10, borderRadius: 15, backgroundColor: colors.primaryColor, padding: 5, alignItems: 'center', marginHorizontal: 60}}>
          <Text style={{fontWeight: 'bold', color: colors.white}}>Discover By Industries</Text>
        </View>
       
        <Swiper
          containerStyle={{height: 275, marginBottom: 10}}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={{ marginBottom: -20 }}
        >
          <View style={styles.jobGridContainer}>
            {
              jobsCategory?.slice(0, 9).map((val, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.jobIconContainer}
                  onPress={() => {
                    if(val.subcategories != null){
                      navigation.navigate(Constants.screen.JobCategoryList, {val}) 
                    }
                    else{
                      navigation.navigate(Constants.screen.JobListing, {jobCategoryId: val.category_id_decode, jobSubCategoryId: 0})
                    } 
                  }}
                >
                  <View style={styles.iconContainer}>
                  <Image 
                    source={{ uri: val.image_urls['1x'] }}
                    style={styles.jobImage}  
                    resizeMode='contain' 
                  />
                  </View>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.jobIconText}>{val.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>

          <View style={styles.jobGridContainer}>
            {
              jobsCategory?.slice(9,).map((val, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.jobIconContainer}
                  onPress={() => {
                    if(val.subcategories != null){
                      navigation.navigate(Constants.screen.JobCategoryList, {val})
                    }
                    else{
                      navigation.navigate(Constants.screen.JobListing, {
                        jobCategoryId: val.category_id_decode, 
                        jobSubCategoryId: 0
                      }
                      )
                    }}}     
                >
                  <View style={styles.iconContainer}>
                  <Image 
                    source={{ uri: val.image_urls['1x'] }}
                    style={styles.jobImage}  
                    resizeMode='contain' 
                  />
                  </View>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.jobIconText}>{val.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </Swiper>

      <View style={{marginHorizontal: 15}}>
        
        <View style={{borderRadius:5, padding: 2, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.primaryColor, alignItems: 'center'}}>
          <Text style={{marginLeft: 7, fontWeight: 'bold', color: colors.white}}>Most Recent</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Constants.screen.JobListing)}>
            <Text style={{marginRight: 7, fontWeight: 'bold', color: colors.white, textDecorationLine: 'underline'}}>See All</Text>
          </TouchableOpacity>
        </View>

      </View>
    
    <View style={{height: 240, paddingVertical: 15}}>
      <Swiper
          containerStyle={styles.swiperContainerStyle}
          dot={<View style={styles.dot} />}
          activeDot ={ <View style={styles.activeDot} /> }
          paginationStyle={{bottom: -20}}
          loop={false}
        >

         <View style={{alignItems: 'center'}}>
          <JobCard onPress={() => navigation.navigate(Constants.screen.IndividualJob)}/>
          </View>

          <View style={{alignItems: 'center'}}>
          <JobCard />
          </View>

        </Swiper>
    </View>

      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bgContainer:{
    flex: 1,
    paddingBottom: 12,
    width: Dimensions.get('window').width
  },
  radiusImage: {
    height: Dimensions.get('window').height * 0.25,
    width: '100%',
  },
  image:{
    height: Dimensions.get('window').height * 0.3,
    width: '100%',
  },
  jobGridContainer:{
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  jobIconContainer:{
    alignItems: 'center', 
    justifyContent: 'center',
    width: 100,
    marginHorizontal: 5,
    marginBottom: 20 
  },
  iconContainer:{
    height: 50, 
    width: 50, 
    borderRadius: 25, 
    overflow:'hidden', 
    backgroundColor: colors.white, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  jobImage:{
    height: 40, 
    width: 40
  },
  jobIconText:{
    fontSize: 11, 
    marginTop: 2, 
    fontWeight: 'bold' 
  },
  slide:{
    width: '100%',
    flex: 1
  },
  slideImage:{
    flex: 1,
    width: '100%'
  },
  dot:{
    backgroundColor: colors.white, 
    width: 13, 
    height: 13, 
    borderRadius: 7,
    borderColor: colors.primaryColor,
    borderWidth: 1, 
    marginLeft: 7, 
    marginRight: 7
  },
  activeDot:{
    backgroundColor: colors.primaryColor, 
    width: 13, 
    height: 13, 
    borderRadius: 7,
    borderColor: colors.white,
    borderWidth: 1, 
    marginLeft: 7, 
    marginRight: 7
  },
  jobsCategoryContainer:{
    paddingVertical: 12, 
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  jobRowConatiner:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  swiperContainerStyle:{
    marginHorizontal: 15, 
    justifyContent: 'center'
  },
  searchFieldConatiner: {
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: colors.primaryColorLight
  },
});

export default EmployeeDashboard;