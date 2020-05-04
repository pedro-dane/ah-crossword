import React from 'react';
import { Scene, Stack, Router, Tabs, Drawer} from 'react-native-router-flux';

import Login from './src/pages/login';
import Launch from './src/pages/launch';
import Home from './src/pages/home';
import Register from './src/pages/register';
import DrawerContent from './src/components/DrawerContent';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { GlobalStyle } from './src/components/style';

import ChapterScreen from './src/pages/chapter';

import Header from "./src/components/Header";
import Featured from './src/pages/home-tabs/featured';
import Packs from './src/pages/home-tabs/packs';
import Archive from './src/pages/home-tabs/archive';
import Leaderboard from './src/pages/home-tabs/leaderboard';
import InfoScreen from './src/pages/info';

import { View, StatusBar, Image, SafeAreaView, TouchableOpacity } from 'react-native';

//Leaderboard
//'../ /home-tabs/featured';




const getFonts = () => Font.loadAsync({
    'PassionOne-Bold': require('./assets/fonts/PassionOne-Bold.ttf'),
    'CabinCondensed-Regular': require('./assets/fonts/CabinCondensed-Regular.ttf')
  });

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false
        }
    }

    render(){

        if (this.state.fontsLoaded) {
            return (
                <Router backAndroidHandler={()=>{
                    return true;
                }}>
                    <Stack key="root" hideNavBar>
                        <Scene key="launch" component={Launch} title="Start Trial" hideNavBar="true" />
                        <Scene key="login" component={Login} title="Login" />
                        <Scene key="register" component={Register} title="Register" />
                        <Stack>
                            <Scene key="chapter" component={ChapterScreen} title="" hideNavBar />
                        </Stack>
                        {/* <Scene key="home" component={Home} /> */}
                        <Stack key="home" height={40} navBar = {Header} >
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
                    </Stack>
                   
                </Router>
            );

        } else {
            return (<AppLoading
                startAsync={getFonts}
                onFinish={()=>this.setState({fontsLoaded: true})} 
              />)
        }
    }
}