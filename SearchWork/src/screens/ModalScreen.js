// import React, { useState } from "react";
// import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

// const ModalScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     backgroundColor: 'pink'
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "green",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 150
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

//export default ModalScreen;

import React, { useState } from "react";
import {Text, Button, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Constants from '../Constants/Constants.json'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "../Constants/colors";
//import Button from "../Components/molecules/Button";


function ModalScreen({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible} animationIn='fadeInRightBig' animationOut='fadeOutLeftBig'>
        
        <View style={styles.modalContainer}>
          
          <Image source={require('../../assets/diagnostic.png')} resizeMode='contain' style={styles.icon}/>
          
          <Text style={styles.modalText}>Are You Sure You Want To Delete This</Text>
        
        {/* <View style={styles.buttonContainer}> */}
          
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity >

          {/* <TouchableOpacity
            style={{...styles.button, backgroundColor: colors.buttonColor}}
            onPress={() => setModalVisible(false)} 
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity> */}

        {/* </View> */}

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer:{
    width: 300, 
    alignSelf: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    borderRadius: 15, 
    padding: 9
  },
  modalText:{
    fontSize: 15, 
    fontWeight: 'bold', 
    bottom: 12
  },
  icon:{
    height: 60, 
    width: 60, 
    bottom: 30
  },
  buttonContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: 15, 
    paddingHorizontal: 10, 
    paddingBottom: 5
  },
  button:{
    backgroundColor: colors.primaryColor, 
    width: 100, 
    paddingVertical: 8, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  }
});

export default ModalScreen;