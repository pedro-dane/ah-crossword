import React from 'react';
import { Actions} from 'react-native-router-flux';

import { Text, View, SafeAreaView, TouchableOpacity,ScrollView} from 'react-native';
import { GlobalStyle } from './../components/style';
import { Icon } from 'react-native-elements';


const Launch = () => {
    return (
      <SafeAreaView style={GlobalStyle.containerview}>
        <View style={GlobalStyle.headerview}>
          <Text style={GlobalStyle.texth1}>
            Welcome to Akenhead Crosswords
            </Text>
        </View>
        <View style={GlobalStyle.headerunderlineview}>
          <View style={GlobalStyle.sortunderline}></View>
        </View>
        <View style={GlobalStyle.contentview}>
          <ScrollView>
            <Text style={GlobalStyle.texth3}>
              What's in the app:
            </Text>
            <Text style={GlobalStyle.texth3}>
              Free Game:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              Drag & Drop:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              The Times Crossword:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              Sunday Times:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              What's in the app:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              What's in the app:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
            <Text style={GlobalStyle.texth3}>
              What's in the app:
            </Text>
            <Text style={GlobalStyle.para}>
              paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section paragraph section
            </Text>
          </ScrollView>
        </View>
        <View style={GlobalStyle.footerview}>
          <TouchableOpacity style={GlobalStyle.iconBtn} onPress={() => {
              console.log("test")
              Actions.home()
            }}>
            <Text style={GlobalStyle.iconBtnTxt}>Try it For 15 Days</Text>
            <Icon 
            name='angle-right'
            type='font-awesome'
            size={50}
            color='#3f7cf9'
            style={GlobalStyle.btnIcon}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyle.defaultLinkBtn} onPress={() => Actions.login()}>
            <Text style={GlobalStyle.defaultLinkBtnTxt}>Have a subscription? Log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
export default Launch;