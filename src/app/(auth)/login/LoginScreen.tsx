import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert ,TouchableOpacity, Dimensions ,Image} from "react-native";
import { auth, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import FarmerIndex from "../../(main)/farmer/(tabs)/FarmerIndex";
import ConsumerIndex from "../../(main)/consumer/ConsumerIndex";
import AdminIndex from "../../(main)/admin/AdminIndex";
import {  Mails, LockKeyhole,MoveRight,Key } from 'lucide-react-native';

//firebase auth...
import {createUserWithEmailAndPassword, sendEmailVerification, signOut} from 'firebase/auth'

import { useRouter } from 'expo-router';

//reanimation
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');



const LoginScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  //authentication part
  const router=useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError,setUserError]=useState(false)
  const [userErrorMessage,setUserErrorMessage]=useState('')
  const [isLoading, setIsLoading] = useState(false);

//handlesubmit ...

const handleSubmit=async()=>{

 
  if (!email || !password ) {
    setUserError(true)
    setUserErrorMessage('All fields are required!');
    Alert.alert('Error', 'All fields are required!');

    return;
  }


  setIsLoading(true);
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const { role, emailVerified } = userData;

        // Ensure email is verified
        if (!emailVerified) {
          Alert.alert("Error", "Please verify your email before logging in.");
          setIsLoading(false);
          return;
        }

        // Redirect user based on their role
        if (role === "Farmer") {
          router.replace('../../(main)/farmer/(tabs)');
          alert('Succesfully Login with Farmer Account')
        } else if (role === "Consumer") {
          router.replace("../../(main)/consumer/(tabs)");
          alert('Succesfully Login with Consumer  Account')
        } else if (role === "Admin") {
          router.replace("../../(main)/admin");
          alert('Succesfully Login with Admin Account')
        } else {
          Alert.alert("Error", "Role not found.");
        }
      } else {
        Alert.alert("Error", "User not found in the database.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Login Error", error.message);
    }
    setIsLoading(false);
  };



  const speed = 100; // Adjust speed here
  const diagonalDistance = Math.sqrt(width ** 2 + height ** 2);
  const duration = (diagonalDistance / speed) * 1000; // Duration in milliseconds

  //reanimation...........
  React.useEffect(() => {
    // Animate horizontally and vertically with finite time per cycle
    translateX.value = withRepeat(
      withTiming(-100, { duration }), // Complete horizontal movement in 4 seconds
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
     
     <Animated.View style={[styles.heroContainer,animatedStyle]}>
      <Image source={require('../../../assets/images/loginbg.png')} style={styles.image} />
      

      </Animated.View>

      <View style={styles.loginContainer}>
        {/* <Camera color="red" size={48} /> */}
        <View style={styles.topHeading}>
        <Text style={styles.helloTxt}>Login,</Text>
        <Text style={styles.createAcc}>With Your Account</Text>
          
        </View>
        <View style={styles.inputContainer}>
          {/* //email */}
          <View style={styles.txtView}>
            <Mails color="#C5C5C5" />
            <TextInput placeholder='Enter Your email' style={styles.txtInput} onChangeText={setEmail} />
          </View>


          {/* password */}
          <View style={styles.txtView}>
          <LockKeyhole color="#C5C5C5" />
            <TextInput placeholder='Password' style={styles.txtInput}  secureTextEntry onChangeText={setPassword}/>
          </View>

          



          {/* continue btn */}
           <TouchableOpacity style={styles.continuebtn} onPress={handleSubmit}>
            <Text style={styles.continuetxt} >Continue  </Text>
            {/* router.replace('./UserRegisterDetails') */}
           </TouchableOpacity>
           {/* select postion */}
           <View style={styles.selectContainer}>
          <TouchableOpacity style={styles.login}  onPress={()=>router.replace('/(auth)/login/LoginScreen')}><Text style={styles.logintxt}>Login</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Register} onPress={()=>router.replace('/(auth)/register/RegisterScreen')}><Text style={styles.registertxt}>Register</Text></TouchableOpacity>
        </View>
        </View>
        
      </View>
      <View style={styles.logo}><Image source={require('../../../assets/images/greenlogo.png')} style={styles.logoImage}/></View>
    </View>
  )
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
    backgroundColor: '#28Ac60',

    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderTopLeftRadius: 25,  
    borderTopRightRadius: 25,
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
     margin:10
  },
  helloTxt: {
    fontSize: 32,
    fontWeight: '500',
    color: 'black',
    marginTop:19,
    
    fontFamily:'archivo'
  },
  createAcc: {
    fontSize:32,
    fontWeight: '800',
    fontFamily:'archivo',
    color:'white'
  },
  txtView: {
    backgroundColor: 'white',
    width: "85%",
    elevation: 1,
    borderRadius: 15,
    marginTop: '4%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  txtInput: {
    height: 50,
    width: 260,
    color: 'green',
    fontSize: 13,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',

    alignItems: 'center'
  },
continuebtn:{
  marginTop:'9%',
 height:38,
 width:120,
 backgroundColor:'#1E7F47',
 borderRadius:20,
 display:'flex',
 flexDirection:'row',
 justifyContent:'center',
 alignItems:'center',
 elevation:5
},
continuetxt:{
color:'white',
fontWeight:'600',
fontSize:16
},
selectContainer:{
  position:'relative',
  marginTop:'15%',
  backgroundColor:'white',
  width:250,
  height:40,
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  borderRadius:10,
  elevation:1
},
login:{
  
  
  



  backgroundColor:'#1E7F47',
   
  width:124,
  height:40,
 display:'flex',
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'center',
 borderRadius:10,
 elevation:5,

  
},
logintxt:{
  color:'white',
  fontWeight:'700',
  fontSize:16
},
registertxt:{
  // color:'white',
  // fontWeight:'700',
  // fontSize:16
},

Register:{
  width:124,
  height:40,
 display:'flex',
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'center',
},
image: {
  width:"200%",
  height:"260%",
  resizeMode:'cover'
},
logotitle:{
  display:'flex',
  width:'100%',
  justifyContent:'center',
  alignItems:'center',

},
logo:{
  position:'absolute',
  marginTop:-18,
  height:90,
  width: '10%',
  marginLeft:5
  
} ,
logoImage: {
  display: 'flex',
  height: '100%',
  width: '100%',
  borderRadius:15
},




})

export default LoginScreen;
