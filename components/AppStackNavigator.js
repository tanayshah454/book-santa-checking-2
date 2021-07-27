import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import BookDonateScreen from '../screens/BookDonateScreen'
import RecieverDetailScreen from '../screens/RecieverDetailScreen'

export const AppStackNavigator=createStackNavigator({
    BookDonate:{
        screen:BookDonateScreen,
        navigationOptions:{headerShown:false}
    }
    ,RecieverDetails:{
        screen:RecieverDetailScreen,
        navigationOptions:{headerShown:false}
    }
},{
    initialRouteName:'BookDonate'
}
)