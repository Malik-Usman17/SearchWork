import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import CompanyLabel from '../../Components/atoms/CompanyLabel';
import HeaderImage from '../../Components/atoms/HeaderImage';
import Logo from '../../Components/atoms/Logo';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import IconButton from '../../Components/molecules/IconButton';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { userLogin, login } from '../../redux/slices';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

const DrawerContent = ({ navigation }) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  const user = useSelector(userLogin)
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>

      <HeaderImage style={{ height: Dimensions.get('window').height * 0.28 }} />

      <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Logo />

          <MenuIcon onPress={() => navigation.closeDrawer()} />

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

          <View style={{ marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>{user?.name}</Text>
          </View>


          <ProfilePicture
            iconSize={40}
            emptyContainerStyle={styles.profilePicture}
            imageStyle={{ ...styles.profilePicture, borderWidth: 2 }}
            imageSource={user?.image_urls != undefined && user?.image_urls['3x']}
            disabled={true}
          />

        </View>

      </View>

      <View style={{ marginLeft: 20 }}>

        <IconButton title='Home' onPress={() => navigation.navigate(Constants.screen.EmployeeDashboard)} style={styles.IconButtonContainer}>
          <Entypo name='home' size={30} color={colors.primaryColor} />
        </IconButton>

        <IconButton title='Saved Jobs' style={styles.IconButtonContainer} onPress={() => navigation.navigate(Constants.screen.SavedJobs)}>
          <FontAwesome name='bookmark' size={30} color={colors.primaryColor} />
        </IconButton>

        <IconButton title='Profile' style={styles.IconButtonContainer} onPress={() => navigation.navigate(Constants.screen.EmployeeProfile)}>
          <FontAwesome name='user' size={30} color={colors.primaryColor} />
        </IconButton>

        <IconButton title='Change Password' style={styles.IconButtonContainer}>
          <Ionicons name='lock-closed' size={30} color={colors.primaryColor} />
        </IconButton>

        <IconButton
          title='Logout'
          style={styles.IconButtonContainer}
          onPress={() => {
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Constants.screen.LoginScreen }] }));
            dispatch(login(null))
          }}
        >
          <MaterialIcons name='logout' size={30} color={colors.primaryColor} />
        </IconButton>

      </View>

      <View style={styles.bottomContainer}>

        <CompanyLabel style={{ color: colors.white, alignSelf: 'flex-start', marginLeft: 15 }} />

        <View style={{ marginRight: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Entypo name='facebook' size={20} color={colors.white} />
            <AntDesign name='instagram' size={20} color={colors.white} />
            <Entypo name='twitter' size={20} color={colors.white} />
          </View>

          <Text style={{ fontWeight: 'bold', color: colors.white }}>SearchWork</Text>

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
  categoriesContainer: {
    height: 60,
    //backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  bottomContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:
      colors.primaryColor,
    height: Dimensions.get('window').height * 0.14,
    borderBottomRightRadius: 40
  },
  IconButtonContainer: {
    height: 70
  },
  profilePicture: {
    borderColor: colors.white,
    height: 80,
    width: 80,
    borderRadius: 40
  },
});

export default DrawerContent;