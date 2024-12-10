import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const duration = 3000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const FruitTabBarOption= () => {
  const sv = useSharedValue<number>(0);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), 1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <View style={styles.touchableContainer}>
      <Animated.View style={[styles.items, animatedStyle]}>
        <View style={styles.icon}>
        <MaterialCommunityIcons name="offer" color="#000" size={24} />
        </View>
      </Animated.View>
        <Text style={styles.text}>Offer Zone</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity >
        <View style={styles.touchableContainer}>
      <Animated.View style={[styles.items, animatedStyle]}>
        <View style={styles.icon}>
        <Feather name="list" color="#000" size={24} />
        </View>
      </Animated.View>
        <Text style={styles.text}>List</Text>
        </View>
      </TouchableOpacity>  
      <TouchableOpacity>
      <View style={styles.touchableContainer}>
      <Animated.View style={[styles.items, animatedStyle]}>
        <View style={styles.icon}>
          <FontAwesome name="percent" color="#000" size={24} />
        </View>
      </Animated.View>
        <Text style={styles.text}>History</Text>
        </View>
      </TouchableOpacity> 
       <TouchableOpacity>
       <View style={styles.touchableContainer}>
      <Animated.View style={[styles.items, animatedStyle]}>
        <View style={styles.icon}>
        <AntDesign name="customerservice" color="#000" size={24} />
        </View>
      </Animated.View>
        <Text style={styles.text}>Help</Text>
        </View>
      </TouchableOpacity>
    

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
  },
  items: {
    height: 45,
    width: 45,
    backgroundColor: '#ffb3c1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,

  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    marginTop:2,
    fontWeight:'600',
    fontSize:14
  }

})

export default FruitTabBarOption;