import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Alert } from 'react-native';

import { ModelStylesCss } from './ModelStylesCss';
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1';
import Metrics from '../../Utils/ResposivesUtils/Metrics';
import CameraIcon from '../../assets/SVG/File/CameraIcon';
import GalleryIcon from '../../assets/SVG/File/GalleryIcon';
import { OpenDeviceCameraImagePicker, OpenDeviceGalleryImagePicker } from '../../Utils/DeviceHelpers/DeviceHelpersImages';


const OpenUploadImage = ({ visible, title, message, onClose, onSubmit,aspect=[1,1] }) => {


    const OpenGallery = async () => {
        console.log("Opening OpenGallery...")
        const GalleryData = await OpenDeviceGalleryImagePicker(aspect)
        console.log(GalleryData)
        onSubmit(GalleryData)

    }


    const OpenCamera = async () => {
        console.log("Opening OpenCamera...")
        const CameraData = await OpenDeviceCameraImagePicker([1, 1], 1, true)
        console.log(CameraData)
        onSubmit(CameraData)
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

                    <View style={[ModelStylesCss.alertContainer, styles.shadowStyle]} onStartShouldSetResponder={() => true}>
                        <TouchableOpacity onPress={onClose} style={ModelStylesCss.closeButton}>
                            <Text style={ModelStylesCss.closeButtonText}>&times;</Text>
                        </TouchableOpacity>

                        {/* Modal content */}
                        <View>
                            <Text style={[styles.TextHeadingA2, { textAlign: 'center', color: '#140301CC' },]}>{title}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 15 }}>

                            <TouchableOpacity
                                onPress={() => { OpenCamera() }}
                                style={{ width: '50%', aspectRatio: 1 / 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                <CameraIcon />
                                <Text style={[styles.TextHeadingA2, { color: '#140301CC', marginTop: 10 }]}>Click Picture</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => { OpenGallery() }}
                                style={{ width: '50%', aspectRatio: 1 / 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                <GalleryIcon />
                                <Text style={[styles.TextHeadingA2, { color: '#140301CC', marginTop: 10 }]}>Browse Gallery</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default OpenUploadImage;

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


})