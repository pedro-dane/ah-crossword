import React from 'react';
import { StyleSheet, } from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Overlay,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import DrawerContent from './DrawerContent';
import Profile from './../pages/profile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: '#ffffff',
  shadowOpacity: 1,
  shadowRadius: 3,
});



const AppNavigator = () => (
  <Router
    getSceneStyle={getSceneStyle}>
    <Overlay key="sidemenuoverlay">
        <Lightbox key="sidemenulightbox">
          <Stack key="root" hideNavBar >
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
              drawerWidth={350}>
              <Scene key="default-profile" component={Profile} hideNavBar />              
            </Drawer>
          </Stack>
        </Lightbox>
    </Overlay>
  </Router>
);

export default AppNavigator;
