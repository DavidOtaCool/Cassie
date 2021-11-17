import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Profile = ({navigation}) => {
    const handleGoTo = (page) => {
        navigation.navigate(page)
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnSignUp} onPress={() => handleGoTo('HomeNoAuth')}>
                <Text style={styles.txtSignUp}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        padding: resWidth * 0.128,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
    btnSignUp: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: resHeight * 0.026,
        padding: resWidth * 0.05,
        borderRadius: resWidth * 0.028,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        shadowOpacity: resWidth * 0.03,
        shadowRadius: resWidth * 0.05,
        elevation: resWidth * 0.02,
    },
    txtSignUp: {
        color: '#fff',
        textAlign: 'center',
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
})
