import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator, Text, } from 'react-native';
import {WebView} from 'react-native-webview';

import PDFReader from 'rn-pdf-reader-js';
import PDFView from 'react-native-view-pdf';

const fetchURL = 'http://dev.crosswordsakenhead.com/wp-json/restapi/v1/crosswords/8711';

class InfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pdfUri : '',
            loading : true,
        }
    }
    componentDidMount(){
        fetch(fetchURL)
            .then(response => response.json() )
            .then(data =>{
                this.setState({pdfUri: data.intro, loading:false});
            } )
            .catch(error => console.log(error));
    }
    render(){
        if( this.state.loading )
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        return (
            <View style = {styles.container} >
                <PDFReader
                    source={{
                    uri:this.state.pdfUri,
                    }}
                />
          </View>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
export default InfoScreen;