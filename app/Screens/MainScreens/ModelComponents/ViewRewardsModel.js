import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Alert, Pressable } from 'react-native';

import { ModelStylesCss } from './ModelStylesCss';
import Metrics from '../../../Utils/ResposivesUtils/Metrics';
import LottieView from 'lottie-react-native';

import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications';
import { FontAwesome5 } from '@expo/vector-icons';


const ViewRewardsModel = ({ visible, title, message, onClose, onSubmit, dataforAPI, CallBackForDelete }) => {
    const toast = useToast();

    const handleCopyToClipboard = async (message) => {
        try {
            await Clipboard.setStringAsync(`${message}`);
            toast.hideAll()
            toast.show('Copied to Clipboard!')
            onClose()
        } catch (error) {
            console.log("Error", error)
        }
    }
    return (
        <View style={{}}>

            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableOpacity style={ModelStylesCss.modalBackground} onPress={onClose} activeOpacity={1}>

                    <LottieView
                        autoPlay loop
                        // ref={animation}
                        style={{
                            width: 250,
                            height: 250,
                            position: 'absolute',
                            bottom: 150
                            // backgroundColor: '#eee',
                        }}
                        source={require('../../../assets/lottifile/Animation3.json')}
                    />
                    <View style={[ModelStylesCss.alertContainer, styles.shadowStyle]} onStartShouldSetResponder={() => true}>
                        <TouchableOpacity onPress={onClose} style={ModelStylesCss.closeButton}>
                            <Text style={ModelStylesCss.closeButtonText}>&times;</Text>
                        </TouchableOpacity>

                        {/* Modal content */}
                        <View style={{}}>
                            <View>
                                <Text style={[styles.TextHeadingA2, { textAlign: 'center', color: '#140301CC' },]}>{title ? title : "Enter the Name of the Wishlist"}</Text>
                            </View>


                            {/* Search box */}
                            <Pressable style={[styles.shadowStyle, { marginTop: Metrics.rfv(20), padding: 3, backgroundColor: '#03C4CB' }]} onPress={() => { handleCopyToClipboard(message) }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 7 }}>

                                    <Text style={[styles.TextHeadingA2, { color: '#140301CC', marginBottom: 5, textAlign: 'center', textAlignVertical: 'center' }]}>{message}</Text>
                                    <FontAwesome5 name="copy" size={24} color="black" />

                                </View>
                            </Pressable>
                            <View style={{ height: 30 }}>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default ViewRewardsModel;

const styles = StyleSheet.create({
    TextHeadingA1: {
        fontFamily: 'Manrope',
        fontWeight: 800,
        fontSize: Metrics.rfv(25),
        color: '#140301CC'
    },
    TextHeadingA2: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(14),
        color: '#999EA1'
    },
    TextHeadingA3: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(12),
        color: '#999EA1'
    },
    TextHeadingA4: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(25),
        color: '#999EA1'
    },
    TextHeading7M16: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(16),
        color: '#140301CC'
    },

    shadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    }
    , InputStyling: {
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {
            },
        }),
    }

})