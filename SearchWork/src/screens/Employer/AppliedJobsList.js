import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';

const AppliedJobsList = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  const data = [
    {image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
    {image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
    {image: require('../../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
  ]


  const jobCard = ({item}) => {
    return(
    <View style={styles.jobContainer}>

    <Image source={item.image} style={styles.jobImage}/>
    
    <View style={{marginLeft: 8, flex: 1}}>
      
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      
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


  return(
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
    fontWeight: 'bold'
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
})

export default AppliedJobsList;