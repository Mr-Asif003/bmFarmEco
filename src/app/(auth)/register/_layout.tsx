import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const Registerlayout = () => {
 return(
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='RegisterScreen'  options={{headerShown:false}}/>
        <Stack.Screen name='farmer'/>
    </Stack>
 )
}

export default Registerlayout;