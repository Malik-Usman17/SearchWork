import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, ImageBackground, StatusBar, TextInput, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import HeaderImage from '../Components/atoms/HeaderImage';
import colors from '../Constants/colors';
import FixedContainer from '../Components/molecules/FixedContainer';
import Logo from '../Components/atoms/Logo';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconText from '../Components/atoms/IconText';
import MenuIcon from '../Components/atoms/MenuIcon';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chips from '../Components/atoms/Chips';
import CompanyLabelCard from '../Components/atoms/CompanyLabelCard';


const JobListing = () => {

  const [dropDown, setDropDown] = useState(false);
  const [lang, setLang] = useState('eng');

  const data = [
    { image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
    { image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
    { image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.' },
    { image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower' },
  ]

  const jobCard = ({ item }) => {
    return (
      <View style={styles.jobContainer}>

        <Image source={item.image} style={styles.jobImage} />

        <View style={{ marginLeft: 8, flex: 1 }}>

          <Text style={styles.jobTitle}>{item.jobTitle}</Text>

          <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>
            {item.description}
          </Text>

          <TouchableOpacity activeOpacity={0.7} style={styles.viewApplicantsButton}>

            <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
              <Image
                source={require('../../assets/applicants.png')}
                resizeMode='contain'
                style={styles.applicantImageIcon}
              />
            </View>

            <Text style={{ marginLeft: 3, color: colors.white, fontWeight: 'bold', fontSize: 12 }}>View Job Details</Text>

          </TouchableOpacity>

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

      </View>
    )
  }


  return (
    <View style={{ flex: 1 }}>

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={{ flex: 1 }}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.3 }} />


        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon />
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

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(key, index) => index.toString()}
          renderItem={jobCard}
        />

        <CompanyLabelCard />

      </ImageBackground>

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
    marginVertical: 6,
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
  }
})

export default JobListing;