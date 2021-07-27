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
import db from '../config'
import firebase from 'firebase'
import {SafeAreaProvider} from 'react-native-safe-area-context'

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        userId  : firebase.auth().currentUser.email,
        address:'',
        contact:'',
        docId:''
    };
  }
getUserDetails=()=>{
    db.collection("users").where('emailId','==',this.state.userId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var data=doc.data()
            this.setState({
                name:data.name,
                address:data.address,
                contact:data.contact,
                docId:doc.id
            })
        })
    })
}
updatUserDetails=()=>{
    db.collection('users').doc(this.state.docId).update({
        name:this.state.name,
        address:this.state.address,
        contact:this.state.contact
    })
    alert('Profile updated succesfully')
}
componentDidMount(){
    this.getUserDetails()
}
  render() {
    return (
        <SafeAreaProvider>
      <View>
      <Header
                            centerComponent={{ text: 'Registration Form', style: { color: '#fff' } }}
                        />
                        <Input placeholder='Name' value={this.state.name} onChangeText={(text) => {
                            this.setState({
                                name: text
                            })
                        }} />
                        <Input placeholder='Address' value={this.state.address} multiline={true} onChangeText={(text) => {
                            this.setState({
                                address: text
                            })
                        }} />
                        <Input
                            placeholder="Contact No. "
                            value={this.state.contact}
                            keyboardType='number-pad'
                            onChangeText={value => this.setState({ contact: value })}
                        />
                        <TouchableOpacity onPress={()=>{
    this.updatUserDetails()
}}>
<Text>
Save
</Text>
</TouchableOpacity>
      </View>
      </SafeAreaProvider>
    );
  }
}

export default SettingsScreen;
