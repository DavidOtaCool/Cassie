import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert } from 'react-native'
import logoCassie from '../../assets/icons/cashie_light.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Welcome = ({navigation}) => {


    const handleGoTo = (page) => {
        navigation.navigate(page)
    }
    return (
        <View style={styles.container}>
            <Image source={logoCassie} style={styles.logo}/>
            <Text style={styles.textWelcome}>Welcome to Cassie!</Text>
            <Text style={styles.textDesc}>Ready to start this journey with us?</Text>

            <TouchableOpacity style={styles.btnLogin} onPress={() => handleGoTo('LoginPage')}>
                <Text style={styles.txtLogin}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSignUp} onPress={() => handleGoTo('SignUpPage')}>
                <Text style={styles.txtSignUp}>Sign up</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        // padding: 50,
        padding: resHeight * 0.064,
        alignItems: 'center',
        // flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
    logo: {
        // width: 110,
        // height: 110,
        width: resWidth * 0.3,
        height: resWidth * 0.3,
        borderRadius: resHeight,
    },
    textWelcome: {
        // fontSize: 26,
        fontSize: resWidth * 0.07,
        fontWeight: 'bold',
        color: '#000',
        // marginTop: 42,
        marginTop: resWidth * 0.1,
    },
    textDesc: {
        // fontSize: 18,
        fontSize: resWidth * 0.046,
        // marginTop: 20,
        marginTop: resHeight * 0.025,
    },
    btnLogin: {
        backgroundColor: '#E3BD82',
        alignSelf: 'stretch',
        // marginTop: 68,
        marginTop: resHeight * 0.09,
        // padding: 20,
        padding: resWidth * 0.05,
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
        shadowColor: '#969696',
        // shadowOffset: {width: -2, height: -4},
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        // shadowOpacity: 0.2,
        shadowOpacity: resWidth * 0.03,
        // shadowRadius: 3,
        shadowRadius: resWidth * 0.05,
        // elevation: 5,
        elevation: resWidth * 0.02,
    },
    txtLogin: {
        color: '#fff',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.050,
        // fontWeight: '500',
        fontWeight: '500',
    },

    btnSignUp: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        // marginTop: 32,
        marginTop: resHeight * 0.041,
        // padding: 20,
        padding: resWidth * 0.05,
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
        
        shadowColor: '#969696',
        // shadowOffset: {width: -2, height: -4},
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        // shadowOpacity: 0.2,
        shadowOpacity: resWidth * 0.03,
        // shadowRadius: 3,
        shadowRadius: resWidth * 0.05,
        // elevation: 5,
        elevation: resWidth * 0.012,
    },
    txtSignUp: {
        color: '#000',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.050,
        fontWeight: '500',
    }
})
