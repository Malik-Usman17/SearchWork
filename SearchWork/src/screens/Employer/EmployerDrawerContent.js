import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import CompanyLabel from '../../Components/atoms/CompanyLabel';
import EmployerLogo from '../../Components/atoms/EmployerLogo';
import MenuIcon from '../../Components/atoms/MenuIcon';
import IconButton from '../../Components/molecules/IconButton';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { jobPostedSelector, login, setJobPost } from '../../redux/slices';


const EmployerDrawerContent = ({navigation}) => {

  

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  const jobFields = useSelector(jobPostedSelector);
  //console.log(jobFields);

  var jobObj = { ...jobFields }

  const dispatch = useDispatch();

  return(
    <View style={{flex: 1}}>

      <View style={styles.headerContainer}>
        
        <View style={{ position: 'absolute', width: '100%', padding: 9 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon iconColor={colors.darkGray} onPress={() => navigation.closeDrawer()}/>
              <EmployerLogo />
            </View>

            <LanguagePicker
              viewStyle={{ width: 80 }}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
            />

          </View>

        </View>

      </View>

      <ScrollView style={{marginLeft: 20, marginVertical: 5}}>

        <IconButton title='Home' style={styles.iconButton} onPress={() => navigation.navigate(Constants.screen.EmployerDashboard)}>
          <Entypo name='home' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Post a Job' style={styles.iconButton} onPress={() => navigation.navigate(Constants.screen.JobPosted)}>
          <MaterialCommunityIcons name='file-document-edit' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Draft' style={styles.iconButton} onPress={() => navigation.navigate(Constants.screen.Draft)}>
          <MaterialIcons name='drafts' size={25} color={colors.primaryColor}/>
        </IconButton>


        <IconButton title='My Jobs' style={styles.iconButton} onPress={() => navigation.navigate(Constants.screen.JobPostedList)}>
          <MaterialCommunityIcons name='text-box-search' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Applicants' style={styles.iconButton} 
         onPress={() => navigation.navigate(Constants.screen.AppliedJobsList)}
        >
          <FontAwesome name='users' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Change Password' style={styles.iconButton}>
          <Ionicons name='lock-closed' size={25} color={colors.primaryColor}/>
        </IconButton>

        <View style={{marginTop: 25, flexDirection: 'row', alignItems: 'center'}}>
          
          <MaterialCommunityIcons name='logout' size={25} color={colors.primaryColor} style={{marginLeft: 3}}/>
          <TouchableOpacity 
            style={{marginLeft: 10}}
            onPress={() => {
              navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Constants.screen.LoginScreen }] }));
              dispatch(login(null))
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
          >
            <Text style={{fontSize: 22}}>Logout</Text>
          </TouchableOpacity>

        </View>
        
      </ScrollView>

      <View style={styles.bottomContainer}>
        
        <CompanyLabel style={{color: colors.white, alignSelf: 'flex-start', marginLeft: 15}}/>
        
        <View style={{marginRight: 15}}>
          
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Entypo name='facebook' size={20} color={colors.white}/>
            <AntDesign name='instagram' size={20} color={colors.white}/>
            <Entypo name='twitter' size={20} color={colors.white}/>
          </View>

          <Text style={{fontWeight: 'bold', color: colors.white}}>SearchWork</Text>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    height: Dimensions.get('window').height * 0.22,
    //height: Dimensions.get('window').height * 0.25,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: colors.primaryColor,
    borderWidth: 1.5,
    elevation: 20
  },
  iconButton:{
    height: 60
  },
  bottomContainer:{
    marginTop: 'auto', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: colors.primaryColor, 
    height: Dimensions.get('screen').height * 0.11, 
    borderBottomRightRadius: 40
  }
});

export default EmployerDrawerContent;