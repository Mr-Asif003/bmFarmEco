import { View, Text, StyleSheet, Image, VirtualizedList, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CategoryHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container} >
      <View style={styles.logoContainer}>
        <View style={styles.logoImageContainer}>
          <Image source={require('@/src/assets/images/farmeco.png')} style={styles.logoImage} />
        </View>
        <View style={styles.avatarcontainer}>
          <TouchableOpacity>
            <Image source={require('@/src/assets/images/avatarImage.png')} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.greet}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.openDrawer()} // Opens the right-side drawer
        >
          <FontAwesome name="align-left" color="white" size={24} />
        </TouchableOpacity>

        <View style={styles.hicontainer}>
       
       

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#28AC60'
  },
  logoContainer: {
    height: '50%',
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between'
  },
  greet: {
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
 
    justifyContent:'space-between',
    alignItems:'center'
  },
  logoImage: {
    display: 'flex',
    height: '100%',
    width: 'auto',
    
  },
  logoImageContainer: {
    margin:5,
    height: 50,
    width: '30%',
    marginLeft:-25,
  },
  avatarcontainer: {
    height: 50,
    width: '30%',
    borderRadius: 10,
  },
  avatarImage: {
    height: '80%',
    width: '35%',
    borderRadius: 200,
    marginLeft: '60%',
    marginTop: '10%',
    elevation: 4
  },
  button: {
    padding: 5,
  
    borderRadius: 5,
    marginLeft:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  hicontainer:{
  marginRight:20,
  marginBottom:20
  },
  hitextcontainer:{
  display:'flex',
  flexDirection:'row'
  },
  locationcontainer:{

  },
  greetname:{
    marginTop:10,
    fontSize:25,
    fontWeight:'500'
  },
  greethi:{
    fontSize:23,
    
    margin:1,
  }





})


export default CategoryHeader;