import React, {useState} from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import colors from '../../Constants/colors';
import Heading from '../../Components/atoms/Haeding';
import Button from '../../Components/molecules/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import ProfileTextField from '../../Components/molecules/ProfileTextField';
import MenuIcon from '../../Components/atoms/MenuIcon';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import HeaderImage from '../../Components/atoms/HeaderImage';
import {userLogin} from '../../redux/slices';
import { useSelector } from 'react-redux';


const EmployeeProfile = ({navigation}) => {

    const user = useSelector(userLogin);
    console.log('Employee Profile User:',user)
    const [dropDown, setDropDown] = useState(false);
    const [lang, setLang] = useState('eng');

  return(
    <ScrollView style={{flex: 1, backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>

        <HeaderImage style={{height: Dimensions.get('window').height * 0.29}}/>

      <HeaderRowContainer>
        <MenuIcon onPress={() => navigation.openDrawer()}/>

              <View style={{alignItems: 'center', width: 190, overflow:'hidden'}}>
                <ProfilePicture 
                  iconSize={40}
                  imageSource={user?.image_urls != undefined && user?.image_urls['3x']} 
                  //imageSource={user.image_urls? user.image_urls['1x']}
                  disabled={true}
                />
                <Text numberOfLines={1} ellipsizeMode='clip' style={{fontSize: 18, fontWeight: 'bold', color: colors.white}}>{user?.name}</Text>
              </View>

              <LanguagePicker 
                viewStyle={{width: 80}}
                containerStyle={{flex: 1}}
                value={lang}
                setValue={setLang}
                open={dropDown}
                setOpen={setDropDown}
              />

      </HeaderRowContainer>

             <Text style={{alignSelf: 'center', paddingHorizontal: 15, color: colors.white, position: 'absolute', top: 130}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque erat vitae nibh feugiat sollicitudin.
            </Text>

        <View style={styles.infoContainer}>

          <Heading title='MY INFORMATION' />

          <ProfileTextField 
            title='FULL NAME'
            value={user?.name}
            editable={false} 
          />

          <ProfileTextField 
            title='CONTACT NO'
            value={user?.phone}
            editable={false} 
          />

          <ProfileTextField 
            title='GENDER'
            value={'Male'}
            //value={user?.gender[0].toUpperCase() + user?.gender.slice(1)}
            editable={false}  
          />

          <ProfileTextField 
            title='DATE OF BIRTH'
            value={user?.dob}
            editable={false}  
          />

          <ProfileTextField 
            title='EMAIL'
            value={user?.email}
            editable={false}  
          />

          <Heading title='ADDITIONAL INFORMATION' style={{marginTop: 16}}/>

          <ProfileTextField 
            title='SKILLS'
            value={'MS Excel & MS Word'}
            editable={false}  
          />

          <ProfileTextField 
            title='QUALIFICATION'
            value={'Masters'}
            editable={false}  
          />

          <ProfileTextField 
            title='LANGUAGES'
            value={'English & Spanish'}
            editable={false}  
          />

          <Heading title='LOCATION' style={{marginTop: 16}}/>

          <ProfileTextField 
            title='ADDRESS'
            value={user?.address}
            editable={false}  
          />

          <ProfileTextField 
            title='STATE'
            value={user?.state}
            editable={false}  
          />

          <ProfileTextField 
            title='CITY'
            value={user?.city}
            editable={false}  
          />

          <ProfileTextField 
            title='ZIP CODE'
            value={'75601'}
            editable={false} 
          />

        </View>

        <View style={{flexDirection: 'row'}}>
          <Button title='Edit Profile' style={styles.button}/>

          <Button 
            title='Saved' 
            style={{...styles.button, borderTopRightRadius: 30, borderTopLeftRadius: 0, backgroundColor: colors.primaryColor}}
          />
        </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height * 0.34,
  },
  infoContainer:{
    padding: 9
  },
  button:{
    flex: 0.5, 
    height: Dimensions.get('screen').height * 0.08, 
    borderTopLeftRadius: 30, 
    borderRadius: 0
  },
  userImageContainer:{
    backgroundColor: colors.lightGray,
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EmployeeProfile;