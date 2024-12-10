import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home ',
            headerShown:false
          }}
        />
        <Drawer.Screen
          name="Profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}

        />
          <Drawer.Screen
          name="Help" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Help',
            title: 'Help',
          }}
        />
          <Drawer.Screen
          name="Setting" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Setting',
            title: 'Setting',
          }}
        />
         {/* product listing */}
         <Drawer.Screen
          name="(productListing)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'ProductListing',
            title: 'Home ',
            headerShown:false,
            headerBackButtonDisplayMode:'default'
          }}
          
          
        />


        
   
         {/* product listing */}
        
        
         <Drawer.Screen
          name="SelectVeg" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "SelectVeg",
            title: 'Select ',
            headerShown:true,
            headerBackButtonDisplayMode:'default'
          }}
          
          
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}