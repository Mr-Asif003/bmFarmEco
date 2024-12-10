import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Contact, HeartIcon } from 'lucide-react-native'
import { Dimensions } from 'react-native';
//firebase
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';



const Account = () => {
  const router=useRouter();

  //extracting name

  const [userName, setUserName] = useState("");
  const [state, setState] = useState("");
  const [address, setaddress] = useState("");
  const [moblie, setmobile] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));//to get collection from user i write this code
          if (userDoc.exists()) {
            const userData = userDoc.data();//to get data from user i write this code
            setUserName(userData.name || "User");
            setState(userData.state || 'User Address');
            setaddress(userData.Address);  
            setmobile(userDoc.phone);                               // Fallback to "User" if name is not set
          } else {
            console.warn("User data not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.warn("No authenticated user.");
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);





  return (
    <ScrollView style={styles.Container}>
       <View style={styles.Container2}>
      <View>
      <Image source={require('../../../../assets/images/greenlogo.png')} style={{height:50,width:50}}/>
      </View>

      </View>

      
      <View style={styles.userDetails}>
        <View style={styles.ditem}>
          <Text style={{fontWeight:'700',fontSize:23,color:'white'}}>{userName}</Text>
          <Text style={{fontWeight:'500',fontSize:21,color:'white'}}>Account No</Text>
        </View>
        <View style={styles.ditem}>
        <Text style={{fontWeight:'700',fontSize:18,color:'white'}}>{moblie}</Text>
        <Text style={{fontWeight:'500',fontSize:21,color:'white'}}>1836382722</Text>
        </View>
      </View>
      <View style={styles.view3}>
        <View style={styles.view3icon}>
          <View style={{padding:10}}>
            <Text style={{fontWeight:'500',fontSize:15,color:'white'}}>Weekly Consume</Text>
          </View>
          <View style={{paddingLeft:10,paddingTop:0,marginBottom:10}}>
          <Text style={{fontWeight:'500',fontSize:12,color:'white'}}>Total Spent</Text>
          <Text style={{fontWeight:'500',fontSize:23,color:'white'}}>XXXXX.XX</Text>
          </View>
          <View style={{paddingLeft:10}}>
          <Text style={{fontWeight:'500',fontSize:16,color:'white'}}>Data Obtained for </Text>
          <Text style={{fontWeight:'500',fontSize:12,color:'white'}}>7 last Days</Text>
          </View>
        </View>



        <View style={styles.view3icon}>
        <View style={{padding:10}}>
            <Text style={{fontWeight:'500',fontSize:15,color:'white'}}>Monthly Consume</Text>
          </View>
          <View style={{paddingLeft:10,paddingTop:0,marginBottom:10}}>
          <Text style={{fontWeight:'500',fontSize:12,color:'white'}}>Total Spent</Text>
          <Text style={{fontWeight:'500',fontSize:23,color:'white'}}>XXXXX.XX</Text>
          </View>
          <View style={{paddingLeft:10,marginTop:-10}}>
          <Text style={{fontWeight:'500',fontSize:12,color:'white'}}>Data Obtained for </Text>
          <Text style={{fontWeight:'500',fontSize:7,color:'white'}}>30 last Days</Text>
          </View>
        </View>

      </View>
        <View style={styles.view5}>
          <Image source={require('../../../../assets/images/sellinggraph.png')} style={{height:150,width:'100%'}}/>
        </View>

        <View style={styles.view5}>
         
         <View style={[styles.Addressitem,{marginTop:10}]}>
          <Text style={{fontWeight:'700',fontSize:13,color:'black'}}>Addresses of Delivery</Text>
          <Text style={{fontWeight:'800',fontSize:30,color:'black'}}>Home</Text>
          <Text style={{fontWeight:'700',fontSize:13,color:'black'}}>IIT Hyderabad</Text>
         </View>

         <View style={[styles.Addressitem,{marginTop:10}]}>
          <Text style={{fontWeight:'800',fontSize:17,color:'black'}}>Listed Products</Text>
          <Text style={{fontWeight:'500',fontSize:15,color:'black'}}>Product 1</Text>
          <Text style={{fontWeight:'500',fontSize:15,color:'black'}}>Product 2</Text>
          <Text style={{fontWeight:'500',fontSize:15,color:'black'}}>Product 3</Text>
      
         </View>
        </View>

        <View style={styles.view6}>
        <View style={[styles.ditem,{marginTop:10}]}>
          <Text style={{fontWeight:'700',fontSize:12,color:'black'}}>Total Spent on Today</Text>
          <Text style={{fontWeight:'500',fontSize:15,color:'black'}}>Download Payment History</Text>
        </View>
        <View style={[styles.ditem,{marginTop:5}]}>
          <Text style={{fontWeight:'700',fontSize:25,color:'black'}}>XXXX.XXX</Text>
          <TouchableOpacity style={{height:40,width:100,backgroundColor:'green',borderRadius:10,justifyContent:'center',alignItems:'center'}} >
            <Text style={{fontWeight:'700',fontSize:15,color:'white'}}>Download</Text>
          </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
Container:{
    flex:1,
    display:'flex'
},
userDetails:{
  marginTop:14,
height:100,
width:'95%',
backgroundColor:'#53CA86',
padding:10,
margin:10,
borderRadius:20,
justifyContent:'space-between'
},
view3:{
  marginTop:1,
  height:180,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
 width:'100%',
padding:10,
},
view3icon:{
height:150,
width:'49%',
backgroundColor:'#30BD6C',
borderRadius:20,
},
ditem:{
display:'flex',
flexDirection:'row',
justifyContent:'space-between',
width:'99%'
},
view5:{
  marginTop:1,
  height:180,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',

backgroundColor:'#BDE7CF',
padding:10,
},
view6:{
  marginTop:1,
  height:180,
  display:'flex',
 
  
  alignItems:'center',
backgroundColor:'white',
padding:10,
},
Addressitem:{
  
},
Container2:{
  marginTop:0,
  flex:1,
  display:'flex',
  backgroundColor:'white',
  elevation:1,
  marginBottom:20,
},


})


export default Account;