import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
  return (
    <Stack>
    
     <Stack.Screen name='COrSelectVeg' options={{headerShown:false,headerStyle: {
backgroundColor: '#28AC60'
},headerTitle: 'Vegetable Selection',}}/>
    
     <Stack.Screen name='COrSelectFruits'options={{headerShown:false,headerStyle: {
backgroundColor: 'apple'
},}}/>
<Stack.Screen name='COrListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='COrMyProducts'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />

<Stack.Screen name='COrMyProductsVeg'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
<Stack.Screen name='COrFruitListingPage'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} />
{/* <Stack.Screen name='(preorder)'options={{headerShown:false,headerStyle: {
backgroundColor: 'black'
},}} /> */}

    </Stack>
  )
}

export default _layout