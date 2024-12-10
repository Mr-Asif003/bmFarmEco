import { FlatList, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from 'lucide-react-native'

import TabBarOption from '@/src/components/molecules/TabBarOption';
// import auth from '../../../firebaseConfig'
import { db, auth } from '@/src/app/firebaseConfig';

import { doc, getDoc } from "firebase/firestore";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import MyProductTabBarOptions from '@/src/components/molecules/MyProductsTabBar';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const CPreMyProductsVeg = () => {
  const navigation = useNavigation()
  const router = useRouter()
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


  //database extracting all products
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const userProductsRef = collection(db, "users", user.uid, "PreOrder");
    const q = query(userProductsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setUserProducts(products);
      console.log(userProducts)
    });

    return () => unsubscribe();
  }, []);



  const renderItem= ({ item,index }) => (
    <View style={[styles.card, (index) % 3 === 0 ? styles.evenCard : styles.oddCard]}>
      
    <View>
      <Text>Product id :- {item.Pid}</Text>
    </View>

    <View style={{ marginLeft: 10, display: 'flex', flexDirection: 'row', marginBottom: 1, marginTop: 10 }}>
      <View style={{ height: 100, width: 100, }}>
        <Image style={{ height: 100, width: 100, borderRadius: 10 }} source={require('../../../../assets/images/vegtables.png')} />
      </View>

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.productName}>{item.Name}</Text>

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>Price:-{item.Price} </Text>

          <Text style={{ fontSize: 16, fontWeight: '500' }}>Quantity:-{item.Quantity} </Text>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>DOD:- {item.Dod}</Text>

        </View>
        <TouchableOpacity style={styles.viewDetails}><Text style={{ fontSize: 15, }}>View Status</Text></TouchableOpacity>
      </View>
    </View>





    {/* {item.cropImage && (
    <Image source={{ uri: item.cropImage }} style={styles.image} />
    )} */}

  </View>
  )

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
        <Text style={{ fontSize: 25, fontWeight: '600' }}>My Vegetable PreOrders</Text>

      </View>
      <View style={styles.tranButton}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.vegbtn}  ><Text style={styles.vegtxt} >Vegetables</Text></TouchableOpacity>
          <TouchableOpacity style={styles.fruitbtn} onPress={() => router.replace('./CPreMyProducts')}  ><Text style={styles.fruittxt} >Fruits</Text></TouchableOpacity>
        </View>
      </View>

      {/* tabbar */}
      <ScrollView>

        <View style={styles.tabBar}>
          <MyProductTabBarOptions />

        </View>


        {/* mainContainer............ */}
        <View style={styles.mainContainer}>

          <View style={styles.Listcontainer}>
            
            {userProducts.length === 0 ? (
              <Text style={styles.noDataText}>No products found</Text>
            ) : (
              <FlatList
                data={userProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )}
          </View>


        </View>
      </ScrollView>
    </View>
  );


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
    fontSize: 16,
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
    backgroundColor: '#f7cad0',
    borderRadius: 20,
    marginHorizontal: 10,

  },
  Listcontainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    elevation: 10,
  },
  productName: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    textalign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  card:{
    elevation: 2, borderRadius: 20, backgroundColor: '#f0fff1', marginTop: 10, padding: 10, margin: 8 
  },
  evenCard: {
    backgroundColor: '#BDE7CF', // Background for even-indexed items
  },
  oddCard: {
    backgroundColor: '#F3E3B0', // Background for odd-indexed items
  },




})

export default CPreMyProductsVeg;
