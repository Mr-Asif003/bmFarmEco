import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../../components/molecules/Header';

// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, getDoc } from "firebase/firestore";

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import CropTypeSelection from '../(productListing)/CropTypes';


const SelectCrops = () => {
  const router=useRouter();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));//to get collection from user i write this code
          if (userDoc.exists()) {
            const userData = userDoc.data();//to get data from user i write this code
            setUserName(userData.name || "User"); // Fallback to "User" if name is not set
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
       
      </View>
      <View style={styles.MainContainer}>
        <View style={styles.mainitems}>
          <View style={styles.userNameContainer}>
            <Text style={styles.HiText}>Hi</Text>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.chooseText}>Choose What are your looking for !</Text>
          </View>

          <View style={styles.categoriesContainer}>

            <View style={styles.selectCategoriesContainer} >



              


              

               


             

             


             
               
               


 






            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#28Ac60'
  },
  headerContainer: {
    height: '14%',
  },
  MainContainer: {


    display: 'flex',
    height: 2000,
    backgroundColor: '#FCFAEE',

    shadowColor: 'black',
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    margin: 0,
    marginBottom: 0,


  },
  mainitems: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    elevation: 3,
  },
  userNameContainer: {

  },
  chooseText: {
fontSize:18,
  fontWeight:'500'
  },
  HiText: {
  fontSize:20,
  fontWeight:'400'
  },
  userName: {
fontSize:25,
  fontWeight:'600'
  },
  categoriesContainer: {

    flex: 1,
    display: 'flex',
   

  },
  selectCategoriesContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
 







})

export default SelectCrops;

{/* <View style={styles.sell}>

<View style={styles.title}><Text style={styles.titletext}>Sell</Text></View>
<View style={styles.option}>

  <TouchableOpacity style={styles.threeDotView}>
    <Entypo name="dots-three-vertical" color="#000" size={24} />
  </TouchableOpacity>


  <TouchableOpacity style={styles.buttonView}>

  </TouchableOpacity>

</View>

</View> */}