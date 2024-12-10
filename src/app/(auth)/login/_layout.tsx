import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => {
  return (
    <Stack initialRouteName='LoginScreen' screenOptions={{headerShown:false}} >
        <Stack.Screen name='LoginScreen' options={{headerShown:false}}/>
    </Stack>
  )
}

export default LoginLayout;