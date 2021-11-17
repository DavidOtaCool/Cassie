import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';

import logoCassie from '../../assets/icons/cashie_dark.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Splash = ({navigation}) => {
    
    useEffect(() => {
        const sessionCheck = async () =>{
            const isLogin = await AsyncStorage.getItem('session_token');
            // if(isLogin){
            //     navigation.navigate('DashboardfromLogin');
            // }else{
            //     navigation.navigate('HomeNoAuth');
            // }
            navigation.navigate(isLogin ? 'DashboardfromLogin' : 'HomeNoAuth');
        }
        sessionCheck();
    }, [])

    return (
        <View style={styles.container}>
            <Image source={logoCassie} style={styles.logo}/>
            <ActivityIndicator color="#FFE9C0" />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        padding: resWidth * 0.128,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
        backgroundColor: '#855B54',
    },
    logo: {
        width: resWidth * 0.4,
        height: resWidth * 0.4,
        borderRadius: resHeight,
        marginBottom: resWidth * 0.03,
    },
})
