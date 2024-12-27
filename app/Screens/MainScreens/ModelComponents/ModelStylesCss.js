import { StyleSheet } from "react-native";
import Metrics from "../../../Utils/ResposivesUtils/Metrics";

export const ModelStylesCss = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      alertContainer: {
        minWidth: 300,
        maxWidth:Metrics.width*0.8,
        padding: 20,
        backgroundColor: '#fff',
    
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeButton: {
        position: 'absolute',
        top: -5,
        right: 5,
        padding: 5,
        zIndex: 1,
    
      },
      closeButtonText: {
        fontSize: 24,
        color: 'black',
    
      },
      alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      alertMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },
      uploadButton: {
        width: 140,
        height: 70,
        backgroundColor: '#2D2D2D',
        // backgroundColor: '#FFDEC08C',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },


      TextBtn: {
        color: 'white', fontWeight: '700',
        width:'80%',textAlign:'center'
      },



      uploadButton2Circle: {
        width: 50,
        height: 50,
        borderRadius:35,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        // backgroundColor: '#FFDEC08C',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
});