import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import colors from '../../Constants/colors';
import Chips from '../atoms/Chips';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const JobCard = ({onPress}) => {
  return(
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      
      <View style={{borderTopLeftRadius: 12, backgroundColor: colors.primaryColorLight, borderBottomRightRadius: 55, height: 65, width: 190, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../../../assets/logo.png')} resizeMode='contain' style={{height: 55, width: 120}}/>
      </View>
     
     <View style={{padding: 12}}>
     
      <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.primaryColor}}>Gardener</Text>
      
      <Text ellipsizeMode='tail' numberOfLines={3} style={{fontSize: 12}}>
        In publishing and graphic design, demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
      </Text>

      <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        
        <Chips title='Published'>
          <Feather name='gift' size={17} color={colors.gray}/>
        </Chips>

        <Chips title='Full-Time'>   
          <AntDesign name='clockcircle' size={17} color={colors.gray}/>
        </Chips>

        <Chips title='Part-Time'>
          <AntDesign name='clockcircle' size={17} color={colors.gray}/>
        </Chips>

      </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Container:{
    backgroundColor: colors.white, 
    borderRadius: 12, 
    width: 300, 
    height: 207
  }
})

export default JobCard;
