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

class RecieverDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId:firebase.auth().currentUser.email,
        recieverId:this.props.navigation.getParam('details')['user_id'],
        requestId:this.props.navigation.getParam('details')['request_id'],
        bookName:this.props.navigation.getParam('details')['book_name'],
        userName:'',
        requestReason:this.props.navigation.getParam('details')['request_reason'],
        recieverName:'',
        reciverContact:'',
        recieverAddress:'',
        recieverRequestDocId:''
    };
  }

  updateBookStatus=()=>{
    db.collection('all_donations').add({
      book_name:this.state.bookName,
      request_id:this.state.requestId,
      requested_by:this.state.recieverName,
      donor_id:this.state.userId,
      request_status:"donor interested"
    })
  }

  getRecieverDetails=()=>{
    db.collection('users').where('emailId','==',this.state.recieverId).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            this.setState({
                recieverName:doc.data().name,
                recieverContact:doc.data().contact,
                recieverAddress:doc.data().address
            })
        })
    })
    db.collection('requested_books').where('request_id','==',this.state.requestId).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            this.setState({
                recieverRequestDocId:doc.id
            })
        })
    })
  }

componentDidMount=()=>{
    this.getRecieverDetails()
    this.getUserDetails
}

getUserDetails=()=>{
  db.collection('users').where('emailId','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      this.setState({
        userName:doc.data().name
      })
    })
  })
}

addNotification=()=>{
  var message=this.state.userName+' has shown intrest in donating to you'
  db.collection('all_notifications').add({
    targeted_user_id:this.state.recieverId,
    donor_id:this.state.userId,
    request_Id:this.state.requestId,
    book_name:this.state.bookName,
    date:firebase.firestore.FieldValue.serverTimestamp(),
    notification_status:'unread',
    message:message
  })
}

  render() {
    return (
      <View>
        <View>
          <Header
    leftComponent={
    <Icon
      raised
      name='arrow-left'
      type='feather'
      color='#f50'
      onPress={() => this.props.navigation.goBack()} />
    }
    centerComponent={{ text: 'Donate Books', style: { color: '#fff' } }}
  />
        </View>
        <View>
          <Card title='Book information' titleStyle={{fontSize:20}}>
            <Card>
              <Text>
                name:{this.state.bookName}
              </Text>
            </Card>
            <Card>
              <Text>
                reason:{this.state.requestReason}
              </Text>
            </Card>
          </Card>
        </View>

        <View>
          <Card title='Reciever information' titleStyle={{fontSize:20}}>
            <Card>
              <Text>
                name:{this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text>
                contact:{this.state.recieverContact}
              </Text>
            </Card>
            <Card>
              <Text>
                address:{this.state.recieverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View>
          {this.state.recieverId!=this.state.userId?(
            <TouchableOpacity onPress={()=>{
              this.addNotification()
              this.updateBookStatus()
              this.props.navigation.navigate('MyDonations')
            }}>
              <Text>
                I want to Donate
              </Text>
            </TouchableOpacity>
          ):(null)
        }
        </View>
      </View>
    );
  }
}

export default RecieverDetailScreen;
