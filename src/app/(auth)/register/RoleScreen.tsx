import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Alert, ImageBackground, Image, Dimensions,Button } from 'react-native'
import React, { useState } from 'react'
import { Mails, LockKeyhole, MoveRight, Key } from 'lucide-react-native';
import { Redirect, router } from 'expo-router';
import UserRegisterDetails from './UserRegisterDetails';



//firebase auth...


import { useRouter } from 'expo-router';



//reanimation
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');






import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import index from "../../(main)/farmer/(tabs)";

export default function RoleSelectionScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const router = useRouter()
  const selectRole = async (role) => {
    const user = auth.currentUser;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        role,
      });

      switch (role) {
        case "Farmer":
          router.push("../../(main)/farmer/(tabs)");
          break;
        case "Consumer":
          router.push("../../(main)/consumer/(tabs)");
          break;
        case "Admin":
          router.push("../../(main)/admin");
          break;
      }
    } catch (error) {
      alert("Error selecting role: " + error.message);
    }
  };


      //reanimation...........
    
      const speed = 100; // Adjust speed here
      const diagonalDistance = Math.sqrt(width ** 2 + height ** 2);
      const duration = (diagonalDistance / speed) * 1000; // Duration in milliseconds
    
      React.useEffect(() => {
        // Animate horizontally and vertically with finite time per cycle
        translateX.value = withRepeat(
          withTiming(100, { duration }), // Complete horizontal movement in 4 seconds
          -1, // Infinite repetitions
          true // Reverse direction on each cycle
        );
    
        translateY.value = withRepeat(
          withTiming(100, { duration }), // Complete vertical movement in 4 seconds
          -1, // Infinite repetitions
          true // Reverse direction on each cycle
        );
      }, []);
    
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      }));



  return (
   
    <View style={styles.container}>
      <Animated.View style={[styles.heroContainer, animatedStyle]}>
        <Image source={require('../../../assets/images/loginbg.png')} style={styles.image} />


      </Animated.View>

      <View style={styles.loginContainer}>
        {/* <Camera color="red" size={48} /> */}
        <View style={styles.topHeading}>
          <Text style={styles.helloTxt}>Hi,</Text>
          <Text style={styles.createAcc}>Enter Your Details</Text>
        </View>
        <View style={styles.Rolecontainer}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity></TouchableOpacity>

      <TouchableOpacity style={styles.btncontainer} onPress={() => selectRole("Farmer")} >
        <Text style={{fontSize:22}}>Farmer</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.btncontainer}   onPress={() => selectRole("Consumer")} >
      <Text  style={{fontSize:22}}>Consumer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btncontainer}   onPress={() => selectRole("Admin")} >
      <Text style={{fontSize:22}}>Admin</Text>
      </TouchableOpacity>

    </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#AFF1E5'
},
loginContainer: {
    position: 'relative',
    display: 'flex',
    height: '80%',
    backgroundColor: '#28AC60',

    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    margin: 0


},
heroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
 marginLeft:50

  },
topHeading: {
    width: "100%",
    display: "flex",
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5
},
helloTxt: {
    fontSize: 32,
    fontWeight: '500',
    color: 'black',
    marginTop: 19,

    fontFamily: 'archivo'
},
createAcc: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'archivo',
    color: 'white'
},
  Rolecontainer: {
    flex: 1,
    alignContent:'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight:'600',
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width:"200%",
    height:"260%",
    resizeMode:'cover'
  },
  btncontainer:{
    margin:10,
    height:80,
    width:350,
    backgroundColor:'#c2efea',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  }
});

