import { StyleSheet,Platform } from 'react-native'

export default StyleSheet.create({

    androidSafeArea:{
        flex:1,
        // backgroundColor:'',
        // backgroundColor:Platform.OS==='ios'?'#4A3AFF':'',

        paddingTop:Platform.OS==='android'?30:0,
        
        // backgroundColor:"#e93288"
    } ,
    
})