import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Report = () => {
    return (
        <View style={styles.container}>
            <Text>Report</Text>
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    container: {
        padding: resWidth * 0.128,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
})
