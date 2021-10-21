import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const JobItemCard = () => {
  return (
    <View style={styles.jobContainer}>
      
      <View></View>
    </View>
  )
}

export default JobItemCard

const styles = StyleSheet.create({
  jobContainer: {
    marginBottom: 10,
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 10,
    backgroundColor: colors.white,
    flexDirection: 'row'
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


// const jobComponent = ({ item }) => {

//   return (
//     <View style={styles.jobContainer}>

//       <View style={styles.jobImageContainer}>
//         {
//           item.image_urls ?
//            <Image source={{uri: item.image_urls['3x']}} style={{...StyleSheet.absoluteFillObject}}/>
//           :
//           <Image resizeMode='contain' source={require('../../../assets/logo.png')} style={styles.jobImage}/>
//         }
//       </View>

//       {/* <View style={styles.jobImageContainer}>
//         <Image
//           resizeMode='contain'
//           source={item.image_urls ? { uri: item.image_urls['3x'] } : require('../../../assets/logo.png')}
//           style={styles.jobImage}
//         />
//       </View> */}

//       <View style={{ marginLeft: 8, flex: 1 }}>

//         <Text
//           ellipsizeMode='tail'
//           numberOfLines={1}
//           style={{ color: colors.darkGray, fontSize: 16, fontWeight: 'bold' }}
//         >
//           {item.title}
//         </Text>
//         <Text ellipsizeMode='tail' numberOfLines={3} style={{ fontSize: 12 }}>{item.description}</Text>

//         <View style={styles.jobIconsContainer}>
//           {
//             mangaeJobIcons == true ?
//               <>
//                 <TouchableOpacity 
//                   style={{ alignItems: 'center' }} 
//                   onPress={() => {
//                     viewJob(item.id)
//                   }}
//                 >
//                   <Ionicons name='eye' size={18} color={colors.buttonColor} />
//                   <Text style={{ fontSize: 10 }}>View</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.icons} onPress={() => {
//                   setEditJobModal(true)
//                   setParams(item)
//                 }}>
//                   <MaterialCommunityIcons name='file-document-edit' size={18} color={colors.primaryColor} />
//                   <Text style={{ fontSize: 10 }}>Edit</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.icons} onPress={() => {
//                   setModalVisible(!modalVisible)
//                   setDeleteJobId(item.id)
//                 }}
//                 >
//                   <MaterialCommunityIcons name='delete' size={18} color='red' />
//                   <Text style={{ fontSize: 10 }}>Delete</Text>
//                 </TouchableOpacity>
//               </>
//               : null}

//           <Button
//             title='Manage Jobs'
//             titleStyle={{ fontSize: 12 }}
//             style={styles.manageJobButton}
//             onPress={() => setManageJobIcons(!mangaeJobIcons)}
//           />

//         </View>

//       </View>

//     </View>
//   )
// }
