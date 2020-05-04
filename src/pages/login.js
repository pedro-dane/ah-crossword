import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Aler, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as Constants from "../util/Constants";
import * as ApiCalls from "../util/ApiCalls";


export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            userName: "",
            password: ""
        }
    }
    render(){
        return (
        <View style={styles.containerview}>
            <View style={styles.manualLoginSection}>
                <Text style={styles.texth3}>Log In </Text>
                <Text style={styles.para}>Log in to save and sync your hard work</Text>
                <TextInput onChangeText={(text)=>{ this.setState({ userName: text })}} value={this.state.userName} autoCorrect={false} placeholder={'email address'} style={styles.textinput}></TextInput>
                <TextInput onChangeText={(text)=>{ this.setState({ password: text })}} value={this.state.password} secureTextEntry={true} placeholder={'Password'} style={styles.textinput}></TextInput>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.onManualLogin}>
                    <Text style={styles.btntext}>Log In</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkBtn}>
                    <Text style={styles.linkbtntext}>Forgot Password</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.socialLoginSection}>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.fbLogIn.bind(this)}>
                    <Text style={styles.btntext}>Login With FaceBook</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.gmailsignin.bind(this)}>
                    <Text style={styles.btntext}>Login With Gmail</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.loginFooter}>
                <TouchableOpacity style={styles.defaultLinkBtn} onPress={() => Actions.register()}>
                    <Text style={styles.defaultLinkBtnTxt}>Don't have an account? Create One</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    onAuthFromBackend = (email, password) =>{
        let url = `/user?email=${email}&password=${password}`;
        ApiCalls.get(url, {})
        .then((res)=>{
            console.log(res);
            if(res.status){
                AsyncStorage.setItem("email", email, (er)=>{
                    Actions.home();
                })
            }
            else{
                Alert.alert("Login Failed", "User credentail is incorrect or user not found!");
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onManualLogin = () =>{
        if(this.state.userName != "" && this.state.password != ""){
            this.onAuthFromBackend(this.state.userName, this.state.password);
        }
        else{
            Alert.alert("Warning", "Email and password required!")
        }
    }

    async fbLogIn() {
        try {
                await Facebook.initializeAsync(Constants.FB_APP_ID);
                const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
                if (type === 'success') {
                    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
                    const { id, name, email } = await response.json();
                    await AsyncStorage.setItem("name", name);
                    await AsyncStorage.setItem("email", email);
                    this.onAuthFromBackend(email, id)
                } else {
                    Alert.alert('Sign In!','Login cancel by user!'); 
                }
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    }

    async  gmailsignin() {
        try {
            // now connect device i want to see if user click then thisfunction is calling or not
            const result = await Google.logInAsync({
            // android client id
            androidClientId: Constants.GOOGLE_ANDROID_APP_ID,
            //ios client id
            iosClientId: Constants.GOOGLE_IOS_APP_ID,
                scopes: ['profile', 'email'],
            });
            // check result
            if (result.type === 'success') {
                try {
                    //asyncstorage used to store username and profile image
                    await AsyncStorage.setItem("name",result.user.name);
                    await AsyncStorage.setItem("email",result.user.email);
                    this.onAuthFromBackend(result.user.email, result.user.id);
                } catch (error) {
                    Alert.alert("error",error)
                }
                
            } else {
                Alert.alert('Login in! cancel','Cancel');
            }
        } catch (e) {
            console.log("error",e)
            //plese run code in phone you mean siumlator no actual phone ok
            //i am using expo to run in iphone seems nothing happening
            // Alert.alert('Logged in Error !', e);  any error showimg no nothing

        }
    }
    
}
const styles = StyleSheet.create({
    containerview: {
        flex: 1,
    },
    texth3:{
        fontSize:16,
        fontWeight:"bold",
        alignSelf:'center',
        marginBottom:5,
    },
    para:{
        fontSize:16,
        alignSelf:'center',
        marginBottom:20,
    },
    manualLoginSection:{
        flex:1,
        padding:50,
        paddingTop:30,
        paddingBottom:0,
    },
    socialLoginSection:{
        flex:1,
        padding:50,
        paddingTop:30,
        paddingBottom:0,
    },
    loginFooter:{
        display:'flex',
        height:50,
        backgroundColor:'#f5f5f5',
    },
    textinput:{
        backgroundColor:'#f5f5f5',
        paddingTop:10,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        marginTop:5,
    },
    defaultBtn:{
        backgroundColor:'#1565c0',
        marginTop:10,
    },
    linkBtn:{
        marginTop:10,
    },
    btntext:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        padding:10,
        color:'#fff',       
    },
    linkbtntext:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'center',
        padding:10,
        color:'#1565c0',
    },
    defaultLinkBtn:{
        justifyContent:'center',
        padding:15,
        flexDirection:'column',
      },
      defaultLinkBtnTxt:{
        fontSize:18,
        color:'#8e8e8e',
        textAlign:'center',
        fontWeight:'900',
        letterSpacing:0.5,
        textDecorationLine:'underline',
        fontFamily:'CabinCondensed-Regular',   
      },
});