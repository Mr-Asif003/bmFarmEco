import { View, Text, StyleSheet, TouchableOpacity,Image,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Contact } from 'lucide-react-native'

//firebase
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'expo-router';


const Cart = () => {
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
      <View style={styles.topheading}>
      <Text style={{fontSize:20,fontWeight:'700'}}>Global Market Section</Text>
      </View>
      </View>
   

    
     <TouchableOpacity style={styles.view1}>
     <Image source={require('../../../../assets/images/MarketAnalysisButton.png')} style={{height:200,width:"100%",borderRadius:20}}/>
     </TouchableOpacity>
     <TouchableOpacity style={styles.view1}>
     <Image source={require('../../../../assets/images/GlobalMarketbutton.png')} style={{height:200,width:"100%" ,borderRadius:20}}/>
     </TouchableOpacity>
     <TouchableOpacity style={styles.view1}>
     <Image source={require('../../../../assets/images/Sellingsuggestionbutton.png')} style={{height:200,width:"102%",borderRadius:20}}/>
     </TouchableOpacity>
     

      </ScrollView>
   )
  }
  
  const styles=StyleSheet.create({
  Container:{
      flex:1,
      display:'flex'
  },
  Container2:{
    marginTop:0,
    flex:1,
    display:'flex',
    backgroundColor:'white',
    elevation:1,
    marginBottom:20,
},
  view1:{
    padding:10
  },
  topheading:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  }


})

export default Cart;