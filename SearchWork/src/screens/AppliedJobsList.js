import React, {useState} from 'react';
import { View, Text, StatusBar, TouchableOpacity, ImageBackground, Dimensions, FlatList, Image, StyleSheet, Touchable } from 'react-native';
import colors from '../Constants/colors';
import HeaderImage from '../Components/atoms/HeaderImage';
import HeaderRowContainer from '../Components/molecules/HeaderRowContainer';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import MenuIcon from '../Components/atoms/MenuIcon';
import ScreenTitle from '../Components/atoms/ScreenTitle';
import Button from '../Components/molecules/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import CompanyLabelCard from '../Components/atoms/CompanyLabelCard';

const AppliedJobsList = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  const data = [
    {image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
    {image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
    {image: require('../../assets/people.jpg'), jobTitle: 'Petrol Pump Filler', description: 'This is petrol pump filler job description, we need hard wroker person, who willing to work with us with dedication and have attitude to work.'},
    {image: require('../../assets/people.jpg'), jobTitle: 'Lawn Mower', description: 'Need a person for our company to work as a lawn mower'},
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

      <TouchableOpacity activeOpacity={0.7} style={styles.viewApplicantsButton}>
        
        <View style={{height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white}}>
          <Image 
            source={require('../../assets/applicants.png')} 
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

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.17 }} />

        <HeaderRowContainer>

          <MenuIcon />

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
    //backgroundColor: 'pink'
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
    height: 20,
    width: 20
  }
})

export default AppliedJobsList;