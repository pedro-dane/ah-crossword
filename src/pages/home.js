import React, { useState, Component, } from 'react';
import { Scene, Router, Tabs, Actions, Stack, Drawer } from 'react-native-router-flux';
import { View, StatusBar, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import DrawerContent from '../components/DrawerContent';
import { GlobalStyle } from './../components/style';


import Featured from './home-tabs/featured';
import Packs from './home-tabs/packs';
import Archive from './home-tabs/archive';
import Leaderboard from './home-tabs/leaderboard';
import ChapterScreen from './chapter';
import InfoScreen from './info';

import Header from '../components/Header';
import Header2 from '../components/Header2';

import Selectpayment from './selectpayment';

class Home extends Component{
    render(){
        return (        
            <SafeAreaView style={GlobalStyle.containerview}>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}  />          
                <View style={GlobalStyle.tabHolder}>
                    <Stack key="children" height={40} navBar = {Header} >
                    <Drawer
                            key="drawer"
                            onExit={() => {
                            console.log('Drawer closed');
                            }}
                            onEnter={() => {
                            console.log('Drawer opened');
                            }}
                            contentComponent={DrawerContent}
                            // drawerIcon={MenuIcon}
                            drawerWidth={300}>
                            <Tabs 
                                key="tabbar" 
                                activeTintColor="#fff"  /* Active tab Color */
                                inactiveTintColor="#ccc" /* Inactive tabs color */
                                indicatorStyle={{
                                    backgroundColor: '#fff',
                                    height: 2
                                }} 
                                tabBarPosition="top" 
                                tabBarStyle={GlobalStyle.hometabbar}
                                swipeEnabled={false}
                            >
                                <Scene 
                                    key='Featuredtab' 
                                    title='Featured' 
                                    onPress={() => Actions.Featuredtab()}
                                    component={Featured} 
                                    /* icon={TabIcon}  */
                                    hideNavBar
                                    initial/>
                                <Scene 
                                    key='Packstab' 
                                    title='Packs' 
                                    onPress={() => Actions.Packstab()}
                                    component={Packs} 
                                    /* icon={TabIcon} */ 
                                    hideNavBar />
                                <Scene 
                                    key='Archivetab' 
                                    title='Archive' 
                                    onPress={() => Actions.Archivetab()}
                                    component={Archive} 
                                    /* icon={TabIcon}  */
                                    hideNavBar />
                                <Scene 
                                    key='Leaderboardtab' 
                                    title='Leaderboard'
                                    onPress={() => Actions.Leaderboardtab()}
                                    /* icon={TabIcon}  */
                                    component={Leaderboard} 
                                    hideNavBar />
                            </Tabs>
                        </Drawer>
                        <Scene key="chapter" component={ChapterScreen} title="" hideNavBar />
                        <Scene key="info" component={InfoScreen} title="" hideNavBar />
                    </Stack>
                </View>
            </SafeAreaView>
        );   
    }
}

export default Home;