import React from 'react';
import {View, Text, 
    Dimensions, 
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    ToastAndroid,
    FlatList,
    Linking,
} from 'react-native';
import Grid from 'react-native-grid-component';
import { Icon } from 'react-native-elements';
import Modal, {SlideAnimation, ModalContent } from 'react-native-modals';

import Header2 from '../components/Header2';
import { GlobalStyle } from '../components/style';


const {width, height} = Dimensions.get('window');

const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keys2  =['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keys3 = ['...', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'];

const jsonUrl = [
    'http://dev.crosswordsakenhead.com/wp-json/restapi/v1/crossword/8711/chapters/2',
    'http://dev.crosswordsakenhead.com/wp-json/restapi/v1/crossword/8711/chapters/2',
]

const fetchURL = 'http://dev.crosswordsakenhead.com/wp-json/restapi/v1/crosswords/8711';

const char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class ChapterScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            index : 0,
            chapterName: '',
            chapterIndex: 0,
            row: 0,
            col : 0,
            noOfclues : 0,
            grid : [],
            clues : {},
            activeClueBoxes : [],
            activeClue: [],
            boxInFocus:'',
            hh : 0,
            dispText1: 'Surgery to improve how you look?',
            dispText2:'',
            curGridItem : 0,
            initData : [],
            originData: [],
            clueIndex : 0,
            timer : null,
            elapsed : '00:00',
            score : '00',
            iTime : 0,
            bListInput : false,
            btimer : false,
            beditable : false,
            bconcede : false,
            boneletter: false,
            bextraletter: false,
            rightAnswerCnt : 0,
            bsetting: false,
            btnloading : true,
            bsolution : false,
            bmarkArr : {},
        }
        this.state.index = this.props.navigation.getParam('index');
    };
    
    componentDidMount = async() => {
        this.state.originData = await this.getDataFromApi();
        this.state.initData = this.state.originData.clues;
        this.makeGridData(this.state.originData);
    }

    componentWillUnmount(){
        if( this.state.btimer )
            clearInterval(this.state.timer);
    }
    getDataFromApi = async()=> {
        var index = this.state.index;
        var uri = jsonUrl[index];
        try {
          let response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        });
        let responseJson = await response.json();
          return responseJson;
        } catch (error) {
          console.error(error);
        }
    }
    makeGridData = async(data)=>{
        var retData = [];
        var row = parseInt(data.rows);
        var col = parseInt(data.cols);
        for( var i = 0 ; i < row ; i++)
           for ( var j = 0 ; j < col ; j++)
               retData.push({id: (i*col+j).toString(), letter:null, clues:[], label:null, active: 0, inputData:'', double: false, style:'grid'});

        if( retData.length > 0 )
        {
            await this.makeDataWithVal(data, retData, row, col);
        }
    }

    makeDataWithVal = (data, retData, row, col)=>{
        var len = data.clues.length;
        var dataTemp = {};
        var bb = false;
        for( let i = 0 ; i < len; i++)
        {
            var item = data.clues[i];
            var dir = item.dir;
            var ans = item.word;
            var x = parseInt(item.X) - 1;
            var y = parseInt(item.Y) - 1;
            var label = item.number;
            var tempitem = {};

            var number = (x)*col + (y);
            retData[number].label = label;

            if( dir === "Across")
            {
                var tempClues = [];
                for( let j = 0 ; j < ans.length ; j++)
                {
                    if( retData[number+j].letter === null ) retData[number+j].letter = ans[j];
                    tempClues.push((number + j).toString());
                    retData[number+j].clues.push("Ac"+label);
                }  
                tempitem["boxes"] = tempClues;
            }
            if( dir === "Down")
            {
                var tempClues = [];
                var tempitem = {};
                for( let j = 0 ; j < ans.length ; j++)
                {
                    if( (number+j*col) < col*row )
                        if( retData[number+j*col].letter === null ) retData[number+j*col].letter = ans[j];
                    tempClues.push((number + j*col).toString());
                    retData[number + j*col].clues.push("Dn"+label);
                }  
                tempitem["boxes"] = tempClues;
            }
            if( tempitem.boxes.length > 0){
                tempitem["clue"] = item.clue1;
                tempitem["clue2"] = item.clue2;
                tempitem["answer"] = ans;
                tempitem["direction"] = dir;
                tempitem["number"] = label;
                var key = dir === "Across" ? "Ac"+label : "Dn" + label;
                dataTemp[`${key}`] = tempitem;
                this.state.bmarkArr[`${key}`]= -1;
            }
            if( i === 0 )
            {
                this.state.dispText1 = item.clue1;
                this.state.dispText2 = item.clue2;
                this.state.curGridItem = number;
                bb = true;
            }
        }

        if( bb )
        {
            this.setState({
                chapterName : data.chapterName,
                chapterIndex : parseInt(data.chapter_index),
                row : row,
                col: col,
                noOfclues: parseInt(data.no_of_clues),
                grid : retData,
                hh : width*row/col,
                clues : dataTemp,
                loading : false,
            })
        }
    }

    startTimer(){
        this.state.timer = setInterval(() => {
            var m = 0;
            var s = 0;
            var h = (this.state.iTime/3600|0);
            m = (this.state.iTime/60|0);
            var strm = m < 10 ? '0' + m.toString(): m.toString();
            s = this.state.iTime % 60;
            var strs = s < 10 ? '0' + s.toString() : s.toString();
            var strtime = h > 0 ? h+':'+strm+':'+strs :strm+':'+strs;
            this.setState({elapsed: strtime});
            this.state.iTime++;
        }, 1000);
    }
    _renderItem = (data, i) => {
        if( data.letter === null )
            return <View style={[{ backgroundColor: 'black', height: width/this.state.row - 2 }, GlobalStyle.item]} key={i}>
            </View>
        else {
            var color = 'white';
            if( data.active === '1' ) color = '#A0D5FD';
            if( data.active === '2' ) color = '#FFD000';
            return <TouchableOpacity style={[{ backgroundColor: color, height: width/this.state.row - 2 }, GlobalStyle.item]} key={i}
                    onPress = {() => this.onGridItemClk(data)}
                >
                <Text style={{fontSize: 8}}>{data.label}</Text>
                <View style={{width:'100%', alignItems:'center', marginTop: -5}} key={i}>
                    {this.state.bsolution ? <Text style={{fontSize: 14}}>{data.letter.toUpperCase()}</Text>:
                    <Text style={{fontSize: 14}}>{data.inputData.toUpperCase()}</Text>}
                </View>
            </TouchableOpacity>
        }
        
    };
    
    _renderPlaceholder = i => {return <View style={[GlobalStyle.item, {height: width/this.state.row - 2, borderColor:'#999'}]} key={i} />};
    
    onGridItemClk= (data) => {
        this.setState({loading:false});
        if ( this.state.beditable ){
            ToastAndroid.show("Please input the elapsed time.", ToastAndroid.LONG);
            return;
        }
        if( !this.state.btimer ) {this.state.iTime = 0; this.startTimer();this.state.btimer = true;}
        this.state.activeClueBoxes.map((d)=>{
            this.state.grid[parseInt(d)].active = '0';
        })
        var id = data.id;
        var clues = data.clues;
        var items = [];
        var double = data.double;
        clues.map((item, i)=>{
            items[i] = this.state.clues[item];
        })

        if( double && items.length > 1)
        {   
            this.state.dispText1 = items[1].clue;
            this.state.dispText2 = items[1].clue2;
            items[1].boxes.map((d) => {
                    this.state.activeClueBoxes.push(d);
                    if( d === id ){
                        this.state.grid[parseInt(d)].active = '2';
                        this.state.grid[parseInt(d)].double = !this.state.grid[parseInt(d)].double;
                    } 
                    else this.state.grid[parseInt(d)].active = '1';
                    
                })
        }
        else
        {
            this.state.dispText1 = items[0].clue;
            this.state.dispText2 = items[0].clue2;
            items[0].boxes.map((d) => {
                this.state.activeClueBoxes.push(d);
                if( d === id )
                {
                    this.state.grid[parseInt(d)].active = '2';
                    this.state.grid[parseInt(d)].double = !this.state.grid[parseInt(d)].double;
                }
                else this.state.grid[parseInt(d)].active = '1';
            })
            
        }
        this.setState({curGridItem:parseInt(id)});
    }
    gotoSetting(){
        
    }
    gotoBack(){
        this.props.navigation.goBack();
    }
    gotoList(){
        this.setState({bListInput:!this.state.bListInput});
    }

    gotoInfo = async()=>{
        this.props.navigation.navigate('info');
    }

    gotoSet(){
        this.setState({bsetting: true});
    }

    stop(){
        if ( this.state.beditable ){
            ToastAndroid.show("Please input the elapsed time.", ToastAndroid.LONG);
            return;
        }
        if ( this.state.iTime === 0 ){
            ToastAndroid.show("Please start the Game.", ToastAndroid.LONG);
            return;
        }
        if( this.state.btimer )
            clearInterval(this.state.timer);
        else this.startTimer();
        this.setState({btimer: !this.state.btimer});
    }
    changeTime(val){
        let strArr = val.split
    }
    onEdit(){
        if( this.timer && !this.state.beditable)
        {
            clearInterval(this.state.timer);
            this.startTimer();
        }
        this.setState({beditable: !this.state.beditable});
    }

    onTextClk(){
        var index = this.state.clueIndex;
        this.state.dispText1 = this.state.initData[index].clue1;
        this.state.dispText2 = this.state.initData[index].clue2;
        var x = parseInt(this.state.initData[index].X);
        var y = parseInt(this.state.initData[index].Y);
        var id = ((x-1)*this.state.col + (y-1));
        this.onGridItemClk(this.state.grid[id]);
    }
    prevSentence(){
        var index = this.state.clueIndex;
        var newindex = (index) === 0 ? this.state.initData.length-1 : index - 1;
        this.state.dispText1 = this.state.initData[newindex].clue1;
        this.state.dispText2 = this.state.initData[newindex].clue2;
        this.state.clueIndex = newindex;
        var x = parseInt(this.state.initData[newindex].X);
        var y = parseInt(this.state.initData[newindex].Y);
        var id = ((x-1)*this.state.col + (y-1));
        var dir = this.state.initData[newindex].dir;
        this.onGridItemMark(this.state.grid[id], dir);
    }
    nextSentence(){
        var index = this.state.clueIndex;
        var newindex = (index + 1) === this.state.initData.length ? 0 : index + 1;
        this.state.dispText1 = this.state.initData[newindex].clue1;
        this.state.dispText2 = this.state.initData[newindex].clue2;
        this.state.clueIndex = newindex;
        var x = parseInt(this.state.initData[newindex].X);
        var y = parseInt(this.state.initData[newindex].Y);
        var id = ((x-1)*this.state.col + (y-1));
        var dir = this.state.initData[newindex].dir;
        this.onGridItemMark(this.state.grid[id], dir);
    }
    onGridItemMark= async(data, dir) => {
        this.state.activeClueBoxes.map((d)=>{
            this.state.grid[parseInt(d)].active = '0';
        })
        var id = data.id;
        var clues = data.clues;
        var items = [];
        var double = data.double;
        clues.map((item, i)=>{
            items[i] = this.state.clues[item];
        })

        await items.map((index)=>{
            if( dir === index.direction)
                index.boxes.map((d) => {
                    this.state.activeClueBoxes.push(d);
                    if( d === id ){
                        this.state.grid[parseInt(d)].active = '2';
                    } 
                    else this.state.grid[parseInt(d)].active = '1';
                    
                })
        })
        this.setState({curGridItem:parseInt(id)});
    }

    onKeyClk=(ch)=>{
        console.log(ch);
        if( ch === "...") return;
        
        if( ch === "DEL")
        {
            this.calcuMarks(0, 0);
            this.state.grid[this.state.curGridItem].inputData = '';
            this.state.curGridItem--;
            if( this.state.curGridItem < 0 ) this.state.curGridItem = this.state.col*this.state.row-1;
            if( this.state.grid[this.state.curGridItem].letter === null )
            {
                while(this.state.grid[this.state.curGridItem].letter === null)
                    this.state.curGridItem--;

            }
            
            this.onGridItemClk(this.state.grid[this.state.curGridItem]);

            return;
        }
        if( this.state.grid[this.state.curGridItem].letter !== null )
        {
            // let state = this.prevState();
            this.state.grid[this.state.curGridItem].inputData = ch;
            this.setState({loading: false});
            this.calcuMarks(1, 0);
            this.state.curGridItem++;
            if( this.state.curGridItem === this.state.col*this.state.row-1)
                this.state.curGridItem = 0;
            while( this.state.grid[this.state.curGridItem].letter === null )
                this.state.curGridItem++;
        }
        else{
            while(this.state.grid[this.state.curGridItem].letter === null)
                this.state.curGridItem++;
        }
        
        if( this.state.curGridItem === this.state.col*this.state.row-1)
            this.state.curGridItem = 0;

        if( this.state.grid[this.state.curGridItem].letter !== null )
            this.onGridItemClk(this.state.grid[this.state.curGridItem]);
    }
    prevState(){
        let number = this.state.curGridItem;
        if( this.state.grid[number].inputData === '' ) return 0;
        let clues = this.state.grid[number].clues;
        let cnt = 0;
        clues.map((item)=>{
            let clueitem = this.state.clues[item];
            let word = clueitem.answer;
            let box = clueitem.boxes;
            let inputVal = '';
            box.map((num) => {
                let nn = parseInt(num);
                inputVal += this.state.grid[nn].inputData;
            })
            if( word === inputVal )
                cnt++;
        })
        return cnt;
    }
    calcuMarks(i, s){
        let number = this.state.curGridItem;
        let clues = this.state.grid[number].clues;
        let rightClue = [];
        if( s === 0 )
            clues.map((item)=>{
                let clueitem = this.state.clues[item];
                let word = clueitem.answer;
                let box = clueitem.boxes;
                let inputVal = '';
                box.map((num) => {
                    let nn = parseInt(num);
                    inputVal += this.state.grid[nn].inputData;
                })
                if( word === inputVal )
                {
                    rightClue.push(item);
                    if( i === 0 && this.state.rightAnswerCnt > 0 ) this.state.rightAnswerCnt--;
                    if( i === 1 ) this.state.rightAnswerCnt++;
                }
            })
        else 
        {
            if(this.state.rightAnswerCnt - s >= 0 )
                this.state.rightAnswerCnt -= s;
        }

        let strM = '';
        let mark = 0;
        for( let i = 0 ; i < rightClue.length ; i++ ){
            let id = this.state.bmarkArr[`${rightClue[i]}`];
            if( id === 1 || id === 2 )
                mark = 30*this.state.rightAnswerCnt;
            else if ( id === 3 )
                mark = 10*this.state.rightAnswerCnt;
            else
                mark = 50*this.state.rightAnswerCnt;
            
        }
        if( mark > 0 )
        {
            strM = mark < 10 ? '0' + mark.toString() : mark.toString();
            this.setState({score: strM});
        }
        
    }

    onConcide(item){
        this.setState({bListInput:false})
        let key = item.dir === "Across" ? "Ac" + item.number : "Dn" + item.number;
        if( this.state.bmarkArr[`${key}`] !== -1 ) return;
        this.state.bmarkArr[`${key}`] = 0;
        let x = parseInt(item.X);
        let y = parseInt(item.Y);
        let number = (x-1)*this.state.col + (y-1);

        let word = item.word;
        for( let i = 0 ; i < word.length ; i++)
        {
            let nn = 0
            if( item.dir === "Across")
                nn = number + i;
            else nn = number + i*this.state.col;
            this.state.grid[nn].inputData = word[i];
        }
        this.setState({loading : false});
    }
    onOneLetter(item){
        this.setState({bListInput:false});
        
        let key = item.dir === "Across" ? "Ac" + item.number : "Dn" + item.number;
        if( this.state.bmarkArr[`${key}`] !== -1 ) return;
        this.state.bmarkArr[`${key}`] = 1 
        let x = parseInt(item.X);
        let y = parseInt(item.Y);
        let number = (x-1)*this.state.col + (y-1);
        let word = item.word;
        this.state.grid[number].inputData = word[0];
        this.setState({loading : false});
    }

    onExtraLetter(item){
        this.setState({bListInput:false})
        let key = item.dir === "Across" ? "Ac" + item.number : "Dn" + item.number;
        if( this.state.bmarkArr[`${key}`] === 0 || this.state.bmarkArr[`${key}`] === 3 ) return;
        let word = item.word;
        if( word.length < 5 ) return;
        let x = parseInt(item.X);
        let y = parseInt(item.Y);
        let number = (x-1)*this.state.col + (y-1);
        if( this.state.bmarkArr[`${key}`] === 1) this.state.bmarkArr[`${key}`] = 3;
        else this.state.bmarkArr[`${key}`] = 2 ;

        let nn = 0
        if( item.dir === "Across")
            nn = number + 4;
        else nn = number + 4*this.state.col;
        this.state.grid[nn].inputData = word[4];
        this.setState({loading : false});
    }

    onResetGame = ()=>{
        if( this.state.btimer ){
            this.state.btimer = false;   
            clearInterval(this.state.timer);
        }
        this.makeGridData(this.state.originData);

        this.setState({bsetting : false, bsolution : false, curGridItem:0, iTime:0, elapsed:'00:00', score:'00', rightAnswerCnt : 0});
        
    }
    onResetTimer(){
        this.state.iTime = 0;
        this.state.elapsed = '00:00';
        if( this.state.btimer ) clearInterval(this.state.timer);
        this.startTimer();
        this.state.btimer = true;
        this.setState({bsetting : false})
    }
    onSolution(){
        this.setState({bsetting:false, bsolution : true});
    }
    _renderListItem(item){
        
        return(
            <View style={{width: '100%',width: 250, padding:10, borderBottomColor:'#999', borderBottomWidth:1,}} >
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View >
                        <Text style={{fontWeight:'bold', color:'#999'}}>{item.number} : {item.clue1}</Text>
                        {item.clue2 !== '' && (<Text style={{fontWeight:'bold', color:'#999', marginLeft:10}}>{item.number} : {item.clue1}</Text>)}
                    </View>
                    <Icon
                        name='question-circle'
                        type='font-awesome'
                        size={24}
                        color='#000'
                    />
                </View>
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 10}} >
                    <TouchableOpacity style={{width:65, height:30, justifyContent:'center', alignItems:'center',
                        borderColor:'#333', borderWidth:1, borderRadius:3}}
                        onPress={()=>{this.onConcide(item);}}>
                            <Text style={{fontSize:12}}>Concede</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={{width:65, height:30, justifyContent:'center', alignItems:'center',
                        borderColor:'#333', borderWidth:1, borderRadius:3}} onPress={()=>this.onOneLetter(item)}>
                        <Text style={{fontSize:12}}>1st Letter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:90, height:30, justifyContent:'center', alignItems:'center',
                        borderColor:'#333', borderWidth:1, borderRadius:3}} onPress={()=>this.onExtraLetter(item)}>
                        <Text style={{fontSize:12}}>Extra Letter(s)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    render(){
        const {row, col, hh, loading, dispText1, dispText2, grid, score, beditable, bListInput, initData, elapsed} = {...this.state};
        var H = height - width - 190;
        var nH = H/3;
        var nW = (width - 30 )/11;
        const output = Object.assign({}, ...grid);
        if( loading)
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        return (
            <>
            <SafeAreaView style = {{ flex:1, }}>
                <Header2 
                    time = {elapsed} 
                    score = {score}
                    beditable = {beditable}
                    btimer = {this.state.btimer}
                    back={()=>this.gotoBack()}
                    list = {()=>this.gotoList()}
                    info = {()=>this.gotoInfo()}
                    set = {()=>this.gotoSet()}
                    rightNav = {()=>this.gotoSetting()}
                    stop= {()=>this.stop()}
                    edit = {()=>this.onEdit()}
                    changeTime = {(val)=>this.changeTime(val)}
                />
                <Modal
                    visible={this.state.bListInput}
                    modalStyle={{ marginTop: 74, left: 60}}
                    swipeDirection={['right', 'left']} // can be string or an array
                    rounded={false}
                    onSwipeOut={(event) => {
                        this.setState({ bListInput: false });
                    }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'right',
                    })}
                    onTouchOutside={() => {
                        this.setState({ bListInput: false });
                    }}
                >
                    <ModalContent style={{width:300, height:height-74, marginRight:0, zIndex: 1000}}>
                        <FlatList 
                            data = {initData}
                            keyExtractor = {(item, index) => index.toString()}
                            renderItem = {({item})=>this._renderListItem(item)}
                        />
                    </ModalContent>
                </Modal>
                    <View style={{width:'100%', height:hh, marginTop:3}}>
                        <Grid
                            backgroundColor={'#999'}
                            height={hh}
                            data={grid}
                            key = {(item) => item.id}
                            keyExtractor = {(item)=>item.id}
                            renderItem={this._renderItem}
                            renderPlaceholder={this._renderPlaceholder}
                            numColumns={col}
                        />
                        <Modal
                            visible={this.state.bsetting}
                            modalStyle={{left:width-300, marginTop: 74}}
                            swipeDirection={['right', 'left']} // can be string or an array
                            swipeThreshold={100} // default 
                            rounded={false}
                            onSwipeOut={(event) => {
                                this.setState({ bsetting: false });
                            }}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'right',
                            })}
                            onTouchOutside={() => {
                                this.setState({  bsetting: false });
                            }}
                        >
                        <ModalContent style={{width:300, height:height-74, marginRight:0, }}>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', borderBottomColor:'#333', borderBottomWidth:2 , paddingBottom: 10, paddingTop: 20}}
                                onPress={()=>this.onResetGame()}
                            >
                                <Icon
                                    name='history'
                                    type='font-awesome'
                                    size={30}
                                    color='#000'
                                />
                                <Text style={{fontSize:20, marginLeft:10, }}>Reset Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', borderBottomColor:'#333', borderBottomWidth:2, paddingBottom: 10, paddingTop: 20}}
                                onPress={()=>this.onResetTimer()}
                            >
                                <Icon
                                    name='clock'
                                    type='feather'
                                    size={30}
                                    color='#000'
                                />
                                <Text style={{fontSize:20, marginLeft:10, }}>Reset Timer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', borderBottomColor:'#333', borderBottomWidth:2, paddingBottom: 10, paddingTop: 20}}
                                onPress={()=>this.onSolution()}
                            >
                                <Icon
                                    name='eye'
                                    type='font-awesome'
                                    size={30}
                                    color='#000'
                                />
                                <Text style={{fontSize:20, marginLeft:10, }}>Solution</Text>
                            </TouchableOpacity>
                        </ModalContent>
                    </Modal>
                </View>
                <View style = {[GlobalStyle.middleBar, {marginTop:10}]}>
                    <TouchableOpacity style={GlobalStyle.leftArrow} onPress = {()=>this.prevSentence()}>
                        <Icon 
                            name='chevron-left'
                            type='font-awesome'
                            size={18}
                        ></Icon>

                    </TouchableOpacity>
                    <TouchableOpacity style = {{width: width-112, paddingLeft:10, paddingRight:10, justifyContent:'center'}} onPress={()=>this.onTextClk()}>
                        {dispText2 === "" ? <Text style={GlobalStyle.dispText}>{dispText1}</Text>:
                        <Text style={GlobalStyle.dispText}>{dispText1}{"\n"+dispText2}</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={GlobalStyle.leftArrow} onPress = {()=>this.nextSentence()}>
                        <Icon 
                            name='chevron-right'
                            type='font-awesome'
                            size={18}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1, backgroundColor:'#ddd',  }}>
                    <View style={{flexDirection:'row',width:width - 20, justifyContent:'space-between', marginTop: 5, marginLeft: 10, marginRight:10}}>
                        {keys1.map((ch, i)=>{
                            return(
                                <TouchableOpacity key = {i.toString()} style = {{width:nW, height:nH, borderRadius:2, backgroundColor:'white',marginLeft:2, alignItems:'center', justifyContent:'center'}}
                                    onPress={()=>this.onKeyClk(ch)}
                                >
                                    <Text style={{fontWeight:'bold'}}>{ch}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',width:width- 40, justifyContent:'space-between', marginTop: 5, marginLeft: 20, marginRight:20}}>
                        {keys2.map((ch, i)=>{
                            return(
                                <TouchableOpacity key = {i.toString()} style = {{width:nW, height:nH, borderRadius:2, backgroundColor:'white',marginLeft:2, alignItems:'center', justifyContent:'center'}}
                                    onPress={()=>this.onKeyClk(ch)}
                                >
                                    <Text style={{fontWeight:'bold'}}>{ch}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',width:width - 20, justifyContent:'space-between', marginTop: 5, marginLeft: 10, marginRight:10}}>
                        {keys3.map((ch, i)=>{
                            return(
                                <TouchableHighlight key = {i.toString()} style = {{width:nW, height:nH, borderRadius:2, backgroundColor:'white',marginLeft:2, alignItems:'center', justifyContent:'center'}}
                                    onPress={()=>this.onKeyClk(ch)}
                                >
                                    <Text style={{fontWeight:'bold'}}>{ch}</Text>
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                </View>
            </SafeAreaView>
            </>
        );

    };
}

export default ChapterScreen;