import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import CompanyLabelCard from '../../Components/atoms/CompanyLabelCard';
import HeaderImage from '../../Components/atoms/HeaderImage';
import Loader from '../../Components/atoms/Loader';
import MenuIcon from '../../Components/atoms/MenuIcon';
import ScreenTitle from '../../Components/atoms/ScreenTitle';
import Button from '../../Components/molecules/Button';
import CustomModal from '../../Components/organisms/CustomModal';
import ErrorModal from '../../Components/organisms/ErrorModal';
import LanguagePicker from '../../Components/organisms/LanguagePicker';
import NoData from '../../Components/organisms/NoData';
import colors from '../../Constants/colors';
import Constants from '../../Constants/Constants.json';
import { getJobList, getViewJob, jobsListing } from '../../redux/slices';
import { apiCall } from '../../service/ApiCall';
import ApiConstants from '../../service/ApiConstants.json';
import JobItemCard from '../../Components/organisms/JobItemCard';
import commonStyles from '../../commonStyles/commonStyles';
import SmallButton from '../../Components/atoms/SmallButton';


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
  const [allJob, setAllJob] = useState(true);
  const [activeJob, setActiveJob] = useState(false);
  const [inActiveJob, setInactiveJob] = useState(false);


  const dispatch = useDispatch();

  const jobsObj = useSelector(jobsListing);
  const jobs = jobsObj?.data;
  const pagination = jobsObj?.pagination;
 
  const activeJobsData = jobs?.filter(val => val.is_block == 0)


  const inActiveJobsData = jobs?.filter(val => val.is_block == 1)
 
  

  function dataList() {
    if(inActiveJob == true){
      return inActiveJobsData
      //return inActiveJobList
    }
    else if(activeJob == true){
      return activeJobsData
    }
    else{
      return jobs
    }
  }


  const myJobs = async (pageNo) => {
    let queryParams = {
      page: pageNo
    }

    setLoader(true)

    if (jobsObj != undefined) {
      setLoader(false)
    }

    try {
      var apiResponse = await apiCall(
        ApiConstants.methods.GET,
        ApiConstants.endPoints.EmployerJobs,
        {},
        queryParams
      );

      if (apiResponse.isAxiosError == true) {
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setLoader(false);
        setErrorModal(true);
      }
      else {
        dispatch(getJobList(apiResponse.data.response))
        setLoader(false)
      }
    }
    catch (error) {
      console.log('Catch Body:', error);
      setLoader(false)
    }
  }

  
  const myJobsPagination = async (pageNo, loaderValue) => {
    let queryParams = {
      page: pageNo
    }

    setLoader(loaderValue)

    try {
      var apiResponse = await apiCall(
        ApiConstants.methods.GET,
        ApiConstants.endPoints.EmployerJobs,
        {},
        queryParams
      );

      if (apiResponse.isAxiosError == true) {
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setLoader(!loaderValue);
        setErrorModal(true);
      }
      else {
        dispatch(getJobList(apiResponse.data.response))
        setLoader(!loaderValue)
      }
    }
    catch (error) {
      console.log('Catch Body:', error);
      setLoader(!loaderValue)
    }
  }

  const changeJobStatus = async (jobId, blockValue) => {

    setLoader(true)

    let body = {
      is_block: blockValue,
      id: jobId
    }

    try {
      var apiResponse = await apiCall(
        ApiConstants.methods.POST,
        ApiConstants.endPoints.JobStatus,
        body
      );

      if (apiResponse.isAxiosError == true) {
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setErrorModal(true);
      }
    }
    catch (error) {
      console.log('Catch Body:', error);
      setLoader(false)
    }
    finally{
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
        setErrorMessage(apiResponse.response.data.error.messages.map(val => val+'\n'))
        setErrorModal(true)
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
      myJobs(1);
    }, [])
  )

  if (loader == true) {
    return (
      <Loader />
    )
  }

  const jobComponent = ({ item }) => {

    return (
      <View style={commonStyles.jobCardContainer}>

        <View style={commonStyles.jobImageContainer}>
          {
            item.image_urls ?
             <Image source={{uri: item.image_urls['3x']}} style={{...StyleSheet.absoluteFillObject}}/>
            :
            <Image resizeMode='contain' source={require('../../../assets/logoGreen.png')} style={commonStyles.jobCardImage}/>
          }
        </View>

        <View style={{ marginLeft: 8, flex: 1 }}>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={commonStyles.jobCardTitle}
          >
            {item.title}
          </Text>

          <TouchableOpacity
            onPress={() => changeJobStatus(item.id, item.is_block == 0 ? 1 : 0)}
          >
          
            <FontAwesome
              name={item.is_block == 0 ? 'star' : 'star-o'} 
              size={20} 
              color={colors.darkGray}
            />
          </TouchableOpacity>
          
          </View>

          <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>
            {item.description}
          </Text>

          <View style={commonStyles.jobIconsContainer}>
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

  const paginationComponent = ({ item }) => {
    return(
      <TouchableOpacity 
        onPress={() => myJobsPagination(item, true) }
        style={{...styles.pagination, backgroundColor: pagination.current == item ? colors.primaryColor : colors.white}}>
        <Text style={{color: pagination.current == item ? colors.white : colors.black}}>
          {item}
        </Text>
      </TouchableOpacity>
    )
    
  }


  return (
    jobs == undefined || jobs?.length == 0 ?
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

            <SmallButton 
              title='All Jobs'
              style={{backgroundColor: allJob == true ? colors.white : colors.primaryColor}}
              titleStyle={{color: allJob == true ? colors.primaryColor : colors.white}}
              onPress={() => {
                setAllJob(true)
                setActiveJob(false)
                setInactiveJob(false)
              }}
            />

            <SmallButton 
              title='Active Jobs'
              style={{backgroundColor: activeJob == true ? colors.white : colors.primaryColor}}
              titleStyle={{color: activeJob == true ? colors.primaryColor : colors.white}}
              onPress={() => {
               // activeJobList()
                setAllJob(false)
                setActiveJob(true)
                setInactiveJob(false)
              }}
            />

            <SmallButton 
              title='In Active Jobs'
              style={{backgroundColor: inActiveJob == true ? colors.white : colors.primaryColor}}
              titleStyle={{color: inActiveJob == true ? colors.primaryColor : colors.white}}
              onPress={() => {
                setAllJob(false)
                setActiveJob(false)
                setInactiveJob(true)
              }}
            />

          </View>

        </View>


      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          // data={jobs}
          data={dataList()}
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

      <View style={{width: '100%', alignItems: 'center', marginVertical: 5}}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={pagination.pages}
          keyExtractor={(key, index) => index.toString()}
          renderItem={paginationComponent}
          horizontal
        />
      </View>

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
  manageJobButton: {
    borderRadius: 20,
    marginLeft: 6,
    backgroundColor: colors.darkGray,
    height: Dimensions.get('window').height * 0.05,
    width: 90
  },
  icons: {
    marginLeft: 6,
    alignItems: 'center'
  },
  pagination:{ 
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3, 
    borderRadius: 5, 
    borderWidth: 1,
    borderColor: colors.primaryColorLight
  }

});

export default JobPostedList;