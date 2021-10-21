import React, { useState, useCallback } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
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
import CustomModal from '../../Components/organisms/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { jobsListing, getJobList, getViewJob } from '../../redux/slices';
import Loader from '../../Components/atoms/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import ErrorModal from '../../Components/organisms/ErrorModal';
import NoData from '../../Components/organisms/NoData';

const JobPostedList = ({ navigation }) => {

  const [lang, setLang] = useState('eng');
  const [dropDown, setDropDown] = useState(false);
  const [mangaeJobIcons, setManageJobIcons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [params, setParams] = useState('');
  const [loader, setLoader] = useState(false)
  const [pageNo, setPageNo] = useState(1);
  const [deleteJobId, setDeleteJobId] = useState('');
  const [deletedConfirmModal, setDeletedConfirmModal] = useState(false);
  const [editJobModal, setEditJobModal] = useState(false);
  const [updateJobItems, setUpdateJobItems] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const dispatch = useDispatch();

  const jobs = useSelector(jobsListing);

  const myJobs = async () => {
    setLoader(true)

    if (jobs != undefined) {
      setLoader(false)
    }

    try {
      var apiResponse = await apiCall(
        ApiConstants.methods.GET,
        ApiConstants.endPoints.EmployerJobs,
      );

      if (apiResponse.isAxiosError == true) {
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setLoader(false);
        setErrorModal(true);
      }
      else {
        dispatch(getJobList(apiResponse.data.response.data))
        setLoader(false)
      }
    }
    catch (error) {
      console.log('Catch Body:', error);
      setLoader(false)
    }
  }

  const viewJob = async (jobId) => {
    setLoader(true)

    let queryParams = {
      id: jobId
    }

    try{
      var apiResult = await apiCall(
        ApiConstants.methods.GET,
        ApiConstants.endPoints.ViewJob,
        {},
        queryParams
      )

      if(apiResult.isAxiosError == true){
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        errorModal(true)
        setLoader(false)
      }
      else{
        dispatch(getViewJob(apiResult.data.response.data[0]))
        navigation.navigate(Constants.screen.ViewJob)
        setLoader(false)
      }
    }
    catch(error){
      console.log('Catch Body:',error)
      setLoader(false)
    }
  }
  

  // const viewJob = async (jobId) => {
  //   setLoader(true)

  //   try {
  //     var apiResult = await Axios.get(`${ApiConstants.baseUrl}${ApiConstants.endPoints.ViewJob}`, {params: {id: jobId}})

  //     if (apiResult.isAxiosError == true) {
  //       console.log('Axios error')
  //       alert(apiResponse.response.data.error.messages.map(val => val+'\n'))
  //       setLoader(false)
  //     }
  //     else {
  //       console.log('Api Result:',apiResult.data.response.data)
  //       dispatch(getViewJob(apiResult.data.response.data[0]))
  //       navigation.navigate(Constants.screen.ViewJob)
  //       setLoader(false)
  //     }
  //   }
  //   catch (error) {
  //     console.log('Catch Body:', error);
  //     setLoader(false)
  //   }
  // }



  const deleteJob = async (id) => {
    setLoader(true)

    let body = {
      is_block: '1',
      id: id
    }

    try {
      var apiResponse = await apiCall(
        ApiConstants.methods.POST,
        ApiConstants.endPoints.DeleteJob,
        body
      );

      if (apiResponse.isAxiosError == true) {
        console.log('Delete Job Axios error')
        alert(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setLoader(false)
        setModalVisible(false)
      }
      else {
        setLoader(false)
        setModalVisible(false)
        setDeletedConfirmModal(true)
      }
    }
    catch (error) {
      console.log('Catch Body:', error);
      setLoader(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      myJobs();
      setPageNo(1)
    }, [])
  )

  if (loader == true) {
    return (
      <Loader />
    )
  }

  const jobComponent = ({ item }) => {

    return (
      <View style={styles.jobContainer}>

        <View style={styles.jobImageContainer}>
          {
            item.image_urls ?
             <Image source={{uri: item.image_urls['3x']}} style={{...StyleSheet.absoluteFillObject}}/>
            :
            <Image resizeMode='contain' source={require('../../../assets/logo.png')} style={styles.jobImage}/>
          }
        </View>

        {/* <View style={styles.jobImageContainer}>
          <Image
            resizeMode='contain'
            source={item.image_urls ? { uri: item.image_urls['3x'] } : require('../../../assets/logo.png')}
            style={styles.jobImage}
          />
        </View> */}

        <View style={{ marginLeft: 8, flex: 1 }}>

          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={{ color: colors.darkGray, fontSize: 16, fontWeight: 'bold' }}
          >
            {item.title}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>{item.description}</Text>

          <View style={styles.jobIconsContainer}>
            {
              mangaeJobIcons == true ?
                <>
                  <TouchableOpacity 
                    style={{ alignItems: 'center' }} 
                    onPress={() => {
                      viewJob(item.id)
                    }}
                  >
                    <Ionicons name='eye' size={18} color={colors.buttonColor} />
                    <Text style={{ fontSize: 10 }}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.icons} onPress={() => {
                    setEditJobModal(true)
                    setParams(item)
                  }}>
                    <MaterialCommunityIcons name='file-document-edit' size={18} color={colors.primaryColor} />
                    <Text style={{ fontSize: 10 }}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.icons} onPress={() => {
                    setModalVisible(!modalVisible)
                    setDeleteJobId(item.id)
                  }}
                  >
                    <MaterialCommunityIcons name='delete' size={18} color='red' />
                    <Text style={{ fontSize: 10 }}>Delete</Text>
                  </TouchableOpacity>
                </>
                : null}

            <Button
              title='Manage Jobs'
              titleStyle={{ fontSize: 12 }}
              style={styles.manageJobButton}
              onPress={() => setManageJobIcons(!mangaeJobIcons)}
            />

          </View>

        </View>

      </View>
    )
  }


  return (
    jobs == undefined || jobs.length == 0 ?
    <NoData />
    :
    <View style={{ flex: 1 }}>

      <CustomModal 
        isVisible={modalVisible}
        imageSource={require('../../../assets/diagnostic.png')}
        message={'Are you sure you want to delete this job?'}
        onPressYes={() => {
          setModalVisible(true)
          deleteJob(deleteJobId)
        }}
        onPressNo={() => setModalVisible(false)}
      />

      <CustomModal 
        isVisible={editJobModal}
        imageSource={require('../../../assets/diagnostic.png')}
        message={'Are you sure you want to edit this job?'}
        onPressYes={() => {
          navigation.navigate(Constants.screen.UpdateJob, {params})
          setEditJobModal(false)
        }}
        onPressNo={() => setEditJobModal(false)}
      />

      <CustomModal
        type = 'confirmation' 
        isVisible={deletedConfirmModal}
        imageSource={require('../../../assets/checked.png')}
        message={'Job is deleted.'}
        buttonText={'Ok'}
        onPressOk={() => {
          setDeletedConfirmModal(false)
          navigation.navigate(Constants.screen.EmployerDashboard)
        }}
      />

      <ErrorModal 
        isVisible={errorModal}
        message={errorMessage}
        onPress={() => setErrorModal(false)}
      />      

      <StatusBar backgroundColor={colors.primaryColor} />

      <ImageBackground source={require('../../../assets/grayBg.jpg')} style={styles.bg}>

        <HeaderImage style={{ height: Dimensions.get('window').height * 0.23 }} />

        <View style={{ position: 'absolute', width: '100%', padding: 9 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <MenuIcon onPress={() => navigation.openDrawer()} />

            <ScreenTitle title='My Jobs' />

            <LanguagePicker
              viewStyle={{ width: 80 }}
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
              titleStyle={{ fontSize: 16 }}
            />

            <Button
              title='Active Jobs'
              style={styles.headerButton}
              titleStyle={{ fontSize: 16 }}
            />

            <Button
              title='In Active Jobs'
              style={{...styles.headerButton, flex: 0.31}}
              titleStyle={{ fontSize: 16 }}
            />

          </View>

        </View>


      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={jobs}
          renderItem={jobComponent}
          keyExtractor={(key, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={myJobs}
            />
          }
        />
      </View>

      {/* pagination */}

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
            <TouchableOpacity>
              <AntDesign name='left' color={colors.primaryColor} size={25} />
            </TouchableOpacity>

            <Text style={{ fontWeight: 'bold', fontSize: 20, marginHorizontal: 5 }}>{pageNo}</Text>

            <TouchableOpacity 
            >
              <AntDesign name='right' color={colors.primaryColor} size={25} />
            </TouchableOpacity>

          </View> */}

        <CompanyLabelCard />

      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  headerButtonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerButton: {
    flex: 0.3,
    backgroundColor: colors.primaryColor,
    borderRadius: 20
  },
  jobContainer: {
    // margin: 10,
    // marginRight: 0,
    marginBottom: 10,
    // marginTop: 10,
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 10,
    backgroundColor: colors.white,
    flexDirection: 'row'
  },
  manageJobButton: {
    borderRadius: 20,
    marginLeft: 6,
    backgroundColor: colors.darkGray,
    height: Dimensions.get('window').height * 0.05,
    width: 90
  },
  jobIconsContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icons: {
    marginLeft: 6,
    alignItems: 'center'
  },
  jobImage: {
    height: 100,
    width: 100,
  },
  jobImageContainer: {
    overflow: 'hidden',
    height: 120,
    width: 120,
    borderRadius: 15,
    backgroundColor: colors.primaryColorLight,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default JobPostedList;