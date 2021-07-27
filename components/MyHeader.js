import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    KeyBoardAvoidingView,
    ScrollView,
} from 'react-native';
import{
    Avatar,
    Badge,
    Input,
    Card,
    Header,
    Icon,
    ListItem,
    SearchBar,
    Tile
} from 'react-native-elements'

import firebase from 'firebase'

const MyHeader=(props)=>{
return(
    <Header
    leftComponent={<Icon name='bars' type='font-awesome' onPress={()=>{
       props.navigation.toggleDrawer()
    }}
    />}
  centerComponent={{ text: props.title, style: { color: '#000' } }}
/>
)
}
export default MyHeader