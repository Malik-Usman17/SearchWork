import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HeaderImage from '../Components/atoms/HeaderImage';
import colors from '../Constants/colors';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import MenuIcon from '../Components/atoms/MenuIcon';
import Logo from '../Components/atoms/Logo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfilePicture from '../Components/atoms/ProfilePicture';
import IconText from '../Components/atoms/IconText';
import Entypo from 'react-native-vector-icons/Entypo';
import Divider from '../Components/atoms/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CompanyLabel from '../Components/atoms/CompanyLabel';
import IconButton from '../Components/molecules/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../Constants/Constants.json';

const DrawerContent = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return(
    <View style={{flex: 1}}>

      <HeaderImage style={{height: Dimensions.get('window').height * 0.28}}/>

      <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Logo />

          <MenuIcon onPress={() => navigation.closeDrawer()}/>

        </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        
        <View style={{marginRight: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{color: colors.white, fontSize: 16, fontWeight: 'bold'}}>John Doe</Text>
        </View>

        <ProfilePicture />

      </View>

      </View>

      <View style={{marginLeft: 20}}>

        <IconButton title='Home' onPress={() => navigation.navigate(Constants.screen.EmployeeDashboard)}>
          <Entypo name='home' size={30} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Saved Jobs'>
          <FontAwesome name='bookmark' size={30} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Profile'>
          <FontAwesome name='user' size={30} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Change Password'>
          <Ionicons name='lock-closed' size={30} color={colors.primaryColor}/>
        </IconButton>

        <IconButton title='Logout'>
          <MaterialIcons name='logout' size={30} color={colors.primaryColor}/>
        </IconButton>
        
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
  searchFieldConatiner: {
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: colors.primaryColorLight
  },
  categoriesContainer:{
    height: 60,
    //backgroundColor: 'gray',
    flexDirection: 'row', 
    alignItems: 'flex-end'
  },
  bottomContainer:{
    marginTop: 'auto', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: 
    colors.primaryColor, 
    height: Dimensions.get('window').height * 0.14, 
    borderBottomRightRadius: 40
  }
});

export default DrawerContent;