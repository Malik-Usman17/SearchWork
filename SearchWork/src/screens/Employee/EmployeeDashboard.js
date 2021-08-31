import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import {userLogin} from '../../redux/slices';

 
const EmployeeDashboard = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  const user = useSelector(userLogin)
  console.log('User Information:',user)
 

  //console.log(lang)

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
          dot={<View style={styles.dot} />}
          activeDot ={ <View style={styles.activeDot} /> }
          paginationStyle={{marginBottom: -5}}
          loop={false}
        >
          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/people.jpg')} 
              style={styles.slideImage} 
              resizeMode='cover' 
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/slider.png')} 
              style={styles.slideImage} 
              resizeMode='cover' 
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../../assets/people.jpg')} 
              style={styles.slideImage} 
              resizeMode='cover'
            />
          </View>

        </Swiper>

      </View>

        <View style={{top: -10, borderRadius: 15, backgroundColor: colors.primaryColor, padding: 5, alignItems: 'center', marginHorizontal: 60}}>
          <Text style={{fontWeight: 'bold', color: colors.white}}>Discover By Industries</Text>
        </View>

          <View style={styles.jobsCategoryContainer}>

          <View style={styles.jobRowConatiner}>
          <JobIconsView title='Carpenter' onPress={() => navigation.navigate(Constants.screen.JobCategoryList)}/>

          <JobIconsView title='Petorl Filler Pump'/>

          <JobIconsView title='Painter'/>
          </View>

          <View style={{...styles.jobRowConatiner, marginTop: 20}}>
          <JobIconsView title='Bar Tender'/>

          <JobIconsView title='Gardener'/>

          <JobIconsView title='Metro Cashier'/>
          </View>

          <View style={{...styles.jobRowConatiner, marginTop: 20}}>
          <JobIconsView title='Carpenter'/>

          <JobIconsView title='Dog Walk'/>

          <JobIconsView title='Other'/>
          </View>

          </View>

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
          <JobCard onPress={() => navigation.push(Constants.screen.IndividualJob)}/>
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
  // logo:{
  //   resizeMode: 'cover',
  //   height: 85,
  //   width: 180,
  // },
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