import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingsScreen from '../screens/SettingsScreen'
import MyDonationScreen from '../screens/MyDonationScreen'

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    MyDonations:{screen:MyDonationScreen},
    Setting:{screen:SettingsScreen}
    
},
{
    contentComponent:CustomSideBarMenu
},
{
    intialRouteName:'Home'
})