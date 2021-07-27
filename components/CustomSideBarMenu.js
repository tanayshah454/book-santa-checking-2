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

import { DrawerItems } from 'react-navigation-drawer';

import firebase from 'firebase'

class CustomSideBarMenu extends Component {

  render() {
    return (
      <View>
        <View>
            <DrawerItems 
            {...this.props}
            />
        </View>
        <View>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('WelcomeScreen')
                firebase.auth().signOut()
            }}>
                <Text>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CustomSideBarMenu;
