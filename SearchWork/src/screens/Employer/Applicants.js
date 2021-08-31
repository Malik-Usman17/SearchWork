import React from "react";
import { View, Text, FlatList, ImageBackground, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import colors from "../../Constants/colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Divider from '../../Components/atoms/Divider';
import Button from "../../Components/molecules/Button";
import Constants from '../../Constants/Constants.json';

const Applicants = ({navigation}) => {

  const applicants = [
    {name: 'John Doe'}, {name: 'Malik Muhammad Usman'},
    {name: 'Emma'}, {name: 'Bob MARLEY'}, {name: 'David Bob'}, {name: 'Alex John'},{name: 'Bob MARLEY'},
  ]

  const ApplicantsList = ({item}) => {
    return(
      <View style={styles.applicantContainer}>
        
        <FontAwesome name='user' size={30} color={colors.white} style={{marginLeft: 6}}/>
        
        <Text style={{marginLeft: 8, fontWeight: 'bold', fontSize: 18, color: colors.white, width: 160}}>{item.name}</Text>
        
        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.resumeButton} 
          onPress={() => navigation.navigate(Constants.screen.Resume)}>
          <Text style={{fontWeight: 'bold', padding: 8}}>View Resume</Text>
        </TouchableOpacity>
             
      </View>
    )
  }

  const Separator = () => {
    return(
      <Divider style={{width: '80%', alignSelf: 'center', marginVertical: 5}}/>
    )
  }

  return(
    <View style={{flex: 1}}>

      <StatusBar backgroundColor={colors.primaryColor}/>

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

    
        <View style={styles.container}>

         <TouchableOpacity style={{alignSelf: 'flex-end', margin: 5}} onPress={() => navigation.goBack()}>
            <AntDesign name='closesquare' size={22} color={colors.primaryColor}/>
         </TouchableOpacity>

             <Text style={styles.applicantName}>View Applicants</Text>
            
            <View style={styles.flatListContainer}>
             <FlatList
                showsVerticalScrollIndicator={false} 
                data={applicants}
                keyExtractor={(key, index) => index.toString()}
                renderItem={ApplicantsList}
                ItemSeparatorComponent={Separator}
              />
            </View>

        </View>

        <Button 
          title='See More'
          style={styles.seeMoreButton}
        />
       
      </ImageBackground>
      
    </View>
  )
}

const styles = StyleSheet.create({
  bg:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    borderRadius: 10,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width * 0.89,
    height: Dimensions.get('window').height * 0.71,
    alignItems: 'center'
  },
  applicantContainer:{
    flexDirection: 'row',
    marginVertical: 5, 
    padding: 8, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: colors.primaryColor,
  },
  applicantName:{
    fontSize: 20, 
    color: colors.primaryColor, 
    fontWeight: 'bold',  
    bottom: 15
  },
  resumeButton:{
    backgroundColor: colors.yellow, 
    borderRadius: 20, 
    marginLeft: 'auto', 
    marginRight: 4
  },
  flatListContainer:{
    width: Dimensions.get('window').width * 0.93,
    height: Dimensions.get('window').height * 0.6, 
  },
  seeMoreButton:{
    marginTop: 10,
    backgroundColor: colors.primaryColor, 
    padding: 5
  }
});

export default Applicants;