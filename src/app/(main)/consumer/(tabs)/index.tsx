import { FlatList, View, Text, StyleSheet, ScrollView, Image ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from 'lucide-react-native'
import Header from '../../../../components/molecules/header';
import TabBarOption from '@/src/components/molecules/TabBarOption';
// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";
import { trendingProducts ,seasonalProducts ,closureImgs,TopRatedProducts } from '../../farmer/fdb/trendingProduct'
import Octicons from 'react-native-vector-icons/Octicons';
import { useRouter } from 'expo-router';


const index = () => {
  const router=useRouter();

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



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const renderclosure = ({ item }) => (
    <View style={styles.closure}>
      <Image source={item.image} style={styles.closureImage} />
    </View>
  );
  const topRatedProducts = ({ item }) => (
    <View style={styles.trcard}>
      <View style={styles.trsideView1}>
      <Image source={item.image} style={styles.trimage} />
      <Text style={{fontSize:25,fontWeight:'500'}}>{item.title}</Text>
      <Text style={{fontSize:18,fontWeight:'400'}}>Price:-{item.price}</Text>
      </View>
      <View style={styles.trsideView2}>
      <Text style={{fontSize:22,fontWeight:'500'}}>*{item.Rating}</Text>
      <Text style={{fontSize:17,fontWeight:'500'}}>{item.cropType}</Text>
      <TouchableOpacity style={styles.buttonView} onPress={()=>router.push('./SelectVeg')}>
                      <Octicons name="plus-circle" color="#000" size={30} />
                      </TouchableOpacity>
      </View>

    </View>
  ); 
   




  //console.log('username=',userName)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header userName={userName} />
      </View>

      <View style={styles.MainContainer}>
        <ScrollView style={styles.mainScroll}>
        <FlatList
            data={closureImgs}
            renderItem={renderclosure}
            keyExtractor={(item) => item.id}
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Optional: Hides the horizontal scrollbar
            contentContainerStyle={styles.listContainer}
          />


          <Text style={styles.ourfeature}>Our Feature</Text>
          <View style={styles.tabOptionContainer}>
            <TabBarOption />
          </View>

         {/* topRated */}
         <Text style={styles.featureText}>Top Rated Products</Text>
          <FlatList
            data={TopRatedProducts}
            renderItem={topRatedProducts}
            keyExtractor={(item) => item.id}
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Optional: Hides the horizontal scrollbar
            contentContainerStyle={styles.listContainer}
          />



          {/* trending section */}
          <Text style={styles.featureText}>Trending Demandable products</Text>
          <FlatList
            data={trendingProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Optional: Hides the horizontal scrollbar
            contentContainerStyle={styles.listContainer}
          />
        
          {/* seasonalDemand */}

          <Text style={styles.featureText}>Seasonal Demands</Text>
          <FlatList
            data={seasonalProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Optional: Hides the horizontal scrollbar
            contentContainerStyle={styles.listContainer}
          />
          
          



        </ScrollView>
      </View >
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
    height: '16%',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#F7F1F6',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20

  },
  tabOptionContainer: {
    marginTop: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainScroll: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    elevation:1,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
   fontFamily:'sanSerif',
    marginTop: 40
  },
  ourfeature:{
  marginTop:5,
   marginLeft: 15,
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
   fontFamily:'sanSerif',
  },

  trendingScroll: {
    display: 'flex',
    flexDirection: 'row',


  },
  trendingscrollview: {
    height: 100,
    width: 100,
    backgroundColor: 'black',
    margin: 10
  },


  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 16, // Adds space between cards
    width: 150, // Set a fixed width for the horizontal cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
    margin:10,
    display:'flex',
    
  },
  image: {
    width: '100%',
    height: 80, // Adjust the height for horizontal layout
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closure:{
    backgroundColor: '#fff',
    borderRadius: 8,
   
    marginRight: 16, // Adds space between cards
    width: 300, // Set a fixed width for the horizontal cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  
    margin:10
  },
  closureImage:{
    width: '100%',
    height: 150, // Adjust the height for horizontal layout
    borderRadius: 8,
    marginBottom: 12,
  },
  trcard:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 10,
   // Adds space between cards
    width: 250,
    height:180, // Set a fixed width for the horizontal cards
    shadowColor: '#000',
    shadowOpacity: 0.0,
    shadowOffset: { width: 0, height: 0},
    
    elevation: 10,
    marginTop:30,
    marginLeft:50,
    display:'flex',
    flexDirection:'row',
    
  },
  trimage:{
    
    width: '120%',
    height: 120, // Adjust the height for horizontal layout
    borderRadius: 20,
   
    marginLeft:-34,
    marginTop:-25,
    marginBottom:4,
  
    
  },
  trsideView2:{
  position:'relative',
  width:80,
  display:'flex',
  justifyContent:'space-between',
  alignItems:'flex-end'
  },
  trsideView1:{
    position:'relative',
    width:150,
    display:'flex'
    },
    buttonView: {
      display:'flex',
      height: 35,
      width: 60,
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      padding:2,
      elevation:10,
      shadowOffset:{height:50,width:20},
      shadowOpacity:10,
    },



})

export default index;