import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import Divider from '../../Components/atoms/Divider';
import EmployerLogo from '../../Components/atoms/EmployerLogo';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import BgCard from '../../Components/molecules/BgCard';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { useSelector } from 'react-redux';
import { userLogin } from '../../redux/slices';


const EmployerDashboard = ({ navigation }) => {

  const user = useSelector(userLogin);
  //console.log('Employer Dashbaord User',user) 
  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  // console.log(user?.image_urls['1x'])
  // console.log(user?.image)

  return (
    <ScrollView style={{ backgroundColor: colors.white, flex: 1 }} showsVerticalScrollIndicator={false}>

      <View style={styles.headerContainer}>

        <HeaderRowContainer>

          <View>
            <MenuIcon iconColor={colors.darkGray} onPress={() => navigation.openDrawer()} />
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

      <Image source={require('../../../assets/bgSlide.jpg')} style={styles.image} />

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ position: 'absolute', bottom: -35 }}>
          <ProfilePicture
            emptyContainerStyle={styles.profilePicture}
            imageStyle={{...styles.profilePicture, borderWidth: 2}} 
            iconSize={50}
            imageSource={user?.image_urls != undefined && user?.image_urls['3x']}
            disabled={true} 
          />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20, marginHorizontal: 15 }}>

        <View style={{flexDirection: 'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: colors.darkGray, fontSize: 22, fontWeight: 'bold' }}>Welcome, </Text>
          <Text style={{color: colors.primaryColor, fontSize: 22, fontWeight: 'bold', flexWrap:'wrap' }}>{user?.name}</Text>
        </View>


        <Text style={{ color: colors.darkGray, fontWeight: 'bold', fontSize: 13 }}>You can manage your jobs here</Text>

      </View>

      <View style={{ padding: 15 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ fontWeight: 'bold', color: colors.darkGray }}>DASHBOARD</Text>
          <Divider style={{ flex: 1, marginLeft: 5 }} />
        </View>

        <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <BgCard
            bgImage={require('../../../assets/red.png')}
            iconImage={require('../../../assets/edit.png')}
            title='Post a Job'
            onPress={() => navigation.navigate(Constants.screen.JobPosted)}
          />

          <BgCard
            bgImage={require('../../../assets/green.png')}
            iconImage={require('../../../assets/search.png')}
            title='My Jobs'
            onPress={() => navigation.navigate(Constants.screen.JobPostedList)}
          />

          <BgCard
            style={{ marginTop: 10 }}
            bgImage={require('../../../assets/blue.png')}
            iconImage={require('../../../assets/applicants.png')}
            title='View Applications'
            onPress={() => navigation.navigate(Constants.screen.AppliedJobsList)}
          />

          <BgCard
            style={{ marginTop: 10 }}
            bgImage={require('../../../assets/purple.png')}
            iconImage={require('../../../assets/profile.png')}
            title='Manage Profile'
            onPress={() => navigation.navigate(Constants.screen.EmployerProfile)}
          />

        </View>

      </View>

      <CompanyLabelCard />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    height: Dimensions.get('window').height * 0.22,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'green',
    borderWidth: 1.5,
    elevation: 20
  },
  profilePicture: {
    borderColor: colors.primaryColor,
    height: 120,
    width: 120,
    borderRadius: 60
  },
  image: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    height: 220,
  },
});

export default EmployerDashboard;