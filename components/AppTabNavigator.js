import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Image } from 'react-native'
import BookDonateScreen from '../screens/BookDonateScreen'
import BookRequestScreen from '../screens/BookRequestScreen'
import { AppStackNavigator } from './AppStackNavigator'

export const AppTabNavigator=createBottomTabNavigator({
    'DonateBooks':{
        screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/donate.png')} style={{width:20,height:20}}/>,
            tabBarLabel:'Donate Books'
        }
    },
    'RequestBooks':{
        screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/request2.png')}style={{width:20,height:20}}/>,
            tabBarLabel:'Request Books'
        }
    }
})