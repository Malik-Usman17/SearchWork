import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar, ColorPropType } from 'react-native';
import HeaderImage from '../Components/atoms/HeaderImage';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import Logo from '../Components/atoms/Logo';
import FixedContainer from '../Components/molecules/FixedContainer';
import MenuIcon from '../Components/atoms/MenuIcon';
import colors from '../Constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Divider from '../Components/atoms/Divider';
import IconText from '../Components/atoms/IconText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../Components/molecules/Button';
import CompanyLabelCard from '../Components/atoms/CompanyLabelCard';


const IndividualJob = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: colors.lightGray, flex: 1 }} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>
      
      <View style={styles.screenContainer}>
        <HeaderImage />

        <View style={{ position: 'absolute', width: '100%', padding: 15, flex: 1 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              <MenuIcon />
              <Logo />
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

          <View style={styles.JobContainer}>
            
            <Image source={require('../../assets/people.jpg')} style={styles.image} />

            <Ionicons name='arrow-back-circle' size={30} style={{ position: 'absolute', top: 12, left: 12 }} color={colors.darkGray} />

            <View style={{backgroundColor: colors.white, padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 30}}>
              
              <Text style={{fontSize: 22, fontWeight: 'bold', color: colors.primaryColor}}>Petrol Pump Filler</Text>
              
              <FontAwesome
                name="bookmark"
                color={colors.primaryColor}
                size={26}
              />

            </View>

            <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'space-between' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Ionicons name='document-text-sharp' size={25} color={colors.primaryColor} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5 }}>Job Description</Text>

              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                
                <View style={{flexDirection: 'row'}}>
                  <Text style={{ marginRight: 2, color: colors.gray }}>No of Posts:</Text>
                  <Text style={{fontWeight: 'bold'}}>16</Text>
                </View>
                
                <Ionicons name='people' size={25} color={colors.primaryColor} style={{marginLeft: 3}}/>

              </View>

              

            </View>

              <Text style={{paddingLeft: 15, paddingRight: 15}}>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
              </Text>

              <Divider style={{marginLeft: 15, marginTop: 15, width: '90%'}}/>

              <IconText style={{alignItems: 'center'}} text='Designation' textStyle={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
                <MaterialIcons name='person' size={25} color={colors.primaryColor}/>
              </IconText>

              <Text style={{marginLeft: 35, marginTop: 2, color: colors.gray}}>Petrol Pump Person</Text>

              <Divider style={{marginLeft: 15, marginTop: 15, width: '90%'}}/>

              <IconText style={{alignItems: 'center'}} text='Location' textStyle={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                <Ionicons name='location-sharp' size={25} color={colors.primaryColor}/>
              </IconText>

              <Text style={{marginLeft: 35, marginTop: 2, color: colors.gray}}>124, Blvd Street SW, Texas, Houston</Text>
              
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
              
              <TouchableOpacity style={{marginLeft: 35}}>
                <Text style={{fontSize: 12, color: colors.buttonColor}}>Click here to view full address</Text>
              </TouchableOpacity>
              <MaterialIcons name='location-city' size={20} color={colors.primaryColor} style={{marginLeft: 3}}/>

            </View>


          <View style={{flexDirection: 'row', marginTop: 30}}>
            
            <Button 
              title='Apply'
              style={styles.button}/>
            
            <Button
              style={styles.saveButton}
              titleStyle={{color: 'black'}} 
              title='Save Job'
              iconName='bookmark'
              iconColor='black'  
            />

          </View>

          </View>

          </View>
        </View>

        <CompanyLabelCard />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  JobContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    marginTop: 15,
    //marginBottom: 40
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  screenContainer:{
    backgroundColor: colors.lightGray, 
    height: 835
  },
  button:{
    flex: 1, 
    height: Dimensions.get('screen').height * 0.08, 
    borderBottomLeftRadius: 40, 
    borderRadius: 0
  },
  saveButton:{
    flex: 1,
    backgroundColor: colors.yellow, 
    height: Dimensions.get('screen').height * 0.08, 
    //borderBottomLeftRadius: 40, 
    borderRadius: 0,
    borderBottomRightRadius: 40
  },
})

export default IndividualJob;