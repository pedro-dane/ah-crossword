import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { PaymentsStripe as Stripe  } from "expo-payments-stripe";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class PayFee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            cardNumber:"",
            expMonth: "",
            expYear: "",
            cvc: "",
            inProgress: false
        }
    }

    componentDidMount(){
        Stripe.setOptionsAsync({ publishableKey: "pk_test_X8JJYwAjQZNdhsvC3xCtmxmt00wtFHB5H2" });
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onHide = () => {
        this.setState({ visible: false });
    }

    async onSubmit(){
            this.setState({ inProgress: true } );
            const params = {
                number: this.state.cardNumber,
                expMonth: parseInt(this.state.expMonth),
                expYear: parseInt(this.state.expYear),
                cvc: this.state.cvc,
              };
              const token = await Stripe.createTokenWithCardAsync(params);
              this.setState({
                  inProgress: false
              }, ()=>{
                this.onHide();
                this.props.onPaymentComplete(token);
              })
        
        
    }

    render() {
        return (
            <Modal transparent={true} visible={this.state.visible}>
                <View style={styles.container}>
                    <View style={{ height: 420 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: '15%' }}>
                            <View style={{ flex: 0.15 }}></View>
                            {
                                    this.state.inProgress
                                    ?
                                    <View style={{ flex: 0.7, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent:'center' }}>
                                        <ActivityIndicator/>
                                        <View><Text>Payment in progress</Text></View>
                                    </View>
                                    :
                                    <View style={{ flex: 0.7, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' }}>
                                        <View style={{ height: 35, width: '100%', backgroundColor: '#3895D3', borderTopStartRadius: 10, borderTopEndRadius: 10, borderTopColor: '#3895D3', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Pay Now</Text>
                                        </View>
                                        <View style={{ height: 10 }}></View>
                                        <View style={{ width: '90%', alignItems:'center' }}><Text style={{ fontSize: 12, fontWeight: 'bold', color: 'gray' }}>CARD NUMBER</Text></View>
                                        <View style={{width: '90%',}}><TextInput onChangeText={(text)=>{ this.setState({ cardNumber: text })}} style={{ paddingLeft: 10, borderColor:'#ccc', borderWidth:1}} placeholder="Card Number"/></View>
                                        <View style={{width: '90%',}}>
                                            <TextInput onChangeText={(text)=>{ this.setState({ expMonth: text })}} style={{ paddingLeft: 10, borderColor:'#ccc', borderWidth:1}} placeholder="Exp Month"/>
                                            <TextInput onChangeText={(text)=>{ this.setState({ expYear: text })}} style={{ paddingLeft: 10, borderColor:'#ccc', borderWidth:1}} placeholder="Exp Year"/>
                                        </View>
                                        
                                        <View style={{width: '90%',}}>
                                            <TextInput onChangeText={(text)=>{ this.setState({ cvc: text })}} style={{ paddingLeft: 10, borderColor:'#ccc', borderWidth:1}} placeholder="CVV"/>
                                        </View>

                                        <TouchableOpacity onPress={() => { this.onSubmit() }} style={{ width: '90%', height: 35, marginTop: 25, borderRadius: 8, backgroundColor: '#3895D3', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Submit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.onHide() }} style={{ width: '90%', height: 35, marginTop: 10, borderRadius: 8, backgroundColor: '#3895D3', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Close</Text>
                                        </TouchableOpacity>
                                        <View style={{ height: 35 }}></View>
                                    </View>
                            }
                            <View style={{ flex: 0.15 }}></View>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}></View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});
