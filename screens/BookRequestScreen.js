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
import db from '../config'

import {SafeAreaProvider} from 'react-native-safe-area-context'

class BookRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId:firebase.auth().currentUser.email,
        bookName:'',
        requestReason:''
    };
  }
  createRandomId=()=>{
    return Math.random().toString(36).substring(7)
  }
  addRequest=(bookName,requestReason)=>{
      var userId=this.state.userId
      var requestId=this.createRandomId()
      db.collection('requested_books').add({
          'user_id':userId,
          'book_name':bookName,
          'request_reason':requestReason,
          'request_id':requestId
      })
      this.setState({
          bookName:'',
          requestReason:''
      })
  }
  render() {
    return (
        <SafeAreaProvider>
      <View>
          {/* <MyHeader title='Request Book'/> */}
          {/* <KeyBoardAvoidingView> */}
          <Input
   placeholder="Book Name"
//    style={styles.}
   onChangeText={value => this.setState({ bookName: value })}
   value={this.state.bookName}
  />

<Input
   placeholder="Reason For Requesting"
//    leftIcon={{ type: 'font-awesome', name: 'comment' }}
//    style={styles.}
   onChangeText={value => this.setState({ requestReason: value })}
   value={this.state.requestReason}
  />
<TouchableOpacity onPress={()=>{
    this.addRequest(this.state.bookName,this.state.requestReason)
}}>
    <Text>
        Request
    </Text>
</TouchableOpacity>
          {/* </KeyBoardAvoidingView> */}
      </View>
      </SafeAreaProvider>
    );
  }
}

export default BookRequestScreen;
