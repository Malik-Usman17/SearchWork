import React, { useState, useCallback } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import Button from '../../Components/molecules/Button';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Chips from '../../Components/atoms/Chips';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import SearchField from '../../Components/molecules/SearchField';
import Constants from '../../Constants/Constants.json';
import { useSelector, useDispatch } from 'react-redux';
import {userLogin, getJobCategory, jobsCategoryList, getJobList, jobsListing} from '../../redux/slices';
import { color } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/core';


const JobListing = ({navigation, route}) => {

  const [dropDown, setDropDown] = useState(false);
  const [lang, setLang] = useState('eng');
  

  const {jobSubCategoryId, jobCategoryId} = route.params;

  const jobs = useSelector(jobsListing);
  //console.log('JOBS:',jobs)

  var myJobs;
  if(jobSubCategoryId != 0){
     myJobs = jobs.filter((x, index) => x.category_id == jobCategoryId && x.sub_category_id == jobSubCategoryId)
  }
  else{
    myJobs = jobs.filter((x, index) => x.category_id == jobCategoryId)
  }


  const jobCard = ({ item }) => {
    return (
      <View style={styles.jobContainer}>

        <View style={{height: 120, width: 120, borderRadius: 15, backgroundColor: colors.primaryColorLight, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            resizeMode={'contain'} 
            source={item.image_urls ? {uri: item.image_urls['3x']} : require('../../../assets/logo.png')}
            style={styles.jobImage}
          />
        </View>

        <View style={{ marginLeft: 8, flex: 1 }}>

          <Text style={styles.jobTitle}>{item.title}</Text>

          <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>
            {item.description}
          </Text>

          <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.viewApplicantsButton} 
            onPress={() => navigation.navigate(Constants.screen.IndividualJob, {jobDetail: item})}
          >

            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
              <Image
                source={require('../../../assets/applicants.png')}
                resizeMode='contain'
                style={styles.applicantImageIcon}
              />
            </View>

            <Text style={{ marginLeft: 3, color: colors.white, fontWeight: 'bold', fontSize: 12 }}>View Job Details</Text>

          </TouchableOpacity>

        </View>

      </View>
    )
  }


  return (
    myJobs.length > 0 ?
    <View style={{ flex: 1 }}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={{ flex: 1 }}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.22 }} />

        <HeaderRowContainer>
          
          <MenuIcon onPress={() => navigation.openDrawer()}/>

          <ScreenTitle title='My Jobs' />

          <LanguagePicker
              viewStyle={{ width: 80 }}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
          />

        </HeaderRowContainer>

        <SearchField style={{position: 'absolute', top: 60, marginHorizontal: 15}}/>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={myJobs}
          keyExtractor={(key, index) => index.toString()}
          renderItem={jobCard}
        />

        <Button 
          title='See More'
          style={styles.seeMoreButton}
          titleStyle={{fontSize: 12}}
        />

        <CompanyLabelCard />

      </ImageBackground>

    </View>
    :
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
      <Image source={require('../../../assets/noData.jpg')} resizeMode='contain' style={{height: 300, width:400}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchFieldConatiner: {
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: colors.primaryColorLight
  },
  image: {
    height: 165,
    width: '100%'
  },
  jobContainer: {
    marginVertical: 4,
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    //backgroundColor: 'pink'
  },
  jobImage: {
    height: 100,
    width: 100,
  },
  // emptyJobImage:{
  //   height: 100,
  //   width: 100,
  // },
  manageJobButton: {
    borderRadius: 20,
    marginLeft: 6,
    backgroundColor: colors.darkGray,
    height: Dimensions.get('window').height * 0.05,
    width: 90
  },
  jobTitle: {
    color: colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  viewApplicantsButton: {
    marginTop: 'auto',
    padding: 2,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.buttonColor,
    width: 132
  },
  applicantImageIcon: {
    height: 20,
    width: 20
  },
  findJobChip:{
    flex: 0.4, 
    justifyContent: 'space-evenly', 
    padding: 10, 
    backgroundColor: colors.yellow, 
    flexDirection: 'row', 
    borderRadius: 20
  },
  seeMoreButton:{
    height: Dimensions.get('window').height * 0.05,
    marginVertical: 5,
    backgroundColor: colors.primaryColor,
    padding: 3, 
    alignSelf: 'center'
  }
})

export default JobListing;