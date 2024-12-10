import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
  return (
   <Stack initialRouteName='Preorder'>
    <Stack.Screen name='Preorder' options={{headerShown:false}}/>
    <Stack.Screen name='fruitPreorder' options={{headerShown:false}}/>
    <Stack.Screen name='AcceptedFruitPreoder' options={{headerShown:false}}/>
    <Stack.Screen name='AcceptedPreorder' options={{headerShown:false}}/>
   </Stack>
  )
}

export default _layout