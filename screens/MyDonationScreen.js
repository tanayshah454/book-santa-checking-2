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
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

class MyDonationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        donorId:firebase.auth().currentUser.email,
        donorName:'',
        allDonations:[]
    };
    this.requestRef=null
  }
  static navigationOptions={header:null}
  
  getDonorDetails=()=>{
      db.collection('users').where('emailId','==',this.state.donorId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            this.setState({
                donorName:doc.data().name
            })
        })
      })
  }

  getAllDonations=()=>{
      this.requestRef=db.collection('all_donations').where('donor_id','==',this.state.donorId)
      .onSnapshot((snapshot)=>{
        var allDonations=[]
        snapshot.docs.map((doc)=>{
            var donation=doc.data()
            donation['doc_id']=doc.id
            allDonations.push(donation)
        })
        this.setState({
            allDonations:allDonations
        })
      })
  }
  componentDidMount=()=>{
    this.getDonorDetails()
    this.getAllDonations()
  }
  componentWillUnmount=()=>{
      this.requestRef
  }

  sendBook=(bookDetails)=>{
    if(bookDetails.requestStatus==='book sent'){
    var requestStatus='donor interested'
    db.collection('all_donations').doc(bookDetails.doc_id).update({
      request_status:'donor interested'
    })
    this.sendNotification(bookDetails,requestStatus)
  }else{
    var requestStatus='book sent'
    db.collection('all_donations').doc(bookDetails.doc_id).update({
      request_status:'book sent'
    })
    this.sendNotification(bookDetails,requestStatus)
  }
  }

  sendNotification=(bookDetails,requestStatus)=>{
    var requestId=bookDetails.request_id
    var donorId=bookDetails.donor_id
    db.collection('all_notifications').where('request_id','==',requestId).where('donor_id','==',donorId).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            var message=''
            if(requestStatus=='bookSent'){
                message=this.state.donorName+' sent you the book'
            }else{
                message=this.state.donorName+' has shon interest in donating the book'
            }
            db.collection('all_notifications').doc(doc.id).update({
                message:message,
                date:firebase.firestore.FieldValue.serverTimestamp(),
                notification_status:'unread'
            })
        })  
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (  
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.book_name}</ListItem.Title>
            <ListItem.Subtitle>{"Requested by: "+item.requested_by+'\n status:'+item.request_status}</ListItem.Subtitle>
            <TouchableOpacity onPress={()=>{
              this.sendBook(item)
            }}>
              <Text>
                Sent
              </Text>
            </TouchableOpacity>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      
    )
  }

  render() {
    return (
      <View>
       <SafeAreaProvider>
      <View style={{flex:1}}>
        <MyHeader title="My donations" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allDonations.length === 0
            ?(
              <View>
                <Text style={{ fontSize: 20}}>List Of All Donated Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
      </SafeAreaProvider>
      </View>
    );
  }
}

export default MyDonationScreen;
