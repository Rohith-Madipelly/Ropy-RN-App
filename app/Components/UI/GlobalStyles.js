// import { StyleSheet,Platform } from 'react-native'

// export default StyleSheet.create({

//     androidSafeArea:{
//         flex:1,
//         // backgroundColor:'',
//         // backgroundColor:Platform.OS==='ios'?'#4A3AFF':'',

//         paddingTop:Platform.OS==='android'?30:0,
        
//         // backgroundColor:"#e93288"
//     } ,
    
// })


import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({

    androidSafeArea: {
        flex: 1,
        // backgroundColor:'white',
        // paddingTop:Platform.OS==='android'?30:0,
        // backgroundColor:"white"
    },
    AuthScreenStatusBar1: {
        color: 'white',
        // color: 'pink',
        barStyle:'dark-content'
    },
    AuthScreenStatusBar2: {
        color: 'rgba(3, 196, 203, 1)',
        // color: 'pink',
        barStyle:'dark-content'
    }


})