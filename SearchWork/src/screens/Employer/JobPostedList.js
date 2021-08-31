import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import HeaderImage from '../../Components/atoms/HeaderImage';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import Button from '../../Components/molecules/Button';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';

const JobPostedList = ({navigation}) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [mangaeJobIcons, setManageJobIcons] = useState(false);


  return(
    <View style={{flex: 1}}>
      
      <StatusBar backgroundColor={colors.primaryColor} />
      
      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{height: Dimensions.get('window').height * 0.23}}/>

        <View style={{ position: 'absolute', width: '100%', padding: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <MenuIcon onPress={() => navigation.openDrawer()}/>

              <ScreenTitle title='My Jobs' />
            
            <LanguagePicker
              viewStyle={{width: 80}}
              containerStyle={{ flex: 1 }}
              value={lang}
              setValue={setLang}
              open={dropDown}
              setOpen={setDropDown}
            />

          </View>

          <View style={styles.headerButtonContainer}>

            <Button 
              title='All Jobs'
              style={styles.headerButton}
              titleStyle={{fontSize: 16}}
            />

            <Button 
              title='Active Jobs' 
              style={styles.headerButton} 
              titleStyle={{fontSize: 16}}
            />

            <Button 
              title='Pause Jobs' 
              style={styles.headerButton} 
              titleStyle={{fontSize: 16}}
            />

          </View>

        </View>

        <View style={styles.jobContainer}>

          <Image source={require('../../../assets/people.jpg')} style={styles.jobImage}/>
          
          <View style={{marginLeft: 8, flex: 1}}>
            
            <Text style={{color: colors.darkGray, fontSize: 18, fontWeight: 'bold'}}>Petrol Pump Filler</Text>
            <Text ellipsizeMode='tail' numberOfLines={3} style={{fontSize: 12}}>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
            </Text>

            <View style={styles.jobIconsContainer}>
              {
                mangaeJobIcons == true ?
              <>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate(Constants.screen.IndividualJob)}>
                <Ionicons name='eye' size={18} color={colors.buttonColor}/>
                <Text style={{fontSize: 10}}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate(Constants.screen.UpdateJob)}>
                <MaterialCommunityIcons name='file-document-edit' size={18} color={colors.primaryColor}/>
                <Text style={{fontSize: 10}}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.icons}>
                <MaterialCommunityIcons name='delete' size={18} color='red'/>
                <Text style={{fontSize: 10}}>Delete</Text>
              </TouchableOpacity>
              </>
            : null}

              <Button 
                title='Manage Jobs'
                titleStyle={{fontSize: 12}}
                style={styles.manageJobButton}
                onPress={() => setManageJobIcons(!mangaeJobIcons)}
              />

            </View>


          </View>

        </View>

        <CompanyLabelCard />

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  bg:{
    flex: 1,
  },
  headerButtonContainer:{
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerButton:{
    flex: 0.3, 
    backgroundColor: colors.primaryColor, 
    borderRadius: 20
  },
  jobContainer:{
    marginTop: 10,
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 10, 
    backgroundColor: colors.white,
    flexDirection: 'row'
  },
  manageJobButton:{
    borderRadius: 20, 
    marginLeft: 6, 
    backgroundColor: colors.darkGray, 
    height: Dimensions.get('window').height * 0.05, 
    width: 90
  },
  jobIconsContainer:{
    marginTop: 12,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  icons:{
    marginLeft: 6, 
    alignItems: 'center'
  },
  jobImage:{
    height: 120, 
    width: 120, 
    borderRadius: 15
  }
});

export default JobPostedList;