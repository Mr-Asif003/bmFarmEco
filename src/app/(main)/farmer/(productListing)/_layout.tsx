import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
  return (
    <Stack>
    
     <Stack.Screen name='SelectVeg' options={{headerShown:false,headerStyle: {
backgroundColor: '#28AC60'
},headerTitle: 'Vegetable Selection',}}/>
    
     <Stack.Screen name='SelectFruits'options={{headerShown:false,headerStyle: {
backgroundColor: 'apple'
},}}/>
<Stack.Screen name='ListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='MyProducts'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='MyProductsVeg'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
<Stack.Screen name='FruitListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
<Stack.Screen name='(preorder)'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

    </Stack>
  )
}

export default _layout