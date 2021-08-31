import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import Button from '../../Components/molecules/Button';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import SearchField from '../../Components/molecules/SearchField';


const SavedJobs = ({ navigation }) => {

  const [dropDown, setDropDown] = useState(false);
  const [lang, setLang] = useState('eng');
  const [manageJobIcons, setManageJobIcons] = useState(false);

  const data = [
    { image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
    { image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
    { image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
  ]

  const jobCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.jobContainer} onPress={() => Alert.alert('Alert Title', 'Are Sure You want To delete this', [{
        text: 'CANCEL',
        //onPress: ()
      }, {
        text: 'OK',
        onPress: () => alert('Cancel Pressed')
      }])}>

        <Image source={item.image} style={styles.jobImage} />

        <View style={{ marginLeft: 8, flex: 1 }}>

          <Text style={styles.jobTitle}>{item.jobTitle}</Text>

          <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>
            {item.description}
          </Text>
          {/* 
          <TouchableOpacity activeOpacity={0.7} style={styles.viewApplicantsButton} onPress={() => navigation.navigate(Constants.screen.IndividualJob)}>

            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
              <Image
                source={require('../../../assets/applicants.png')}
                resizeMode='contain'
                style={styles.applicantImageIcon}
              />
            </View>

            <Text style={{ marginLeft: 3, color: colors.white, fontWeight: 'bold', fontSize: 12 }}>View Job Details</Text>

          </TouchableOpacity> */}

          <View style={styles.jobIconsContainer}>
            {
              manageJobIcons == true ?
                <>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(Constants.screen.IndividualJob)}>
                    <Ionicons name='eye' size={18} color={colors.buttonColor} />
                    <Text style={{ fontSize: 10 }}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.icons}>
                    <MaterialCommunityIcons name='delete' size={18} color='red' />
                    <Text style={{ fontSize: 10 }}>Delete</Text>
                  </TouchableOpacity>
                </>
                : null
            }

            <Button
              title='Manage Jobs'
              titleStyle={{ fontSize: 12 }}
              style={styles.manageJobButton}
              onPress={() => setManageJobIcons(!manageJobIcons)}
            />

          </View>

          {/* <View style={{flexDirection: 'row'}}>
            <Chips title='Part Time'>
              <AntDesign name='clockcircle' size={17} color={colors.gray}/>
            </Chips>

            <Chips title='Full time'>
              <AntDesign name='clockcircle' size={17} color={colors.gray}/>
            </Chips>

            <Chips title='Texas'>
              <AntDesign name='clockcircle' size={17} color={colors.gray}/>
            </Chips>

          </View> */}


        </View>

      </TouchableOpacity>
    )
  }


  return (
    <View style={{ flex: 1 }}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={{ flex: 1 }}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.22 }} />

        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <MenuIcon onPress={() => navigation.openDrawer()}/>

            <ScreenTitle title='Save Jobs' />

            <LanguagePicker
              viewStyle={{ width: 80 }}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
            />

          </View>

          <SearchField />
          
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(key, index) => index.toString()}
          renderItem={jobCard}
        />

        <Button
          title='See More'
          style={styles.seeMoreButton}
          titleStyle={{ fontSize: 12 }}
        />

        {/* <CompanyLabelCard /> */}

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  // searchFieldConatiner: {
  //   paddingHorizontal: 3,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 25,
  //   borderRadius: 20,
  //   backgroundColor: colors.primaryColorLight
  // },
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
    height: 120,
    width: 120,
    borderRadius: 15
  },
  jobImage: {
    height: 120,
    width: 120,
    borderRadius: 15
  },
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
  // viewApplicantsButton: {
  //   marginTop: 'auto',
  //   padding: 2,
  //   borderRadius: 25,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: colors.buttonColor,
  //   width: 132
  // },
  // applicantImageIcon: {
  //   height: 20,
  //   width: 20
  // },
  findJobChip: {
    flex: 0.4,
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    borderRadius: 20
  },
  seeMoreButton: {
    height: Dimensions.get('window').height * 0.05,
    marginVertical: 5,
    backgroundColor: colors.primaryColor,
    padding: 3,
    alignSelf: 'center'
  },
  jobIconsContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icons: {
    marginLeft: 6,
    alignItems: 'center'
  },
})

export default SavedJobs;