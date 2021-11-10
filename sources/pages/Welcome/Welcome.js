import React from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert } from 'react-native'
import logoCassie from '../../assets/icons/cashie_light.png'

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
        padding: 50,
        alignItems: 'center',
        // flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    logo: {
        width: 110,
        height: 110,
        borderRadius: 100,
    },
    textWelcome: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 42,
    },
    textDesc: {
        fontSize: 18,
        marginTop: 20,
    },
    btnLogin: {
        backgroundColor: '#E3BD82',
        alignSelf: 'stretch',
        marginTop: 68,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: -4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    txtLogin: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },

    btnSignUp: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        marginTop: 32,
        padding: 20,
        borderRadius: 10,
        
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: -4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    txtSignUp: {
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    }
})
