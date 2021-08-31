import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../../Constants/colors';
import Description from '../../Components/molecules/Description';
import Heading from '../../Components/atoms/Haeding';
import Button from '../../Components/molecules/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import ProfilePicture from '../../Components/atoms/ProfilePicture';
import MenuIcon from '../../Components/atoms/MenuIcon';
import HeaderRowContainer from '../../Components/molecules/HeaderRowContainer';
import HeaderImage from '../../Components/atoms/HeaderImage';

const EmployerProfile = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return(
    <ScrollView style={{flex: 1, backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>

      <HeaderImage style={{height: Dimensions.get('window').height * 0.29}}/>

      <HeaderRowContainer>
        <MenuIcon onPress={() => navigation.openDrawer()}/>

        <View>
                <ProfilePicture />
                <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.white}}>John Doe</Text>

                {/* <Text style={{alignSelf: 'center', paddingHorizontal: 15, color: colors.white}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque erat vitae nibh feugiat sollicitudin.
            </Text> */}

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
        
        {/* <ImageBackground source={require('../../assets/zigZag.png')}  style={styles.headerImage}>
            
            <HeaderRowContainer style={{position: 'relative'}}>
              <MenuIcon />

              <View>
                <ProfilePicture />
                <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.white}}>John Doe</Text>
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

            <Text style={{alignSelf: 'center', paddingHorizontal: 15, color: colors.white}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque erat vitae nibh feugiat sollicitudin.
            </Text>

        </ImageBackground> */}

        <View style={styles.infoContainer}>

          <Heading title='BUSINESS INFORMATION' />

          <Description label='BUSINESS NAME' value='Search Work'/>

          <Description label='CONTACT NO.' value={'+(1) 142 111 54688'}/>

          {/* <Description label='GENDER' value={'Male'}/>

          <Description label='DATE OF BIRTH' value={'5-Jan-1994'}/> */}

          <Description label='EMAIL' value={'johndoe@gmail.com'}/>

          <Description label='WEBSITE' value={'www.searchwork.com'}/>

          {/* <Heading title='ADDITIONAL INFORMATION' style={{marginTop: 16}}/>

          <Description label='SKILLS' value={'MS Excel & MS Word'}/>

          <Description label='QUALIFICATION' value={'Masters'}/>

          <Description label='LANGUAGES' value={'English & Spanish'}/> */}

          <Heading title='BUSINESS LOCATION' style={{marginTop: 16}}/>

          <Description label='ADDRESS' value={'124, Blvd Street'}/>

          <Description label='STATE' value={'TEXAS'}/>

          <Description label='CITY' value={'Houston'}/>

          

          <Description label='ZIP CODE' value={'75601'}/>

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
    height: Dimensions.get('screen').height * 0.3,
  },
  infoContainer:{
    padding: 16
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

export default EmployerProfile;