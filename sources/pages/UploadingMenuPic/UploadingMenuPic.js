import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import RNFetchBlob from 'rn-fetch-blob';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';

import logoCassie from '../../assets/icons/cashie_dark.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const UploadingMenuPic = ({navigation}) => {
    // const [selectedMenuPictureId, setSelectedMenuPictureId] = useState("");
    // const [dataImage, setDataImage] = useState('');

    useEffect(() => {
        navigation.goBack();
        // const gettingMenuData = async () =>{
        //     const getSelectedMenuPictureId = await AsyncStorage.getItem('upload_picture_menu_id');
        //     const getSelectedDataImage = await AsyncStorage.getItem('upload_picture_data_image');

        //     setSelectedMenuPictureId(getSelectedMenuPictureId);
        //     setDataImage(getSelectedDataImage);
        // }
        // gettingMenuData();
    }, []);

    // useEffect(() => {
    //     navigation.addListener('focus', async() => {
    //         await 
    //         RNFetchBlob.fetch('POST', `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=uploadMenuPicture&menu_id=${selectedMenuPictureId}`, {
    //             Authorization : "Bearer access-token",
    //             otherHeader : "foo",
    //             'Content-Type' : 'multipart/form-data',
    //           }, [
    //             // element with property `filename` will be transformed into `file` in form data
    //             { name : 'image', filename : 'avatar.png', type: 'image/png', data: dataImage}
    //             // custom content type
    //           ]).then((resp) => {
    //             console.log(resp);
    //           })
    //         navigation.goBack();
    //     })
    // }, []);

    return (
        <View style={styles.container}>
            <Image source={logoCassie} style={styles.logo}/>
            <Text style={{color: '#fff'}}>Uploading your image</Text>
            {/* <Text>{dataImage}</Text> */}
            <ActivityIndicator color="#FFE9C0" />
        </View>
    )
}

export default UploadingMenuPic

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
