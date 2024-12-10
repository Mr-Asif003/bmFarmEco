
import React, { useEffect } from 'react'
import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Route } from 'expo-router/build/Route';
import {interpolate, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'
import Animated from "react-native-reanimated"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const icon={
    index: (props: any) => <FontAwesome size={28} name="home" {...props} />,
    Categories: (props: any) => <FontAwesome5 name="store-alt" size={24} color="black" {...props} />,
    Cart: (props: any) => <FontAwesome size={28} name="home" {...props} />,
    Account: (props: any) => <MaterialCommunityIcons name="account-box" size={24} color="black" {...props} />
}
const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, color, label }: { onPress: Function, onLongPress: Function, isFocused: boolean, routeName: string, color: string, label: string }) => {
    const scale=useSharedValue(0);
    useEffect(()=>{
     scale.value=withSpring(typeof isFocused === 'boolean' ?(isFocused ?1:0):isFocused,{duration:350})
    },[scale,isFocused]);


    const animatedTextStyle=useAnimatedStyle(()=>{
        const opacity=interpolate(scale.value,[0,1],[1,0]) 
        return{
            opacity
        }
    })
    const animatedIconStyle=useAnimatedStyle(()=>{
        const scaleValue=interpolate(scale.value,[0,1],[1,1.3]);

        const bottom=interpolate(scale.value,[0,1],[0,1.4]);
        return{
           transform:[{
            scale:scaleValue
           } ],
           bottom   
        }
    })

    return (
        <PlatformPressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
        >

            {/* tab icons */}

          <Animated.View style={animatedIconStyle}>

            {/* {icon[routeName]({
                color: isFocused ? 'white' : '#222'
            })} */}

            {
                icon[routeName]({
                    color: isFocused ? 'white' : '#222'  
                })
            }
          </Animated.View>
            <Animated.Text style={[{ color: isFocused ? 'white' : '#222',fontSize:12 },animatedTextStyle]}>
                {label}
            </Animated.Text>

        </PlatformPressable>
    )
}
const styles = StyleSheet.create({

    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    }
})

export default TabBarButton;