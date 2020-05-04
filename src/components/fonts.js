import * as React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';



export default class Fonts {
  render(){

    const getFonts = () => Font.loadAsync({
      'PassionOne-Bold': require('../../assets/fonts/PassionOne-Bold.ttf'),
      'CabinCondensed-Regular': require('../../assets/fonts/CabinCondensed-Regular.ttf')
    });

    //its allow to load cusotm font
    const [fontsLoaded, setFontsLoaded] = useState(false);
    
    if(fontsLoaded){
      return '';
    }else{
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={()=>setFontsLoaded(true)}
        />
      )    
    }
  }    
}
//export default Fonts;