import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../Constants/colors';
import Description from '../Components/molecules/Description';
import Heading from '../Components/atoms/Haeding';
import Button from '../Components/molecules/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import ProfilePicture from '../Components/atoms/ProfilePicture';

const EmployerProfile = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return(
    <ScrollView style={{flex: 1, backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>
        
        <ImageBackground source={require('../../assets/zigZag.png')}  style={styles.headerImage}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 5}}>
              
              <TouchableOpacity>
                <Ionicons name='arrow-back-circle' size={30} color={colors.yellow}/>
              </TouchableOpacity>
              
              <View style={{alignItems: 'center'}}>

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
            </View>

            <Text style={{alignSelf: 'center', paddingHorizontal: 15, color: colors.white}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque erat vitae nibh feugiat sollicitudin.
            </Text>

            {/* <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button 
                title='Edit Profile' 
                style={{width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.05, borderRadius: 25}}
              />
              
              <Button title='My Resume'
              style={{backgroundColor:colors.primaryColorLight, width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.05, borderRadius: 25}}
              />
            </View> */}

        </ImageBackground>

        <View style={styles.infoContainer}>

          <Heading title='MY INFORMATION' />

          <Description label='FULL NAME' value='John Doe'/>

          <Description label='CONTACT NO.' value={'+(1) 142 111 54688'}/>

          <Description label='GENDER' value={'Male'}/>

          <Description label='DATE OF BIRTH' value={'5-Jan-1994'}/>

          <Description label='EMAIL' value={'johndoe@gmail.com'}/>

          {/* <Description label='WEBSITE' value={'www.searchwork.com'}/> */}

          <Heading title='ADDITIONAL INFORMATION' style={{marginTop: 16}}/>

          <Description label='SKILLS' value={'MS Excel & MS Word'}/>

          <Description label='QUALIFICATION' value={'Masters'}/>

          <Description label='LANGUAGES' value={'English & Spanish'}/>

          <Heading title='LOCATION' style={{marginTop: 16}}/>

          <Description label='STREET ADDRESS' value={'124, Blvd Street'}/>

          <Description label='STATE' value={'TEXAS'}/>

          <Description label='CITY' value={'Houston'}/>

          

          <Description label='ZIP CODE' value={'75601'}/>

        </View>

        <View style={{flexDirection: 'row'}}>
          <Button title='Edit Profile' style={styles.button}/>

          <Button 
            title='My Resume' 
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