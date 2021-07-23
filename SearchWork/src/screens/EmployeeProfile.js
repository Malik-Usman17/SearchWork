import React, {useState} from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import colors from '../Constants/colors';
import Heading from '../Components/atoms/Haeding';
import Button from '../Components/molecules/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import ProfilePicture from '../Components/atoms/ProfilePicture';
import ProfileTextField from '../Components/molecules/ProfileTextField';


const EmployeeProfile = () => {
    const [dropDown, setDropDown] = useState(false);
    const [lang, setLang] = useState('eng');

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

        </ImageBackground>

        <View style={styles.infoContainer}>

          <Heading title='MY INFORMATION' />

          <ProfileTextField 
            title='FULL NAME'
            value='John Doe'
            editable={false} 
          />

          <ProfileTextField 
            title='CONTACT NO'
            value={'+(1) 142 111 54688'}
            editable={false} 
          />

          <ProfileTextField 
            title='GENDER'
            value={'MALE'}
            editable={false}  
          />

          <ProfileTextField 
            title='DATE OF BIRTH'
            value={'5-Jan-1994'}
            editable={false}  
          />

          <ProfileTextField 
            title='EMAIL'
            value={'johndoe@gmail.com'}
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
            value={'124, Blvd Street'}
            editable={false}  
          />

          <ProfileTextField 
            title='STATE'
            value={'Texas'}
            editable={false}  
          />

          <ProfileTextField 
            title='CITY'
            value={'Houston'}
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