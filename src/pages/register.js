import React, {useState, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CheckBox, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import * as Constants from "../util/Constants";
import PayFee from "./payFee";

import * as ApiCalls from "../util/ApiCalls";

export default class Register extends Component {

    constructor(){
        super()
        this.state = {
            plans: {},
            selected:-1,
            selectedPlan: 0,
            userName: "",
            userEmail: "",
            userPassword: "",
            userId: "",
            planAmount: ""
        }
    }
    componentDidMount(){
        this.onGetPlan();
    }

    onPayment = () =>{
        this._payFee.onShow();
    }



    onPaymentComplete = (token) => {
        console.log("Payment completed...", token);
        let url = "/orders";
        let header = {  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'accept': 'application/json' }
        let params = { user: this.state.userId,
                       level: this.state.selectedPlan,
                       token: token.tokenId,
                       price: this.state.planAmount,
                       payment_type: "stripe",
                       gateway:"stripe",
                       gateway_enviroment:"test",
                       pay_datetime: (new Date()).toLocaleString()
                    };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        ApiCalls.post(url, formBody, header)
        .then((res)=>{
                this.onUpdatePlan();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return (            
        <View style={styles.containerview}>
            <PayFee ref={(payFee)=> this._payFee = payFee } onPaymentComplete={this.onPaymentComplete}/>
            <View style={styles.manualLoginSection}>
                <Text style={styles.texth3}>Create an Account </Text>
                <TextInput onChangeText={(text)=>{ this.setState({ userName: text })}} value={this.state.userName} autoCorrect={false} placeholder={'Username'} style={styles.textinput}></TextInput>
                <TextInput onChangeText={(text)=>{ this.setState({ userEmail: text })}} value={this.state.userEmail}  autoCorrect={false} placeholder={'Email'} style={styles.textinput}></TextInput>
                <TextInput onChangeText={(text)=>{ this.setState({ userPassword: text })}} value={this.state.userPassword} secureTextEntry={true} placeholder={'Password'} style={styles.textinput}></TextInput>
                <Text></Text>
                <TouchableOpacity onPress={this.onRegisterWithEmailPassword} style={styles.defaultBtn}>
                    <Text style={styles.btntext}>Create Account</Text>                
                </TouchableOpacity>
                <View>
                    <Text></Text>
                    <CheckBox value={false}></CheckBox>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 70}}>
                {
                    Object.entries(this.state.plans).map((item, index)=>{
                        return <TouchableOpacity key={index} onPress={()=>{ this.setState({ selected: index, selectedPlan: item[1].id, planAmount: item[1].billing_amount }) }}>
                                    <View key={index} style={{alignItems:'center', backgroundColor:this.state.selected == index ? '#ccc' : '#fff', padding: 10, borderRadius: 10}}>
                                        <Text>{item[1].initial_payment}</Text>
                                        <Text>{item[1].name}</Text>
                                    </View>
                                </TouchableOpacity>
                    })
                }
            </View>
            <View style={styles.socialLoginSection}>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.facebookbutton.bind(this)}>
                    <Text style={styles.btntext}>Signup with FaceBook</Text>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.defaultBtn} onPress={this.gmailloginbutton.bind(this)}>
                    <Text style={styles.btntext}>Sign up with Gmail</Text>                
                </TouchableOpacity>
            </View>
            <View style={styles.loginFooter}>
                <TouchableOpacity style={styles.defaultLinkBtn} onPress={() => Actions.login()}>
                    <Text style={styles.defaultLinkBtnTxt}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    onStripePayment = () =>{
        
    }


    onGetPlan = () =>{
        let url = "/levels";
        ApiCalls.get(url, {})
        .then((res)=>{
           console.log(res);
           this.setState({
                plans: res
           })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onUpdatePlan = () =>{
        let url = "/level/update";
        let params = { email: this.state.userEmail, level: this.state.selectedPlan};
        
        let header = {  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'accept': 'application/json' }

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        ApiCalls.post(url, formBody, header)
        .then((res)=>{
           console.log(res);
           AsyncStorage.setItem("email", this.state.userEmail, (err)=>{
                    this.setState({
                        selected:-1,
                        selectedPlan: 0,
                        userName: "",
                        userEmail: "",
                        userPassword: ""
                })
                Alert.alert("Success", "User has been registered.");
                Actions.home();
           })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onRegisterUser = (params) =>{
            let url = "/register";
            let header = {  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'accept': 'application/json' }
    
            var formBody = [];
            for (var property in params) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(params[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            ApiCalls.post(url, formBody, header)
            .then((res)=>{
                console.log(res);
                if(res.code == 200){
                    this.setState({ userEmail: params["email"], userId: res.user_id });
                    // this.onUpdatePlan(params["email"]);
                    this.onPayment();
                }
                else if(res.code == 406){
                    Alert.alert(res.message);
                }
                else{
                    Alert.alert(res.message);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    onRegisterWithEmailPassword = () =>{
        if(this.state.selectedPlan != 0){
            if(this.state.userName != "" && this.state.userEmail != "" && this.state.userPassword != ""){
                let params = {"username": this.state.userName, "email": this.state.userEmail, "password": this.state.userPassword };
                this.onRegisterUser(params);
            }
            else{
                Alert.alert("Field Missing", "Username, Email and Password are Mandatory fields");
            }
        }
        else{
            Alert.alert("Alert", "Please select a plan to register.");
        }
    }

    async  facebookbutton() {
        try {
            if(this.state.selectedPlan != 0){
                await Facebook.initializeAsync(Constants.FB_APP_ID);
                const {
                    type,
                    token,
                    expires,
                    permissions,
                    declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
                if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
                    const { id, name, email } = await response.json();
                    console.log(id, name, email);
                    let params = {"username": id, "email": email, "password": id };
                    this.onRegisterUser(params);
                } else {
                    Alert.alert('Sign Up!','Registration cancel by user!'); 
                }
            }
            else{
                Alert.alert("Alert", "Please select a plan to register.");
            }
        } catch (error) {
            console.log(error)
            Alert.alert(`Error: ${error}`);
        }
    }

    async gmailloginbutton(){
        try {
            if(this.state.selectedPlan != 0){
                const result = await Google.logInAsync({
                        androidClientId: Constants.GOOGLE_ANDROID_APP_ID,
                        iosClientId: Constants.GOOGLE_IOS_APP_ID,
                        scopes: ['profile', 'email'],
                    });        
                    if (result.type === 'success') {
                        console.log(result);
                        let params = {"username": result.user.id, "email": result.user.email, "password": result.user.id };
                        this.onRegisterUser(params);
                    } else {
                        Alert.alert('Sign Up!','Registration cancel by user!'); 
                    }
            }
            else{
                Alert.alert("Alert", "Please select a plan to register.");
            }
        } catch (e) {
            Alert.alert('Error !', e);
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