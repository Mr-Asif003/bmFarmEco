import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from 'lucide-react-native'
import Header from '../../../../components/molecules/Header';
import TabBarOption from '@/src/components/molecules/TabBarOption';
// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import VegTabBarOption from '@/src/components/molecules/VegTabBar';


//DB
import { SelectVegDB } from '@/src/Database/adminDB/selectVegDB';

//fonticon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Categories from '../(tabs)/Categories';

const COrSelectVeg = () => {
  const navigation = useNavigation()
  const router = useRouter();

  //extracting name

  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);


const  passItemData=(itemId,itemRate,itemtitle)=>{
    const details={itemId,itemRate,itemtitle}
    router.replace({ pathname:'./COrListingPage', params: details })
  }

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
        <Text style={styles.welcome}>Welcome to the Vegetable Order store</Text>

      </View>
      <View style={styles.tranButton}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.vegbtn}><Text style={styles.vegtxt} >Vegetables</Text></TouchableOpacity>
          <TouchableOpacity style={styles.fruitbtn} onPress={() => router.replace('./COrSelectFruits')}><Text style={styles.fruittxt} >Fruits</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.tabBar}><VegTabBarOption /></View>
        <View style={styles.mainContainer}>
          
        <FlatList
            data={SelectVegDB}
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
      <TouchableOpacity style={styles.stackIcon} onPress={() => router.replace('../(tabs)/Categories')}>
                    <AntDesign name="leftsquare" color="green" size={44} />
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
    backgroundColor: '#89fc00',
    height: 120
  },
  tabBar: {
    height: 75,
  },


  mainContainer: {
    height:'100%',
    width:500,
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
  hello: {
    fontSize: 20,
    fontWeight: '500'
  },
  welcome: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '400'
  },
  tranButton: {
    backgroundColor: '#89fc00',
    marginBottom: 10,
    padding: 5
  },
  vegbtn: {
    height: 35,
    width: '50%',
    backgroundColor: '#29bf12',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


    borderRadius: 20,
    elevation: 10

  },
  fruitbtn: {
    height: 34.5,
    width: '50%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  fruittxt: {
    fontSize: 22,
    fontWeight: '400'
  },
  vegtxt: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white'
  },
  btnContainer: {
    height: 34,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#b7efc5',
    borderRadius: 20,
    marginHorizontal: 10,

  },
  card: {
    height:175,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 16, // Adds space between cards
    width: 170, // Set a fixed width for the horizontal cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
    margin:10
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
  backTruck:{
    transform: [{ rotate:'3600deg' }]
  },
  stackIcon: {
    height: 50,
    
    marginBottom: 5,
    marginTop: -13,
    marginLeft:5
},
evenCard: {
  backgroundColor: '#BDE7CF', // Background for even-indexed items
},
oddCard: {
  backgroundColor: '#F3E3B0', // Background for odd-indexed items
},
 



})

export default COrSelectVeg;
