import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button, Dimensions, ImageBackground, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
    width: 300,
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

class DrawerContent extends React.Component {
  constructor(){
    super()
    this.state = {
      userName: "",
      email: ""
    }
  }

  async componentDidMount(){
    const name = await AsyncStorage.getItem("name");
    const email = await AsyncStorage.getItem("email");
    this.setState({ userName: name, email: email });
  }

  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  async onLogout(){
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("email");
    Actions.login()
  }

  render() {
    const photo = null;
    const name = this.state.userName;
    const email = this.state.email;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={backImg}
          resizeMode='stretch'
          style={[styles.background, ]}>
          <Image source={photo ? {uri: photo} : avatar} style={styles.avatar} />
          {
            name ? <Text style={styles.nameText}>{name}</Text> :
            <Text style={styles.nameText}>{email}</Text>
          }
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
        <TouchableOpacity style={styles.item} onPress={this.onLogout.bind(this)}>
          <Icon 
              name='sign-out'
              type='font-awesome'
              size={20}
              color='#333'
          />
          <Text style = {{fontSize:20, marginLeft: 20, color:'#333', fontWeight:'bold'}}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default DrawerContent;
