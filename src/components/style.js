import { StyleSheet } from 'react-native';


export const GlobalStyle = StyleSheet.create({
    containerview: { flex:1,paddingBottom:30, },
    headerview:{ flex:1, padding:30,  },
    headerunderlineview:{ paddingTop:30, paddingLeft:30, },
    sortunderline:{ width:70, height:7, backgroundColor:'#dbdbdb', },
    contentview:{ flex:3, padding:30, },
    footerview:{ flex:1, padding:30, },
    texth1:{ color:'#000', fontSize:45, lineHeight:45, fontFamily:'PassionOne-Bold', },
    texth3:{ color:'#000', fontSize:16, fontFamily:'PassionOne-Bold', marginTop:10, letterSpacing:0.5, },
    para:{ color:'#000', fontSize:16, fontFamily:'CabinCondensed-Regular', marginTop:10, },
    iconBtn:{ justifyContent:'center', borderWidth:2, borderColor:'#1565c0', borderRadius:7, flexDirection:'row', paddingRight:15, },
    defaultLinkBtn:{ justifyContent:'center', padding:15, flexDirection:'column',},
    iconBtnTxt:{ fontSize:20, flex:2, paddingTop:15, paddingLeft:15, paddingBottom:15, color:'#1565c0', textAlign:'center', fontFamily:'PassionOne-Bold', },
    defaultLinkBtnTxt:{ fontSize:18, color:'#8e8e8e', textAlign:'center', fontWeight:'900', letterSpacing:0.5, textDecorationLine:'underline', fontFamily:'CabinCondensed-Regular', },
    btnIcon:{ flex:1, },
    subscribeBar: { paddingLeft:30, paddingRight:30, paddingTop:10, paddingBottom:10, flexDirection:'row', height:50, backgroundColor:'#1565c0', justifyContent: 'center', },
    textHolder:{ paddingLeft:30, paddingRight:15, paddingTop:5, color:'#fff', fontFamily:'PassionOne-Bold', },
    btnHolder:{ paddingLeft:15, paddingRight:30, },
    smallBtn:{ backgroundColor:'#0d47a1', color:'#fff', padding:6, paddingRight:15, paddingLeft:15, borderRadius:3, fontFamily:'PassionOne-Bold', },   
    
    //scrollview
    scrollViewHolder:{ flex:1,backgroundColor:"#fff",paddingTop:20,overflow:'visible', },
    scrollViewTitle:{ fontSize:24, paddingHorizontal:15, fontFamily:'PassionOne-Bold', },
    scrollViewHorizontal:{ height:200,marginTop:20,overflow:'visible', },
    scrollViewBoxs:{ width:380, height:190, marginLeft:20, borderWidth:0.5, borderColor:'#e0e0e0', borderRadius:5,overflow:'visible', flexDirection:'row', },
    scrollViewBoxLeft:{ flex:1,justifyContent: 'center', alignItems:'center',paddingHorizontal:25, },
    scrollViewBoxContent:{ flex:2,paddingVertical:30,},
    scrollViewBoxImgHolder:{width:100,height:100,},
    scrollViewBoxImg:{ flex:1,resizeMode:'center', flexDirection:'column', },
    scrollViewBoxLabel:{ alignItems:'center'},
    scrollViewBoxLabelText:{ color:'#fff',fontSize:16,backgroundColor:'#1565c0',paddingHorizontal:10,paddingVertical:5,borderRadius:50,minWidth:80,textAlign:'center',fontFamily:'PassionOne-Bold', },
    scrollViewBoxTitle:{ flex:1, paddingHorizontal:10,marginTop:5, },
    scrollViewBoxTitleText:{fontSize:18, fontFamily:'PassionOne-Bold', textAlign:'center'},
    scrollViewBoxDescription:{flex:2,},
    scrollViewBoxDescriptionText:{fontSize:16,textAlign:'center', fontFamily:'CabinCondensed-Regular', },

    //home
    header:{flexDirection: 'row', marginTop: 24, backgroundColor:'#333', height: 40 },
    header2:{flexDirection: 'row', marginTop: 24, backgroundColor:'#FFF', height: 50, shadowColor: 'rgba(0, 0, 0, 0.27)', shadowOffset: {width: 3, height: 0}, elevation:3, justifyContent:'space-between'},
    Head : {height: 40, backgroundColor:'blue'},
    tabHolder:{ flex:15, },
    menubtn:{ flex:1, padding:10, zIndex:1},
    backbtn:{ padding:10},
    logoholder:{ flex:6, padding:10, },
    notificationbtn:{ flex:1, padding:15, },
    topBtns:{ padding:10, },
    hometabbar:{ backgroundColor:'#333', fontFamily:'PassionOne-Bold', fontWeight:"bold" },


    //default boxs
    defaultGroupTitle:{ fontSize:24, fontFamily:'PassionOne-Bold', },
    defaultGroupDescription:{ marginTop:5, fontFamily:'CabinCondensed-Regular', },
    bigDefaultbox:{  },

    // chapter Screen
    panel:{ flex:1,backgroundColor:'#FFF',},
    list : {flex:1, backgroundColor:'#FFF'},
    item: {flex: 1, margin: 1, },
    leftArrow : {justifyContent: 'center', alignItems:'center', width: 30, height:30},
    middleBar : {width:'100%', height: 50, backgroundColor:'#A0D5FD', flexDirection:'row', alignItems:'center', paddingLeft:20, paddingRight:20, justifyContent:'space-between'},
    dispText:{fontFamily:'CabinCondensed-Regular', fontSize:16}

});