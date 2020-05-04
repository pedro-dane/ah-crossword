import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class ChapterScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {

        }
    };

    render(){
        return (
            <View style = {{ flex:1}}>
                <Text >this is setting screen.</Text>
            </View>
        );
    };
}

export default ChapterScreen;