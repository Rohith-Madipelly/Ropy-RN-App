import { StyleSheet,Platform } from 'react-native'

export default StyleSheet.create({

    dropShadow:{
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                // shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    } 
})