import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from 'lucide-react-native'
import Header from '../../../../components/molecules/Header';
import TabBarOption from '@/src/components/molecules/TabBarOption';
// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import { trendingProducts, seasonalProducts, closureImgs } from '../fdb/trendingProduct'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import FruitTabBarOption from '@/src/components/molecules/fruitTabBar';
import { SelectFruitsDB } from '@/src/Database/adminDB/selectFruitDB';
import FruitListingPage from './FruitListingPage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SelectFruits = () => {
  const navigation = useNavigation()
  const router=useRouter()
  //extracting name

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

  const  passItemData=(itemId,itemRate,itemtitle)=>{
    const details={itemId,itemRate,itemtitle}
    router.replace({ pathname:'./FruitListingPage', params: details })
  }


  const renderItem = ({ item,index }) => (
    <TouchableOpacity onPress={()=>passItemData(item.id,item.rate,item.title)} style={[styles.card, (index) % 3 === 0 ? styles.evenCard : styles.oddCard]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.details} >
        <Text style={styles.txt}>{item.id}</Text>
        <Text style={styles.txt}>Rs:- {item.rate}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.openDrawer()} // Opens the right-side drawer
        >
          <FontAwesome name="align-left" color="#000" size={24} />
        </TouchableOpacity>
       <View>
        <View><Text style={styles.hello}> Hello {userName}</Text></View>
       </View>
       <Text style={styles.welcome}>Welcome to the Fruit Sell Store</Text>
        
      </View>
      <View style={styles.tranButton}>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.vegbtn} onPress={()=>router.replace('./SelectVeg')}  ><Text style={styles.vegtxt} >Vegetables</Text></TouchableOpacity>
        <TouchableOpacity style={styles.fruitbtn} ><Text style={styles.fruittxt} >Fruits</Text></TouchableOpacity>
        </View>
        </View>

        {/* tabbar */}

        <ScrollView>
        <View style={styles.tabBar}><FruitTabBarOption /></View>
        <View style={styles.mainContainer}>
          
        <FlatList
            data={SelectFruitsDB}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={false} // Enables horizontal scrolling
            numColumns={2}
            showsHorizontalScrollIndicator={false} // Optional: Hides the horizontal scrollbar
            contentContainerStyle={styles.listContainer}
          />
         
        </View>
      </ScrollView>
        <View style={styles.backTruck}> 
      <TouchableOpacity style={styles.stackIcon} onPress={() => router.replace('./SelectVeg')}>
                    <AntDesign name="leftsquare" color="red" size={44} />
                </TouchableOpacity >
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: '#d80032',
    height: 120
  },
  tabBar: {
   height:75,
  },


  mainContainer: {
    height:'100%',
    width:'100%',
    display:'flex',
  flexDirection:'row',
  justifyContent:'center'
  },
  button: {
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  hello:{
  fontSize:20,
  fontWeight:'500'
  },
  welcome:{
    marginTop:10,
  fontSize:16,
  fontWeight:'400'
  },
  tranButton:{
    backgroundColor: '#d80032',
   marginBottom:10,
    padding:5
  },
  vegbtn:{
    height:34.5,
    width:'50%',
   
    display:'flex',
    justifyContent:'center',
    alignItems:'center',

  },
  fruitbtn:{
  
    height:35,
    width:'50%',
    backgroundColor:'#9d0208',
    display:'flex',
    justifyContent:'center',
     alignItems:'center',
   
    
     borderRadius:20,
   elevation:10
    
  },
  fruittxt:{
    fontSize:20,
    fontWeight:'500',
     color:'white'
  },
  vegtxt:{
    fontSize:18,
    fontWeight:'400',
    color:'black'
  },
  btnContainer:{
    height: 34,
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#f7cad0',
    borderRadius:20,
    marginHorizontal:10,
  
  },
  card: {
    height:'90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 16, // Adds space between cards
    width: '46%', // Set a fixed width for the horizontal cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
    marginTop:10
  },
  image: {
    width: '100%',
    height: 80, // Adjust the height for horizontal layout
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  details:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  txt:{
    fontSize:16,
    fontWeight:'600'
  },
  evenCard: {
    backgroundColor: '#BDE7CF', // Background for even-indexed items
  },
  oddCard: {
    backgroundColor: '#F3E3B0', // Background for odd-indexed items
  },
  backTruck:{
    marginLeft:'3%',
  },
  stackIcon: {
    height: 50,
    
    marginBottom: 5,
    marginTop: -13
},


})

export default SelectFruits;
