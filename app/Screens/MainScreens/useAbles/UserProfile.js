import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserProfile = ({userName,data}) => {
    return (
        <View style={{ marginTop: 5, marginBottom: 10, width: '90%', height: 70, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                <Image
                    source={require('../../../assets/Logo/Ropy_Logo.png')}
                    style={{ width: '100%', height: 50, resizeMode: 'contain' }} />
            </View>
            <View style={{ width: '68%', }}>
                {data ?<Text style={{ color: '#001F2099' }}>{data.lastname} {data.firstname}</Text>:""}
            </View>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({})