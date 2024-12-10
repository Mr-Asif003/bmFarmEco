import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import { Gift } from 'lucide-react';
import { Icon } from 'lucide-react-native';
import { View ,StyleSheet} from 'react-native';
import TabBar from '@/src/components/atom/TabBar';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

const TabLayout=()=>{
return(
  <Tabs  screenOptions={{ tabBarActiveTintColor: 'green' }}  >
     <Tabs.Screen
        name="index"
        options={{
          headerShown:false,
          title: 'Home',
          tabBarIcon: ({ color }) => <Foundation name="home" color={color} size={34} />,
        }}/>
    <Tabs.Screen name='Categories'   options={{
          headerShown:false,
          title: 'Order Place',
          tabBarIcon: ({ color }) =><FontAwesome5 name="store-alt" size={24} color={color}/>,
        }}/>
    <Tabs.Screen name='Cart'  options={{
          headerShown:false,
          title: 'MyProduct',
          tabBarIcon: ({ color }) => <FontAwesome name="cart-arrow-down" color={color} size={24} />,
        }}/>
    <Tabs.Screen name='Account'  options={{
          headerShown:false,
          title: 'Account',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-box" size={24} color={color}/>,
        }} />

  
  </Tabs>
)
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

export default TabLayout;