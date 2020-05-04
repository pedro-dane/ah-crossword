import React, { useState, } from 'react';
import { Scene, Router, Tabs, Actions, Stack, Drawer } from 'react-native-router-flux';
import { 
    View, 
    StatusBar, 
    Image, 
    SafeAreaView, 
    TouchableOpacity ,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyle } from './style';
import { TextInput } from 'react-native-gesture-handler';


const Header = ({time, goSetting, back, list, info, score, set, btimer, stop, changeTime,beditable, edit, rightNav}) => {

    return (
        <View style={GlobalStyle.header2}>
            <View style = {{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity style={[GlobalStyle.backbtn,{ marginLeft:10}]} onPress={back}>                        
                    <Icon 
                        name='arrow-left'
                        type='font-awesome'
                        size={20}
                        color='#4581E0'
                    />
                </TouchableOpacity>
                
            </View>
            <View style = {{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:3}} onPress={edit}>                        
                    <Icon 
                        name='clock'
                        type='feather'
                        size={20}
                        color='#000'
                    />
                </TouchableOpacity>
                {!beditable ? <Text style={{fontSize: 20, fontWeight:'bold',marginLeft:5 }}>{time}</Text>:
                    <TextInput 
                        style={{height:30, paddingLeft: 5, fontSize: 20}}
                        value = {time}
                        onChangeText = {(val)=>changeTime(val)}
                    />
                }
                {btimer ?<TouchableOpacity style={{marginLeft: 5}} onPress={stop}>                        
                    <Icon 
                        name='pause'
                        type='font-awesome'
                        size={20}
                        color='#000'
                    />
                </TouchableOpacity>:
                <TouchableOpacity style={{marginLeft: 5}} onPress={stop}>                        
                    <Icon 
                        name='play'
                        type='font-awesome'
                        size={20}
                        color='#000'
                    />
                </TouchableOpacity>}
            </View>
            <View style = {{flexDirection:'row', alignItems:'center', marginLeft: 10, width :80}}>
                <View style={[ {}]}>                        
                    <Icon 
                        name='plus-square'
                        type='font-awesome'
                        size={20}
                        color='#000'
                    />
                </View>
                <Text style={{fontSize: 20, fontWeight:'bold',marginLeft:5}}>{score}</Text>
            </View>
            <View style = {{ flexDirection:'row', alignItems:'center', }}>
                <TouchableOpacity style={GlobalStyle.topBtns} onPress = {list}>
                    <Icon 
                    name='list-ul'
                    type='font-awesome'
                    size={26}
                    color='#4581E0'
                    ></Icon>
                </TouchableOpacity>                    
                <TouchableOpacity style={GlobalStyle.topBtns} onPress = {info}>
                    <Icon 
                    name='info'
                    type='font-awesome'
                    size={26}
                    color='#4581E0'
                    ></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={[GlobalStyle.topBtns, {marginRight:10}]} onPress = {set}>
                    <Icon 
                    name='cog'
                    type='font-awesome'
                    size={26}
                    color='#4581E0'
                    ></Icon>
                </TouchableOpacity>
            </View>
        </View> 
    );
};

export default Header;