import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Linking, Image, Dimensions, Platform } from 'react-native';
import colors from '../../Constants/colors';
import SmallDetails from '../../Components/atoms/SmallDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Divider from '../../Components/atoms/Divider';
import CompanyLabel from '../../Components/atoms/CompanyLabel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import Heading from '../../Components/atoms/Haeding';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconText from '../../Components/atoms/IconText';
import Logo from '../../Components/atoms/Logo';
import Button from '../../Components/molecules/Button';
import {userLogin, applicantProfile, loginUserProfile} from '../../redux/slices';
import { useSelector } from 'react-redux';


const EmployeeResume = () => {

  const user = useSelector(userLogin);
  const userProfile = useSelector(loginUserProfile)
  console.log('User Profileee',userProfile)
  

  const profile = useSelector(applicantProfile)
  // console.log('PROFILE:',profile)
  // console.log('User Info on Resume Screen:',user)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.lightGray }} showsVerticalScrollIndicator={false}>
      {/* <ImageBackground source={require('../../assets/blurBg.png')} style={styles.bg}> */}

      <View style={styles.resumeContainer}>

        <View style={styles.rowContainer}>

          <View style={styles.leftColumn}>

            <View style={{ backgroundColor: colors.primaryColor, borderTopLeftRadius: 20, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, height: 200, justifyContent: 'center', paddingBottom: 40, alignItems: 'center' }}>
              <Logo style={[styles.logo, { transform: [{ rotate: '-25deg' }] }]} />
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ position: 'absolute', top: -50 }}>
                <ProfilePicture
                  imageSource={userProfile?.image_urls['3x']}
                  imageStyle={{height:80, width: 80, borderRadius: 40, borderColor: colors.white, borderWidth: 2}}
                  disabled={true} 
                  iconSize={30}
                />
              </View>
            </View>

            <Heading
              title='Contact Me'
              style={{ marginTop: 65, marginBottom: 7, alignSelf: 'flex-start', width: '100%', backgroundColor: colors.primaryColor, alignItems: 'center' }}
              textStyle={{ color: colors.white, fontWeight: 'bold' }}
            />
          
            <IconText text={userProfile?.email}>
              <Ionicons name='mail' size={16} color={colors.white} />
            </IconText>

            <IconText text={userProfile?.phone}>
              <Ionicons name='phone-portrait' size={16} color={colors.white} />
            </IconText>
          

            <Heading
              title='Address'
              style={{ marginTop: 35, marginBottom: 7, alignSelf: 'flex-start', width: '100%', backgroundColor: colors.primaryColor, alignItems: 'center' }}
              textStyle={{ color: colors.white, fontWeight: 'bold' }}
            />

            <IconText text={`${userProfile?.address}, ${userProfile?.city}, ${userProfile?.state}, ${userProfile?.zipcode}`}>
              <Ionicons name='md-location-sharp' size={16} color={colors.white} />
            </IconText>

            <Heading
              title='Languages'
              style={{ marginTop: 35, marginBottom: 7, alignSelf: 'flex-start', width: '100%', backgroundColor: colors.primaryColor, alignItems: 'center' }}
              textStyle={{ color: colors.white, fontWeight: 'bold' }}
            />

            <IconText text={userProfile?.languages}>
              <FontAwesome name='language' size={16} color={colors.white} />
            </IconText>

            {/* <IconText text='Spanish'>
              <FontAwesome name='language' size={16} color={colors.white} />
            </IconText> */}

          </View>

          <View style={styles.rightColumn}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.name}>{userProfile?.name}</Text>
              <Image source={require('../../../assets/resumeChip.png')} resizeMode='contain'  style={{ width: 40, height: 80}} />
            </View>

            <View style={styles.headingContainer}>
              <FontAwesome name='user' size={25} color={colors.primaryColor} />
              <Text style={styles.heading}>Objective</Text>
            </View>
            <Divider style={{ marginTop: 5 }} />

            <Text style={{ fontSize: 13, marginRight: 4, marginTop: 7 }}>
              {userProfile?.objective}
            </Text>

            <View style={styles.headingContainer}>
              <FontAwesome name='briefcase' size={25} color={colors.primaryColor} />
              <Text style={styles.heading}>Experience</Text>
            </View>
            <Divider style={{ marginTop: 5 }} />

            <View style={styles.descriptionContainer}>
              <View style={styles.dot} />
              <Text style={styles.descriptionText}>{userProfile?.experience}</Text>
            </View>

            {/* <View style={styles.descriptionContainer}>
              <View style={styles.dot} />
              <Text style={styles.descriptionText}>Worked as a petrol Filler in Shell Pump, Chicago.</Text>
            </View> */}

            {/* <View style={styles.headingContainer}>
              <FontAwesome name='laptop' size={25} color={colors.primaryColor} />
              <Text style={styles.heading}>Skills</Text>
            </View>
            <Divider style={{ marginTop: 5 }} />

            <View style={styles.descriptionContainer}>
              <View style={styles.dot} />
              <Text style={styles.descriptionText}>MS Excel, MS Word, MS Power Point.</Text>
            </View> */}

          </View>

        </View>

        <View style={styles.bottomContainer}>
          <CompanyLabel style={{ color: colors.white }} />
          <Logo style={styles.logo} />

        </View>

      </View>

      {
        user?.type == 'employer' &&
      

        <View style={{flexDirection: 'row'}}>
          <Button 
            title='Call' 
            style={styles.button} 
            iconName='add-call' 
            titleStyle={{marginLeft: 10}}
            onPress={() => {
              let phoneNumber = '';
              if(Platform.OS === 'android'){
                //phoneNumber = 'tel:${+923102769940}'
                phoneNumber = `tel:${profile?.phone}`
              }
              else{
                phoneNumber = `telprompt:${profile?.phone}`
                //phoneNumber = 'telprompt:${+923102769940}'
              }
              Linking.openURL(phoneNumber)
            }}
          />

          <Button 
            title='Email'
            iconName='email' 
            style={{...styles.button, borderTopRightRadius: 30, borderTopLeftRadius: 0, backgroundColor: 'red'}}
            titleStyle={{marginLeft: 10}}
            onPress={() => Linking.openURL(`mailto: ${profile?.email}`)}
            //onPress={() => Linking.openURL('mailto: example@gmail.com')}
          />
        </View>
      }
          
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg:{
    height: Dimensions.get('screen').height + 70,
    width: Dimensions.get('window').width
  },
  resumeContainer: {
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 10,
    //marginTop: 20,
    backgroundColor: colors.white
  },
  rowContainer: {
    flexDirection: 'row',
    height: 850
  },
  leftColumn: {
    width: Dimensions.get('window').width * 0.35,
    backgroundColor: colors.darkGray,
    borderTopLeftRadius: 20,
  },
  rightColumn: {
    marginHorizontal: 10,
    flex: 1
  },
  name: {
    marginTop: 40,
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.primaryColor,
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 6
  },
  dot: {
    marginTop: 8,
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryColor
  },
  pictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: '#C5C4C7'
  },
  bottomContainer: {
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.primaryColor,
    width: '100%',
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  logo: {
    height: 50,
    width: 110,
    resizeMode: 'contain'
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  descriptionText: {
    marginLeft: 6,
    fontSize: 13,
    marginRight: 4
  },
  button:{
    flex: 0.5, 
    height: Dimensions.get('screen').height * 0.08, 
    borderTopLeftRadius: 30, 
    borderRadius: 0,
    backgroundColor: colors.primaryColor
  },
});

export default EmployeeResume;
