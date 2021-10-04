import React, { useState } from 'react';
import { View, Text, ScrollView, Linking, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import HeaderImage from '../Components/atoms/HeaderImage';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import Logo from '../Components/atoms/Logo';
import FixedContainer from '../Components/molecules/FixedContainer';
import MenuIcon from '../Components/atoms/MenuIcon';
import colors from '../Constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Divider from '../Components/atoms/Divider';
import IconText from '../Components/atoms/IconText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../Components/molecules/Button';
import CompanyLabelCard from '../Components/atoms/CompanyLabelCard';
import { useSelector } from 'react-redux';
import {userLogin} from '../redux/slices';
import HeaderRowContainer from '../Components/molecules/HeaderRowContainer';


const IndividualJob = ({navigation, route}) => {

  const user = useSelector(userLogin)
  console.log(user)
  const {jobDetail} = route.params;
  console.log('DETAILS:',jobDetail)

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [isSave, setIsSave] = useState(false);
  //const url = `https://www.google.com/maps/search/${lang}`
  //const url = 'https://www.google.com/maps/search/'+'Sybrid Pvt Ltd Karachi Pakistan';
  const url = `https://www.google.com/maps/search/${jobDetail.st_address}, ${jobDetail.state}, ${jobDetail.city}, ${jobDetail.zipcode}` 

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      <StatusBar />

      <ImageBackground 
        source={require('../../assets/grayBg.jpg')} 
        style={user?.type == 'employer' ? styles.bgContainerButtons : styles.bgContainer}
      >

        <HeaderImage />

        <View style={{ position: 'absolute', width: '100%', padding: 9, flex: 1}}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon onPress={() => navigation.openDrawer()}/>
              <Logo />
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

          <View style={styles.JobContainer}>
            <Image source={require('../../assets/people.jpg')} style={styles.image} />

            <TouchableOpacity style={{ position: 'absolute', top: 12, left: 12 }} onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle' size={30} color={colors.darkGray} />
            </TouchableOpacity>

            <View style={styles.jobTitleContainer}>

              <Text 
                ellipsizeMode='tail' 
                numberOfLines={2} 
                style={{ fontSize: 22, fontWeight: 'bold', color: colors.primaryColor, flex: 1, marginRight: 5 }}
              >
                  {jobDetail.title}
              </Text>

              <TouchableOpacity onPress={() => setIsSave(!isSave)}>
                <FontAwesome
                  name={isSave == true ? "bookmark" : 'bookmark-o'}
                  color={colors.primaryColor}
                  size={26}
                />
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'space-between' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Ionicons name='document-text-sharp' size={25} color={colors.primaryColor} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5 }}>Job Description</Text>

              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginRight: 2, color: colors.gray }}>No of Posts:</Text>
                  <Text style={{ fontWeight: 'bold' }}>{jobDetail.no_of_posts}</Text>
                </View>

                <Ionicons name='people' size={22} color={colors.primaryColor} style={{ marginLeft: 3 }} />

              </View>

            </View>

            <Text style={{ paddingLeft: 15, paddingRight: 15 }}>{jobDetail.description}</Text>

           <Divider style={{ marginLeft: 15, marginTop: 15, width: '90%' }} />

           <IconText style={{ alignItems: 'center' }} text='Designation' textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
             <MaterialIcons name='person' size={25} color={colors.primaryColor} />
           </IconText>

           <Text style={{ marginLeft: 35, marginTop: 2, color: colors.gray }}>{jobDetail.title}</Text>

           <Divider style={{ marginLeft: 15, marginTop: 15, width: '90%' }} />

           <IconText style={{ alignItems: 'center' }} text='Location' textStyle={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>
             <Ionicons name='location-sharp' size={25} color={colors.primaryColor} />
           </IconText>

          <Text style={{ marginLeft: 35, marginTop: 2, color: colors.gray }}>
            {`${jobDetail.st_address}, ${jobDetail.state}, ${jobDetail.city}, ${jobDetail.zipcode}`}
          </Text>

           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 10 }}>

             <TouchableOpacity 
               style={{ marginLeft: 35 }}
               onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))}
               >
               <Text style={{ fontSize: 12, color: colors.buttonColor }}>Click here to view full address</Text>
             </TouchableOpacity>
              
             <MaterialIcons name='location-city' size={20} color={colors.primaryColor} style={{ marginLeft: 3 }} />

           </View>
           {
             user?.type == 'employer' && (
              <View style={{ flexDirection: 'row', marginTop: 15 }}>

                         <Button
                          title='Apply'
                          style={styles.button} />
          
                        <Button
                          style={styles.saveButton}
                          titleStyle={{ color: 'black' }}
                          title='Save Job'
                          iconName='bookmark'
                          iconColor='black'
                        />
          
                      </View>
             )
           }

          </View>

        </View>

        <CompanyLabelCard />

      </ImageBackground>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bgContainerButtons:{
    height: 850,
    //height: Dimensions.get('screen').height + 95,
    width: Dimensions.get('window').width
  },
  bgContainer:{
    height: 800,
    width: Dimensions.get('window').width
  },
  JobContainer: {
    //flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    marginTop: 15,
  },
  jobTitleContainer:{
    backgroundColor: colors.white, 
    padding: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    elevation: 30
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  screenContainer: {
    backgroundColor: colors.lightGray,
    height: Dimensions.get('screen').height * 1.1
    //height: 835
  },
  button: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.08,
    borderBottomLeftRadius: 40,
    borderRadius: 0
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.yellow,
    height: Dimensions.get('screen').height * 0.08,
    borderRadius: 0,
    borderBottomRightRadius: 40
  },
})

export default IndividualJob;