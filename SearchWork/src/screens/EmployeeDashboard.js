import React, {useState} from 'react';
import { View, FlatList, TextInput, Image, TouchableOpacity, Text, ScrollView, ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import colors from '../Constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
//import Logo from '../Components/Logo';
//import LanguagePicker from '../Components/LangugaePicker';
import Swiper from 'react-native-swiper';
import JobIconsView from '../Components/molecules/JobIconsView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chips from '../Components/atoms/Chips';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../Constants/Constants.json';
import JobCard from '../Components/organisms/JobCard';
import Logo from '../Components/atoms/Logo';
import HeaderImage from '../Components/atoms/HeaderImage';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import MenuIcon from '../Components/atoms/MenuIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

 
const EmployeeDashboard = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
 

  //console.log(lang)

  const jobDetails = [
    {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Gardener'},
    {description: 'In publishing and graphic design, demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Maid'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Carpenter'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Petrol Pump Filler'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Gardener'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Painter'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Bar Tender'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Cook'},
    // {description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available', jobTitle: 'Restaurant Security Guard'},
  ]


  return(
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={styles.bgContainer}>

        <HeaderImage />

        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

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

        </View>

        <View style={styles.searchFieldConatiner}>

          <TextInput
            style={{ flex: 1, marginLeft: 10 }}
            placeholder='Job Title'
          />

          <View style={{ flex: 0.4, justifyContent: 'space-evenly', padding: 10, backgroundColor: colors.yellow, flexDirection: 'row', borderRadius: 20 }}>
            <FontAwesome name='search' size={20} />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Find Job</Text>
          </View>

        </View>

      </View>

        {/* <ImageBackground 
          source={require('../../assets/splashBg.jpg')} 
          resizeMode='cover' 
          style={styles.radiusImage}
        >

            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
              
              <View>
                <Entypo name='menu' size={35} color={colors.white}/>
                <Logo />
              </View>

              <LanguagePicker 
                viewStyle={{flex: 0.7}}
                value={lang}
                open={dropdown}
                setOpen={() => setDropDown(!dropdown)}
                setValue={setLang}
              />

            </View>           

        </ImageBackground> */}
      <View style={{height: 145}}>
        <Swiper
          //dotStyle={{marginTop: 20}}
          //height={200}
          containerStyle={{flex: 1}}
          dot={<View style={styles.dot} />}
          activeDot ={ <View style={styles.activeDot} /> }
          paginationStyle={{marginBottom: -5}}
          loop={false}
        >
          <View style={styles.slide}>
            <Image 
              source={require('../../assets/people.jpg')} 
              style={styles.slideImage} 
              resizeMode='cover' 
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../assets/slider.png')} 
              style={styles.slideImage} 
              resizeMode='cover' 
            />
          </View>

          <View style={styles.slide}>
            <Image 
              source={require('../../assets/people.jpg')} 
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
          <JobIconsView title='Carpenter'/>

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
          <TouchableOpacity>
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
          <JobCard />
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