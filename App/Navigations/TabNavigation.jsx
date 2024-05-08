import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import MapScreen from '../Screens/MapScreen/MapScreen';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tab.Screen name='home' component={HomeScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>
                    Home</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        
        />
        <Tab.Screen name='ticket' component={BookingScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>
                    Ticket</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="ticket" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='profile' component={ProfileScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>
                    Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="user-circle" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='map' component={MapScreen}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>
                    Maps</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome name="map-marker" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}