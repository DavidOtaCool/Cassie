import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, Touchable } from 'react-native'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import EditProfileIcon from '../../assets/icons/user-edit.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Profile = ({navigation}) => {
    
    const [loginCashierId, setLoginCashierId] = useState('');
    const [loginCashierName, setLoginCashierName] = useState('');
    const [loginCashierStatus, setLoginCashierStatus] = useState('');
    const [loginCashierEmail, setLoginCashierEmail] = useState('');
    const [loginCashierPicture, setLoginCashierPicture] = useState('');

    const [dataImage, setDataImage] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');
    const [confirmPicture, setConfirmPicture] = useState(null);

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const clickPicture = () => {
        // console.log("Selected Menu Picture: ", item);
        // setSelectedMenuPictureId(item.menu_id);
        // setSelectedMenuPictureName(item.menu_name);
        bs.current.snapTo(0);
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
        }).then(image => {
            console.log(image);
            //   setMenuImage(image.path);
              ImgToBase64.getBase64String(image.path)
                .then(base64String => {
                    setDataImage(base64String)
                })
            bs.current.snapTo(1);
              setUploadedImage(image.path);
    
            setConfirmPicture(true);
        });
      }

      const choosePhotoFromLibrary = () => {
            
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then(image => {
          console.log(image);
          ImgToBase64.getBase64String(image.path)
            .then(base64String => {
                setDataImage(base64String)
            })
        bs.current.snapTo(1);
            setUploadedImage(image.path);
            setConfirmPicture(true);
        })
      }

    const uploadMenuPic = async () => {
        RNFetchBlob.fetch('POST', `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=uploadCashierPicture&cashier_id=${loginCashierId}`, {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
            { name : 'image', filename : 'avatar.png', type: 'image/png', data: dataImage}
          ]).then((resp) => {
            console.log(resp);
            setConfirmPicture(null);
            navigation.navigate('UploadingPic');
          })
      };

      const renderInner = () => (
    
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.panelHandle} />
              <Text style={styles.panelTitle}>Upload Photo</Text>
              {/* <Text>{selectedMenuPictureId}</Text> */}
              <View style={{flexDirection: 'row'}}>
                  <Text style={styles.panelSubtitle}>Choose picture for your profile pic</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={() => bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
      );

    const logout = async() =>{
        await AsyncStorage.clear();
        navigation.navigate('HomeNoAuth');
    }

    const handleGoTo = (page) => {
        navigation.navigate(page)
    };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            // const cashierNameCheck = async () =>{

            //     const getLoginCashierId = await AsyncStorage.getItem('login_cashier_id');
            //     setLoginCashierId(getLoginCashierId);
            // }
            const getCashierData = async () => {
                const gettingLoginCashierId = await AsyncStorage.getItem('login_cashier_id');
                axios
                    .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showLoginCashier&cashier_id=${gettingLoginCashierId}`)
                    .then(response => {
                        // console.log('Response Logged In Cashier: ', response)
                        setLoginCashierId(response.data.logged_in_cashier.cashier_id);
                        setLoginCashierName(response.data.logged_in_cashier.cashier_name);
                        setLoginCashierEmail(response.data.logged_in_cashier.cashier_email);
                        setLoginCashierPicture(response.data.logged_in_cashier.cashier_picture);
                        setLoginCashierStatus(response.data.logged_in_cashier.cashier_status);
                })
                    .catch(e => alert(e.message))
            }
            // cashierNameCheck();
            getCashierData();
    })
    }, []);
    return (
        <View style={styles.container}>
            <BottomSheet 
                    ref={bs}
                    snapPoints={[resWidth * 1.1, -(resWidth * 0.3)]}
                    renderContent={renderInner}
                    initialSnap={1}
                    callbackNode={fall.curent}
                    enabledGestureInteraction={true}
                    enabledContentTapInteraction={false}
            />
            {
                confirmPicture ? 
                <View style={styles.confirmationBackground}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: resHeight, width: resWidth}} />
                    <View style={styles.confirmationBox}>
                        <Image 
                            source={{
                                uri: uploadedImage,
                            }}
                            style={styles.previewPicture}
                        /> 
                        <TouchableOpacity onPress={() => uploadMenuPic()} style={styles.btnUploadImage}>
                                <Text style={styles.txtBtnUpload}>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setConfirmPicture(null)} style={styles.btnCancelUpload}>
                                <Text style={{...styles.txtBtnUpload, color: '#fff'}}>Cancel Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
            }
            
            <View style={styles.header}>
                    
                <Text style={styles.menuTitle}>Profile</Text>
                <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => handleGoTo('EditProfile')}>
                    <Image source={EditProfileIcon} style={styles.editUserStyle} />
                </TouchableOpacity>

            </View>

            <View style={styles.userInfo}>

                <TouchableOpacity onPress={() => clickPicture()}>
                    <Image 
                        // source={
                        //     menu_picture === null ? 
                        //         {
                        //             uri: image_not_available} : {
                        //             uri: `http://cassie-pos.000webhostapp.com/cassie/upload/menuPicture/${menu_picture}`
                        //         }
                        // }
                        source={
                            loginCashierPicture != null ?
                            {
                                uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${loginCashierPicture}`
                            } : {
                                uri: `https://robohash.org/${loginCashierEmail}`
                            }
                        }
                        style={styles.cashierPicture}
                    />
                </TouchableOpacity>
                
                <Text style={styles.profileName}>{loginCashierName}</Text>
                <Text style={styles.profileStatus}>{loginCashierStatus}</Text>
            </View>

            <TouchableOpacity style={styles.btnSignUp} onPress={() => logout()}>
                <Text style={styles.txtSignUp}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical: resWidth * 0.1,
        // alignItems: 'center',
        backgroundColor: '#fff',
        // justifyContent: 'center',
        height: resHeight,
    },
    header: {
        flexDirection: 'row',
        // backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: resWidth * 0.06,
        marginHorizontal: resWidth * 0.08,
    },
    menuTitle: {
        fontSize: resWidth * 0.06,
        fontWeight: 'bold',
        color: '#000',
    },
    editUserStyle: {
        width: resWidth * 0.06,
        height: resWidth * 0.06,
        right: 0,
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: resWidth * 0.06,
    },
    cashierPicture: {
        borderRadius: resHeight,
        height: resWidth * 0.27,
        width: resWidth * 0.27,
        backgroundColor: '#FFE9C0',
        borderColor: '#855B54',
        borderWidth: resWidth * 0.015,
        marginBottom: resWidth * 0.025,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: resWidth * 0.06,
        color: '#000',
        marginBottom: resWidth * 0.01,
    },
    profileStatus: {
        fontSize: resWidth * 0.04,
    },
    confirmationBackground: {
        position: 'absolute',
        width: resWidth,
        height: resHeight,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    confirmationBox: {
        backgroundColor: '#fff',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: resWidth * 0.55,
        paddingHorizontal: resWidth * 0.4,
        borderRadius: resWidth * 0.045,
    },
    previewPicture: {
        borderRadius: resWidth * 0.04,
        height: resWidth * 0.5,
        width: resWidth * 0.58,
        position: 'absolute',
        top: resWidth * 0.1,
    },
    btnUploadImage: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: resWidth * 0.28,
        position: 'absolute',
        borderColor: '#FC6B68',
        borderWidth: resWidth * 0.01,
        left: resWidth * 0.1,
        right: resWidth * 0.1,
        paddingVertical: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.06,
        borderRadius: resHeight,
    },
    btnCancelUpload: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: resWidth * 0.01,
        bottom: resWidth * 0.09,
        borderColor: '#FC6B68',
        position: 'absolute',
        backgroundColor: '#FC6B68',
        left: resWidth * 0.1,
        right: resWidth * 0.1,
        paddingVertical: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.06,
        borderRadius: resHeight,
    },
    txtBtnUpload: {
        fontSize: resWidth * 0.045,
        fontWeight: 'bold',
        color: '#000',
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
        // elevation: resWidth * 0.02,
        marginHorizontal: resWidth * 0.1,
    },
    txtSignUp: {
        color: '#fff',
        textAlign: 'center',
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },

    panel: {
        paddingTop: resWidth * 0.065,
        // paddingBottom: resWidth * 0.065,
        paddingBottom: resWidth * 0.3,
        paddingHorizontal: resWidth * 0.05,
        shadowColor: '#000',
        shadowOffset: {width: (resWidth * 0.02), height: (resWidth * 0.8)},
        shadowOpacity: resWidth * 0.1,
        shadowRadius: resWidth * 0.1,
        elevation: resWidth * 0.04,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: resWidth * 0.1,
        borderTopLeftRadius: resWidth * 0.1,
      },
      panelHandle: {
        height: resWidth * 0.02,
        width: resWidth * 0.1,
        borderRadius: resWidth,
        backgroundColor: '#00000040',
        marginVertical: resWidth * 0.04,
      },
      panelTitle: {
        fontSize: resWidth * 0.07,
        marginBottom: resWidth * 0.025,
      },
      panelSubtitle: {
        fontSize: resWidth * 0.038,
        color: 'gray',
        marginBottom: resWidth * 0.025,
      },
      panelButton: {
        padding: resWidth * 0.033,
        borderRadius: resWidth * 0.03,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: resWidth * 0.018,
      },
      panelButtonTitle: {
        fontSize: resWidth * 0.04,
        fontWeight: 'bold',
        color: 'white',
      },
})
