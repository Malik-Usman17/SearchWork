import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import MenuIcon from '../Components/atoms/MenuIcon';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import Logo from '../Components/atoms/Logo';
import EmployerLogo from '../Components/atoms/EmployerLogo';
import ProfilePicture from '../Components/atoms/ProfilePicture';
import Divider from '../Components/atoms/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../Components/molecules/Card';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import HeaderRowContainer from '../Components/molecules/HeaderRowContainer';


const EmployerDashboard = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return (
    <ScrollView style={{backgroundColor: colors.white, flex: 1}} showsVerticalScrollIndicator={false}>
      
      <View style={styles.headerContainer}>
   
          <HeaderRowContainer>
           
            <View>
              <MenuIcon iconColor={colors.darkGray}/>
              <EmployerLogo />
            </View>

            <LanguagePicker
              viewStyle={{ width: 75 }}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
            />

          </HeaderRowContainer>

      </View>

      <Image source={require('../../assets/bgUp.jpg')} resizeMode='stretch' style={styles.image}/>

     <View style={{alignItems: 'center', marginBottom: 20}}>
      <View style={{position: 'absolute', bottom: -35}}>
        <ProfilePicture style={styles.profilePicture}/>
      </View>
    </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: colors.darkGray, fontSize: 24, fontWeight: 'bold'}}>Welcome, </Text>
          <Text style={{color: colors.primaryColor, fontSize: 24, fontWeight: 'bold'}}>John Doe</Text>
        </View>

        
        <Text style={{color: colors.darkGray, fontWeight: 'bold', fontSize: 13}}>You can manage your jobs here</Text>

      </View>

      <View style={{padding: 15}}>

        <View style={{flexDirection: 'row', alignItems: 'center',}}>
          <Text style={{fontWeight: 'bold', color: colors.darkGray}}>DASHBOARD</Text>
          <Divider style={{flex: 1, marginLeft: 5}}/>
        </View>

        <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>

          <Card title='Post a Job' imageSource={require('../../assets/edit.png')}/>

          <Card title='My Jobs' imageSource={require('../../assets/search.png')}/>

          <Card title='View Applications' style={{marginTop: 10}} imageSource={require('../../assets/applicants.png')}/>

          <Card title='Manage Profile' style={{marginTop: 10}} imageSource={require('../../assets/profile.png')}/>


        </View>

      </View>

      <View style={{justifyContent: 'center', height: 25, backgroundColor: colors.primaryColor,borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <CompanyLabel style={{color: colors.white}} /> 
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    height: Dimensions.get('window').height * 0.25,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'green',
    borderWidth: 1.5,
    elevation: 20
  },
  profilePicture:{ 
    borderColor: colors.primaryColor
  },
  image:{
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    height: 220,
  },
});

export default EmployerDashboard;