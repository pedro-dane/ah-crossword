import React, { useState, useEffect} from 'react';
import { Scene, Router, Tabs, Actions, Stack, Drawer } from 'react-native-router-flux';
import { View,
    StatusBar,
    Image, 
    SafeAreaView, 
    TouchableOpacity ,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyle } from './style';


const Header = () => {

    return (
        <View style={GlobalStyle.header}>
            <TouchableOpacity style={GlobalStyle.menubtn} onPress={() =>Actions.drawerOpen()}>                        
                <Icon 
                    name='bars'
                    type='font-awesome'
                    size={20}
                    color='#fff'
                />
            </TouchableOpacity>
            <View style={GlobalStyle.logoholder}>
                <Image style={{ resizeMode:'center',alignSelf:'center',marginTop: -3, width: 150, height: 30}} source={require('../../assets/img/logo-white.png')} />
            </View>
            <View style={GlobalStyle.notificationbtn}>
                <Icon 
                name='bell'
                type='font-awesome'
                size={20}
                color='#fff'
                ></Icon>
            </View>                    
        </View> 
    );
};

export default Header;