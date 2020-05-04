import * as React from 'react';
import { Text, View, ActivityIndicator, ScrollView, Image, Dimensions} from 'react-native';
import { GlobalStyle } from './../../components/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const {height,width} = Dimensions.get('window');

export default class Featured extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }
    componentDidMount(){
        return fetch('http://dev.crosswordsakenhead.com/wp-json/restapi/v1/categories')
            .then((Response) => Response.json())
            .then( (ResponseJson) => {
                let data = [];
                data = Object.keys(ResponseJson);
                data.map((key)=>{
                    this.state.dataSource.push(ResponseJson[`${key}`]);
                })
                this.setState({
                    isLoading:false,
                })
            })
            .catch((error) => {
                console.log(error)
            });            
    }

    gotoPlayGame(index){

        this.props.navigation.navigate('chapter', {index : index} );
    }

    render(){
        let imgurl = require('./../../../assets/img/box-default-screen.png');
        if(this.state.isLoading){
            return (
                <View style={GlobalStyle.containerview}>
                    <View style={GlobalStyle.subscribeBar}>
                        <View><Text style={GlobalStyle.textHolder}>14 Days Left in your Trial</Text></View>
                        <View style={GlobalStyle.btnHolder}>
                            <TouchableOpacity>
                                <Text style={GlobalStyle.smallBtn}>Subscribe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ActivityIndicator />
                </View>
            );
        }else{
            return (
                <View style={GlobalStyle.containerview}>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                        <View style={GlobalStyle.subscribeBar}>
                            <View><Text style={GlobalStyle.textHolder}>6 Days Left in your Trial</Text></View>
                            <View style={GlobalStyle.btnHolder}>
                                <TouchableOpacity>
                                    <Text style={GlobalStyle.smallBtn}>Subscribe</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView scrollEventThrottle={10} style={{ flex:1,height:280,}}>
                            <View style={GlobalStyle.scrollViewHolder} >
                                <Text style={GlobalStyle.scrollViewTitle}> Our Collection </Text>
                                <View style={GlobalStyle.scrollViewHorizontal}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>                                    
                                        { 
                                            this.state.dataSource.map((category,key) => {
                                                {!(category.img)? imgurl=require('./../../../assets/img/box-default-screen.png'):imgurl={uri:category.img}}
                                                return (
                                                    <View key={key} style={GlobalStyle.scrollViewBoxs}>
                                                        <View style={GlobalStyle.scrollViewBoxLeft}>
                                                            <View style={GlobalStyle.scrollViewBoxImgHolder}>
                                                                <Image source={imgurl} style={ GlobalStyle.scrollViewBoxImg } />
                                                            </View>
                                                        </View>
                                                        <View style={GlobalStyle.scrollViewBoxContent}>                                                            
                                                            <View style={GlobalStyle.scrollViewBoxTitle}>
                                                                <Text style={GlobalStyle.scrollViewBoxTitleText}>{category.name}</Text>
                                                            </View>
                                                            <View style={GlobalStyle.scrollViewBoxDescription}>
                                                                <Text style={GlobalStyle.scrollViewBoxDescriptionText}>this is category description</Text>
                                                            </View>
                                                            <View style={ GlobalStyle.scrollViewBoxLabel }>
                                                                <Text style={ GlobalStyle.scrollViewBoxLabelText }>Trial Now</Text>
                                                            </View>
                                                        </View>                                                                                                                                
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={{marginTop:20,paddingHorizontal:20,flex:2,}} >
                            <Text style={GlobalStyle.defaultGroupTitle}>Free Games</Text>
                            <Text style={GlobalStyle.defaultGroupDescription}>Enjoy with our free crosswords even after Trial period</Text>
                            
                            <View style={{flex:1,height:200,marginTop:20,borderWidth:1,borderColor:'#e0e0e0',borderRadius:5,flexDirection:'row',}}>                                
                                <View style={{flex:1,justifyContent: 'center', alignItems:'center',}}>
                                    <View style={{width:100,height:100,}}>
                                        <Image source={require('../../../assets/img/puzzelimagesize.png')} style={{flex:1,height:null,width:null,resizeMode:'cover',}}/>
                                    </View>
                                    
                                </View>
                                <View style={{flex:1,justifyContent: 'center', alignItems:'center',}}>
                                    <Text style={GlobalStyle.defaultBoxTitle}>This is crossword Name</Text>
                                    <TouchableOpacity onPress={()=>this.gotoPlayGame(0)}><Text style={ GlobalStyle.scrollViewBoxLabelText }>Play</Text></TouchableOpacity>
                                </View>
                            </View>

                            <View style={{flex:1,flexDirection:'row',marginTop:20,}}>
                                <View style={{flex:1,justifyContent: 'center', alignItems:'center',paddingVertical:20, borderWidth:1,borderColor:'#e0e0e0',borderRadius:5,marginRight:10,}}>                                
                                    <View style={{width:100,height:100,}}>
                                        <Image source={require('../../../assets/img/puzzelimagesize.png')} style={{flex:1,height:null,width:null,resizeMode:'cover',}}/>
                                    </View>
                                    <View style={{marginTop:5,justifyContent: 'center', alignItems:'center',}}>
                                        <Text style={{ fontSize:16,paddingHorizontal:20,marginTop:5,}}>This is crossword Name</Text>
                                        <TouchableOpacity><Text style={ GlobalStyle.scrollViewBoxLabelText }>Play</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flex:1,justifyContent: 'center', alignItems:'center',paddingVertical:20,borderWidth:1,borderColor:'#e0e0e0',borderRadius:5,marginLeft:10,}}>                                
                                    <View style={{width:100,height:100,flex:1,}}>
                                        <Image source={require('../../../assets/img/puzzelimagesize.png')} style={{flex:1,height:null,width:null,resizeMode:'cover',}}/>
                                    </View>
                                    <View style={{marginTop:5,justifyContent: 'center', alignItems:'center',flex:1,}}>
                                        <View style={{flex:1,}}>
                                            <Text style={{ fontSize:16,paddingHorizontal:20,marginTop:5,}}>This is crossword Name</Text>
                                        </View>
                                        <View style={{flex:1,}}>
                                            <Text style={ GlobalStyle.scrollViewBoxLabelText }>Play</Text>
                                        </View>                                        
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
            );
        }        
    }
}