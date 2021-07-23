import React from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, TextInput, StyleSheet, StatusBar, Dimensions } from 'react-native';
import colors from '../Constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const JobCategoryList = () => {

  const jobCategoryData = [{'category': 'Petrol Pump Filler'}, {'category': 'Dog Walk'}, {'category': 'Carpenter'}, {'category': 'Gardener'}]

  const jobCategory = ({item}) => {
    return(
      <TouchableOpacity style={styles.categoryTypeContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      
      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../assets/grayBg.jpg')} style={styles.bg}>

        <View style={styles.CategoryContainer}>

          <TouchableOpacity 
            style={{alignSelf: 'flex-end', marginRight: 3}}
          >
            <Entypo 
              name='squared-cross' 
              size={20} 
              color={colors.buttonColor}   
            />
          </TouchableOpacity>

          <View style={styles.searchFieldConatiner}>

            <TextInput
              style={{ flex: 1, marginLeft: 10 }}
              placeholder='Search Job'
            />

            <View style={{ flex: 0.4, height: 40, alignItems: 'center', justifyContent: 'space-evenly', padding: 10, backgroundColor: colors.yellow, flexDirection: 'row', borderRadius: 20 }}>
              <FontAwesome name='search' size={16} />
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Find Job</Text>
            </View>

          </View>

          {/* <View style={styles.categoryTypeContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.primaryColor }}>Petrol Pump Filler</Text>
          </View>

          <View style={styles.categoryTypeContainer}>
            <Text style={{ fontWeight: 'bold', color: colors.primaryColor }}>Petrol Pump Filler</Text>
          </View> */}

          <FlatList 
            data={jobCategoryData}
            renderItem={jobCategory}
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity>
            <Text   style={{marginTop: 6, color: colors.buttonColor, fontWeight: 'bold', fontSize: 16, textDecorationLine: 'underline'}}>See All</Text>
          </TouchableOpacity>

        </View>

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CategoryContainer: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10
  },
  categoryTypeContainer: {
    marginVertical: 7,
    elevation: 5,
    // position: 'absolute',
    // top: 200,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 15,
    width: Dimensions.get('window').width * 0.9
  },
  searchFieldConatiner: {
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: colors.primaryColorLight
  },
  categoryText:{
    fontWeight: 'bold', 
    fontSize: 16, 
    color: colors.primaryColor
  }
});

export default JobCategoryList;