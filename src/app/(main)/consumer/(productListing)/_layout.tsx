import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
  return (
    <Stack>
    
     <Stack.Screen name='CPreSelectVeg' options={{headerShown:false,headerStyle: {
backgroundColor: '#28AC60'
},headerTitle: 'Vegetable Selection',}}/>
    
     <Stack.Screen name='CPreSelectFruits'options={{headerShown:false,headerStyle: {
backgroundColor: 'apple'
},}}/>
<Stack.Screen name='CPreListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='CPreMyProducts'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='CPreMyProductsVeg'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
<Stack.Screen name='CPreFruitListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
<Stack.Screen name='(preorder)'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

    </Stack>
  )
}

export default _layout