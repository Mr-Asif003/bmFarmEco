import { View, Platform ,StyleSheet, LayoutChangeEvent} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';

import TabBarButton from './TabBarButton';
import { useState } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

function TabBar({ state, descriptors, navigation }:BottomTabBarProps) {
    const [dimensions,setDimensions]=useState({height:20,width:100})
//   const { colors } = useTheme();
//   const { buildHref } = useLinkBuilder();

 const buttonWidth=dimensions.width/state.routes.length;
 const onTabBarLayout=(e:LayoutChangeEvent)=>{
    setDimensions({
        height:e.nativeEvent.layout.height,
        width:e.nativeEvent.layout.width,

    })
 }
  const tabPositionX=useSharedValue(-5);
  const animatedStyle=useAnimatedStyle(()=>{
    return{
        transform:[{translateX: tabPositionX.value}]
    }
  })



  return (
    <View onLayout={onTabBarLayout} style={styles.tabBar}>
        <Animated.View style={[animatedStyle,{
            position:'absolute',
            backgroundColor:'#257180',
            borderRadius:30,
            marginHorizontal:12,
            
            height:dimensions.height -15,
            width:buttonWidth -27,
            marginBottom:140,
            elevation:3
        }]}/>
       
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            tabPositionX.value=withSpring((buttonWidth*index)-145,{duration:1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
       
            <TabBarButton  
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={ isFocused ?  '#673ab7' : '#222'}
            label={label}

            />

        //   <PlatformPressable
        //   key={route.name}
        //     href={buildHref(route.name, route.params)}
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarButtonTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     style={styles.tabBarItem}
        //   >
           
        //    {/* tab icons */}
        //      {icon[route.name]({
        //           color: isFocused ?  '#673ab7' : '#222'
        //      })}
            
           


        //     <Text style={{ color: isFocused ? colors.primary : colors.text }}>
        //       {label}
        //     </Text>
        //   </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles=StyleSheet.create({
tabBar:{
    position:'absolute',
    bottom:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    marginHorizontal:13,
    paddingVertical:10,
    borderRadius:15,
    shadowColor:'#000',
    shadowOffset:{width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.1,
},
tabBarItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap:5,
}
})

 export default TabBar;
