import { View, Text, Button, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect } from 'expo-router'

import AppIntroSlider from 'react-native-app-intro-slider'
import RegisterScreen from './register/RegisterScreen'
const index = () => {


  const [showSlider, setShowSlider] = useState(true)

  const slides = [
    {
      key: 1,
      title: 'Welcome to FarmEco',
      text: 'A place where you can Buy or Sell Crpos',
      image: require('../../assets/images/introman1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Farmers',
      text: 'We welcome you to sell your Products',
      image: require('../../assets/images/introman2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Consumer',
      text: 'Buy and PreOrders their demand \n products From Us',
      image: require('../../assets/images/introman3.png'),
      backgroundColor: '#22bcb5',
    }
  ];

  const renderSlide = ({ item }) => {
    return (
      <ImageBackground source={require('../../assets/images/introbg1.png')} resizeMode="cover"  style={styles.slide}>

      <View style={styles.imagesliderContainer}>
      <Image source={item.image} style={styles.imageStyle} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.Headingtxt}>{item.title}</Text>
        <Text style={styles.descriptiontxt} >{item.text}</Text>
      </View>

      
      </ImageBackground>
    )
  }
  const _onDone = () => {
    setShowSlider(false)
  }

  return (
    
      <View style={styles.container} >
        {
          showSlider ? <AppIntroSlider data={slides} renderItem={renderSlide} onDone={_onDone} /> :<Redirect href={'./register/RegisterScreen'}/>
          
        }
      </View>
    
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: 'yellow',
    color: 'black',

  },

  imageStyle: {
    marginTop:'11%',
    width:'100%',
    height:'100%',
    aspectRatio: 1,
   resizeMode:'contain'
  },

  slide: {
   position:'absolute',
   height:'100%',
   width:'100%',
   display:'flex',
   alignItems:'center',

  },
  imagesliderContainer:{
    padding:20,
    height:'60%'
  },
  textContainer:{
    padding:20,
    height:'40%',
    display:'flex',
    width:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  Headingtxt:{
    fontSize:25,
    fontWeight:'700',
   
  },
  descriptiontxt:{
    fontSize:15,
    fontWeight:'500',
     color:'white'
  }
  






})