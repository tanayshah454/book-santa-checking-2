import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    KeyBoardAvoidingView,
    ScrollView,
} from 'react-native';
import {
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

import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';

import firebase from 'firebase'
import db from '../config'

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            form: 'login',
            contact: '',
            name: '',
            address: '',
            confirmPassword: '',
            modalVisible: false
        };
    }

    login = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate('DonateBooks')
            })
            .catch((error) => {
                alert(error)
            })

    }

    register = (emailId, password,confirmPassword) => {
        if(password!==confirmPassword){
            return alert('Password Does Not Match\n Check your password')
        }else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                db.collection('users').add({
                    name:this.state.name,
                    emailId:this.state.emailId,
                    contact:this.state.contact,
                    address:this.state.address
                })
                alert('User Added Sucessfully')
                this.setState({
                    modalVisible:false
                })
            })
            .catch((error) => {
                alert(error)
            })
        }
    }

    reset = (emailId) => {
        firebase.auth().sendPasswordResetEmail(emailId)
            .then(() => {
                return alert("Password reset email sent successfully")
            })
            .catch((error) => {
                alert(error)
            })
    }

    showModal = () => {
        return (
            <Modal animationType='fade' transparent={false} visible={this.state.modalVisible}>
                {/* <ScrollView> */}
                    {/* <KeyBoardAvoidingView style={{ flex: 1, justifyContent: 'center', allignItem: 'center' }}> */}
                        <Header
                            centerComponent={{ text: 'Registration Form', style: { color: '#fff' } }}
                        />
                        <Input placeholder='Name' onChangeText={(text) => {
                            this.setState({
                                name: text
                            })
                        }} />
                        <Input
                            placeholder="Email Adress "
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            keyboardType='email-address'
                            onChangeText={value => this.setState({ emailId: value })}
                        />
                        <Input placeholder='Address' multiline={true} onChangeText={(text) => {
                            this.setState({
                                address: text
                            })
                        }} />
                        <Input
                            placeholder="Contact No. "
                            keyboardType='number-pad'
                            onChangeText={value => this.setState({ contact: value })}
                        />
                        <Input
                                placeholder="Password "
                                leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                                secureTextEntry={true}
                                onChangeText={value => this.setState({ password: value })}
                            />
                            <Input
                                placeholder="Confirm Password "
                                leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                                secureTextEntry={true}
                                onChangeText={value => this.setState({ confirmPassword: value })}
                            />
    <View>
        <TouchableOpacity onPress={()=>{
            this.register(this.state.emailId,this.state.password,this.state.confirmPassword)
        }}>
            <Text>
                Register
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            this.setState({
                modalVisible:false
            })
        }}>
            <Text>
                Cancel
            </Text>
        </TouchableOpacity>
    </View>
                    {/* </KeyBoardAvoidingView>
                </ScrollView> */}
            </Modal>
        )
    }

    render() {
        if (this.state.form === 'login') {
            return (
                <SafeAreaProvider>
                    <View>
                         {this.showModal()} 
                    </View>
                    <View>
                        <Header
                            centerComponent={{ text: 'Book Santa', style: { color: '#fff' } }}
                        />
                        <View style={styles.container}>
                            <Input
                                placeholder="Email Adress "
                                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                style={styles.inputContainer}
                                keyboardType='email-address'
                                onChangeText={value => this.setState({ emailId: value })}
                            />
                            <Input
                                placeholder="Password "
                                leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                                style={styles.inputContainer}
                                secureTextEntry={true}
                                onChangeText={value => this.setState({ password: value })}
                            />
                            <TouchableOpacity style={styles.restoreButtonContainer} onPress={() => {
                                this.setState({
                                    form: 'password'
                                })
                            }}>
                                <Text>
                                    Forgot?
</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                this.login(this.state.emailId, this.state.password)
                            }}>
                                <Text style={styles.loginText}>
                                    Login
</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                this.setState({
                                    modalVisible:true
                                })
                            }}>
                                <Text>
                                    Register
</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaProvider>
            );
        }
        if (this.state.form === 'password') {
            return (
                <SafeAreaProvider>
                    <View>
                        <Input
                            placeholder="Email Adress "
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            style={styles.inputContainer}
                            keyboardType='email-address'
                            onChangeText={value => this.setState({ emailId: value })}
                        />

                    </View>
                    <TouchableOpacity onPress={() => {
                        this.reset(this.state.emailId)
                    }}>
                        <Text>
                            reset password
</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        this.setState({
                            form: 'login',
                            emailId: '',
                            password: ''
                        })
                    }}>
                        <Text style={styles.loginText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </SafeAreaProvider>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0E0E6',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#3498db',
    },
    loginText: {
        color: 'white',
    },
    restoreButtonContainer: {
        width: 250,
        marginBottom: 15,
        alignItems: 'flex-end'
    },
});


export default WelcomeScreen;
