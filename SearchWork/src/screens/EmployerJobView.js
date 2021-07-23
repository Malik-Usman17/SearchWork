import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import HeaderImage from '../Components/atoms/HeaderImage';
import MenuIcon from '../Components/atoms/MenuIcon';
import LanguagePicker from '../Components/organisms/LanguagePicker';
import colors from '../Constants/colors';
import ScreenTitle from '../Components/atoms/ScreenTitle';
import HeaderRowContainer from '../Components/molecules/HeaderRowContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Divider from '../Components/atoms/Divider';
import IconText from '../Components/atoms/IconText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../Components/molecules/Button';
import Foundation from 'react-native-vector-icons/Foundation';
import CompanyLabelCard from '../Components/atoms/CompanyLabelCard';

const EmployerJobView = () => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);

  return(
    <ScrollView style={{backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>

      <StatusBar backgroundColor={colors.primaryColor}/>

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={styles.bg}>

        <View style={{height: 835}}>

      <HeaderImage style={{height: Dimensions.get('window').height * 0.23}}/>

        <HeaderRowContainer>

          <MenuIcon />

          <ScreenTitle title='Job View'/>

          <LanguagePicker
            viewStyle={{width: 80}}
            containerStyle={{ flex: 1 }}
            value={lang}
            setValue={setLang}
            open={dropDown}
            setOpen={setDropDown}
          />

        </HeaderRowContainer>

        <View style={styles.JobContainer}>
            
            <Image source={require('../../assets/people.jpg')} style={styles.image} />

            <TouchableOpacity style={{ position: 'absolute', top: 12, left: 12 }}>
              <Ionicons name='arrow-back-circle' size={30} color={colors.darkGray}/>
            </TouchableOpacity>

            <View style={styles.jobTitleContainer}>
          
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

              <IconText style={{alignItems: 'center'}} text='Designation' textStyle={styles.smallInfoHeading}>
                <MaterialIcons name='person' size={25} color={colors.primaryColor}/>
              </IconText>

              <Text style={{marginLeft: 35, marginTop: 2, color: colors.gray}}>Petrol Pump Person</Text>

              <Divider style={{marginLeft: 15, marginTop: 15, width: '90%'}}/>

              <IconText style={{alignItems: 'center'}} text='Location' textStyle={styles.smallInfoHeading}>
                <Ionicons name='location-sharp' size={25} color={colors.primaryColor}/>
              </IconText>

              <Text style={{marginLeft: 35, marginTop: 2, color: colors.gray}}>124, Blvd Street SW, Texas, Houston</Text>

              
              
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
              
              <TouchableOpacity style={{marginLeft: 35}}>
                <Text style={{fontSize: 12, color: colors.buttonColor}}>Click here to view full address</Text>
              </TouchableOpacity>
              <MaterialIcons name='location-city' size={20} color={colors.primaryColor} style={{marginLeft: 3}}/>

            </View>

            <Divider style={{marginLeft: 15, marginTop: 15, width: '90%'}}/>

            <IconText style={{alignItems: 'center', marginLeft: 7}} text='Hourly Pay' textStyle={{...styles.smallInfoHeading, marginLeft: 6}}>
                <Foundation name='dollar' size={25} color={colors.primaryColor}/>
            </IconText>

            <Text style={{marginLeft: 35, marginTop: 2, color: colors.gray, marginBottom: 10}}>10</Text>

          </View>

          </View>

          <CompanyLabelCard />
          

          </ImageBackground>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg:{
    //flex: 1
    height: Dimensions.get('window').height + 80
  },
  JobContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 15,
    marginHorizontal: 15,
    bottom: 95,
  },
  jobTitleContainer:{
    backgroundColor: colors.white, 
    padding: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    elevation: 20
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  smallInfoHeading:{
    color: 'black', 
    fontWeight: 'bold', 
    fontSize: 14
  }
})

export default EmployerJobView;