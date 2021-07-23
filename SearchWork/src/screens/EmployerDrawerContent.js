import React, {useState} from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import EmployerLogo from '../Components/atoms/EmployerLogo';
import HeaderImage from '../Components/atoms/HeaderImage';
import MenuIcon from '../Components/atoms/MenuIcon';
import ProfilePicture from '../Components/atoms/ProfilePicture';
import IconButton from '../Components/molecules/IconButton'; 
import colors from '../Constants/colors';
import LanguagePicker from '../Components/organisms/LanguagePicker';


const EmployerDrawerContent = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return(
    <View style={{flex: 1}}>

      {/* <HeaderImage /> */}

      <View style={styles.headerContainer}>
        
        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon iconColor={colors.darkGray}/>
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


      {/* <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <EmployerLogo />

          <MenuIcon />

        </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        
        <View style={{marginRight: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{color: colors.white, fontSize: 16, fontWeight: 'bold'}}>John Doe</Text>
        </View>

        <ProfilePicture />

      </View>

      </View> */}

      <View style={{marginLeft: 20}}>

        <IconButton title='Home' style={styles.iconButton}>
          <Entypo name='home' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Post a Job' style={styles.iconButton}>
          <MaterialCommunityIcons name='file-document-edit' size={25} color={colors.primaryColor}/>
        </IconButton> 

        <IconButton title='Drafts' style={styles.iconButton}>
          <Ionicons name='md-document-text' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='My Jobs' style={styles.iconButton}>
          <MaterialCommunityIcons name='text-box-search' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Applicants' style={styles.iconButton}>
          <FontAwesome name='users' size={25} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Change Password' style={styles.iconButton}>
          <Ionicons name='lock-closed' size={25} color={colors.primaryColor}/>
        </IconButton>

        <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
          
          <MaterialCommunityIcons name='logout' size={25} color={colors.primaryColor} style={{marginLeft: 3}}/>
          <TouchableOpacity style={{marginLeft: 10}}>
            <Text style={{fontSize: 22}}>Logout</Text>
          </TouchableOpacity>

        </View>
        
      </View>

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
    height: Dimensions.get('window').height * 0.25,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: colors.primaryColor,
    borderWidth: 1.5,
    elevation: 20
  },
  iconButton:{
    height: 55
  },
  bottomContainer:{
    marginTop: 'auto', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: colors.primaryColor, 
    height: Dimensions.get('screen').height * 0.13, 
    borderBottomRightRadius: 40
  }
});

export default EmployerDrawerContent;