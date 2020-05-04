import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button, Dimensions, ImageBackground, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import backImg from '../../assets/img/back6.png';
import avatar from '../../assets/img/girl.png';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width*0.8,
  },
  background: {
    alignItems: 'center',
    width: width*0.8 + 12,
    height: height/3 + 20,
    marginTop: -2,
    paddingTop: 20,
  },
  avatar: {
    borderRadius:55,
    justifyContent:'center',
    alignItems:'center',
    width: 110,
    height: 110,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  item:{
    flexDirection: 'row',
    paddingBottom: 20,
    paddingLeft: 30,
    alignItems: 'center',
  }
});

class ToggleDrawer extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  render() {
    const photo = null;
    const name = 'Best girl';
    const email = 'Test@example.com';
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backImg}
          resizeMode='stretch'
          style={[styles.background, ]}>
          <Image source={photo ? {uri: photo} : avatar} style={styles.avatar} />
          {name ? <Text style={styles.nameText}>{name}</Text> :
          <Text style={styles.nameText}>{email}</Text>}
        </ImageBackground>
        <TouchableOpacity style = {styles.item} onPress={Actions.pop}>
            <Icon 
                name='home'
                type='font-awesome'
                size={20}
                color='#333'
            />
          <Text style={{fontSize:20,marginLeft: 20, color:'#333', fontWeight:'bold'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={Actions.pop}>
          <Icon 
              name='sign-out'
              type='font-awesome'
              size={20}
              color='#333'
          />
          <Text style = {{fontSize:20, marginLeft: 20, color:'#333', fontWeight:'bold'}}>SignOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default ToggleDrawer;
