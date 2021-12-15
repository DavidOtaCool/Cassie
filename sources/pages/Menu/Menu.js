import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, VirtualizedList, Touchable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RNFetchBlob from 'rn-fetch-blob';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { createStackNavigator } from '@react-navigation/stack'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import SearchIcon from '../../assets/icons/search.png'
import ClearIcon from '../../assets/icons/cross.png'
import Plus from '../../assets/icons/plus2.png'
import CameraIcon from '../../assets/icons/camera2.png'
import PreviewImage from '../../assets/images/preview2.png'
import EditIcon from '../../assets/icons/edit.png'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;


const MenuData = ({menu_name, menu_category, menu_price, menu_image, menu_picture, onClickUpdate, onSelect, onUpload, onClickPicture}) => {
    
    return (
            <View style={styles.menuBox}>
                <TouchableOpacity onPress={() => onClickPicture()}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {
                            menu_picture === null || menu_picture === 'menu_preview.png' ?
                            <View style={styles.editPictureBorder}>
                                <Image 
                                    source={CameraIcon}
                                    style={styles.editPictureIcon}
                                />
                            </View>
                            : null
                        }
                        {
                            menu_picture === null ?
                            <Image 
                                // source={PreviewImage
                                source={{
                                    uri: menu_image,
                                }}
                                style={styles.menuPicture}
                            /> 
                            :
                            <Image 
                                // source={PreviewImage
                                source={{
                                    uri: `http://cassie-pos.000webhostapp.com/cassie/upload/menuPicture/${menu_picture}`,
                                }}
                                style={styles.menuPicture}
                            /> 
                        }

                        </View>
                    </TouchableOpacity>
                <View style={styles.menuInfo}>
                    <Text style={styles.menuName}>{menu_name}</Text>
                    {/* <Text>{menu_category}</Text> */}
                    {/* <Text style={styles.menuPrice}>Rp{menu_price}</Text> */}
                    <NumberFormat 
                        value={menu_price} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp'} 
                        renderText={
                            formattedValue => <Text style={styles.menuPrice}>{formattedValue}</Text>
                        } 
                    />
                </View>
                <TouchableOpacity style={styles.menuEditBtn} onPress={onClickUpdate}>
                    <Image 
                        source={EditIcon}
                        style={styles.menuEditIcon}
                    />
                </TouchableOpacity>
            </View>

    )
}

const Menu = ({navigation}) => {

    // const [menuImage, setMenuImage] = useState('https://robohash.org/test');
    const [menuImage, setMenuImage] = useState('http://cassie-pos.000webhostapp.com/cassie/upload/menuPicture/nopreview6.png');
    const [uploadedImage, setUploadedImage] = useState('');
    const [selectedMenuPictureId, setSelectedMenuPictureId] = useState("");
    const [selectedMenuPictureName, setSelectedMenuPictureName] = useState("");
    const [dataImage, setDataImage] = useState('');
    const [confirmPicture, setConfirmPicture] = useState(null);

    const bs = React.createRef();
    const fall = new Animated.Value(1);
    

    const clickPicture = (item) => {
        console.log("Selected Menu Picture: ", item);
        // AsyncStorage.setItem('selected_menu_picture_id',item.menu_id);
        setSelectedMenuPictureId(item.menu_id);
        setSelectedMenuPictureName(item.menu_name);
        // bs.current.snapTo(1);
        bs.current.snapTo(0);
    }

    // useEffect(() => {
    //     navigation.addListener('focus', async() => {
    //     const selectedMenuPic = async () =>{
    //         const getSelectedMenuPictureId = await AsyncStorage.getItem('selected_menu_picture_id');
    //         setSelectedMenuPictureId(getSelectedMenuPictureId);
    //     }
    //     selectedMenuPic();
    // })
    // }, []);
    
    // const takePhotoFromCamera = () => {
    //     ImagePicker.openCamera({
    //       compressImageMaxWidth: 300,
    //       compressImageMaxHeight: 300,
    //       cropping: true,
    //     //   compressImageQuality: 0.7
    //     }).then(image => {
    //       console.log(image);
    //     //   setMenuImage(image.path);
    //       bs.current.snapTo(1);
    //     });
    //   }
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
        //   compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            //   setMenuImage(image.path);
              ImgToBase64.getBase64String(image.path)
                .then(base64String => {
                    setDataImage(base64String)
                    // AsyncStorage.setItem('upload_picture_data_image',setDataImage(base64String));
                })
            bs.current.snapTo(1);
              setUploadedImage(image.path);
    
            setConfirmPicture(true);
        });
      }

    //   const choosePhotoFromLibrary = option => {
          
    //     const options = {
    //         storageOptions: {
    //           path: 'image',
    //           mediaType: 'photo',
    //         },
    //         includeBase64: true,
    //       };
            
    //     ImagePicker.openPicker({
    //       width: 300,
    //       height: 300,
    //       cropping: true,
    //     //   compressImageQuality: 0.7
    //     }).then(image => {
    //       console.log(image);
      
    //       option(options, res => {
    //           const source = {uri: res.assets[0].uri};

    //             setMenuImage(image.path);
    //             setDataImage(res.assets[0].base64);
    //             uploadMenuPic();

    //             bs.current.snapTo(1);
    //       });   
          
    //     });
    //   }
    
      const choosePhotoFromLibrary = () => {
            
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        //   compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
        //   setMenuImage(image.path);
          ImgToBase64.getBase64String(image.path)
            .then(base64String => {
                setDataImage(base64String)
                // AsyncStorage.setItem('upload_picture_data_image',setDataImage(base64String));
            })
        bs.current.snapTo(1);
          setUploadedImage(image.path);

        setConfirmPicture(true);

            // uploadThePic();
            // .catch(err => setDataImage(err));
        //   setDataImage(res.assets[0].base64);
        //   uploadMenuPic();
            
            
        })
        // .finally(uploadThePic());
            // RNFetchBlob.fetch('POST', `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=uploadMenuPicture&menu_id=${selectedMenuPictureId}`, 
            // {
            //   Authorization : "Bearer access-token",
            //   otherHeader : "foo",
            //   'Content-Type' : 'multipart/form-data',
            // }, [
            // // element with property `filename` will be transformed into `file` in form data
            // { name : 'image', filename : 'avatar.png', type: 'image/png', data: dataImage}
            // // custom content type
            // ]).then((resp) => {
            //   console.log(resp);
            // });
      }
         
      const uploadMenuPic = async () => {
        // console.log("Selected menu: ", item);
        RNFetchBlob.fetch('POST', `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=uploadMenuPicture&menu_id=${selectedMenuPictureId}`, {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
            // element with property `filename` will be transformed into `file` in form data
            { name : 'image', filename : 'avatar.png', type: 'image/png', data: dataImage}
            // custom content type
          ]).then((resp) => {
            console.log(resp);
            setConfirmPicture(null);
            navigation.navigate('UploadingPic');
          })
        // RNFetchBlob.fetch(
        //   'POST',
        //   `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=uploadMenuPicture&menu_id=${selectedMenuPictureId}`,
        //   {
        //     Authorization: 'Bearer access-token',
        //     otherHeader: 'foo',
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   [
        //     {
        //       name: 'image',
        //       filename: 'image.png',
        //       type: 'image/png',
        //       data: dataImage,
        //     },
        //   ],
        // );
        // setShowUpload(false);
      };
    //   const uploadThePic = async () => {{
    //     bs.current.snapTo(1);
    //     AsyncStorage.setItem('upload_picture_menu_id',selectedMenuPictureId);
    //     AsyncStorage.setItem('upload_picture_data_image',dataImage);
    //     navigation.navigate('UploadingMenuPic');
    // }}

    // const uploading = async () => {
    //     choosePhotoFromLibrary();
    //     uploadMenuPic();
    // }
    
    const renderInner = () => (
    
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.panelHandle} />
              <Text style={styles.panelTitle}>Upload Photo</Text>
              {/* <Text>{selectedMenuPictureId}</Text> */}
              <View style={{flexDirection: 'row'}}>
                  <Text style={styles.panelSubtitle}>Choose picture for</Text>
                  <Text style={{fontWeight: 'bold', color: '#000', fontSize: resWidth * 0.038}}> {selectedMenuPictureName}</Text>
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
    
    // const renderHeader = () => (
    //     <View style={styles.bottomSheetHeader}>
    //       <View style={styles.panelHeader}>
    //         <View style={styles.panelHandle} />
    //       </View>
    //     </View>
    //   );
    
   
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState({});
    // const [refreshPage, setRefreshPage] = useState("");
    const [menuId , setMenuId ] = useState('');
    const [dataMenu , setDataMenu ] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const handleGoTo = (page) => {
        navigation.navigate(page)
    };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
            .then(response => {
                // console.log('ResponseAddListener: ', response)
                setMenus(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
        // getData();
        
    // return () => {
    //     refreshing;
    // };
    }, []);

    const selectMenu = (item) => {
        console.log("Selected menu: ", item);
        // setSelectedMenu(item);
        // setName(item.name);
        // setEmail(item.email);
        // setBidang(item.bidang);
        // setTombol("Update");
    }

    const editMenu = (item) => {
        // axios.get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu`)
        // .then(item => {
        //         console.log('Selected Menu: ', item);
        //     // console.log("Selected menu: ", item);
        //     // AsyncStorage.setItem('menu_id',item.menu_id)
        //     // navigation.navigate('EditMenu');
        // })
        console.log('Selected Menu: ', item);
        AsyncStorage.setItem('menu_id',item.menu_id);
        AsyncStorage.setItem('menu_name',item.menu_name);
        AsyncStorage.setItem('menu_category',item.menu_category);
        AsyncStorage.setItem('menu_price',item.menu_price);
        navigation.navigate('EditMenu');
        
}

    // const getData = () => {

    //     axios.get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
    //     .then(res => {
    //         console.log("Res getData: ", res);
    //         setMenus(res.data.data.result)
    //     })
    // }

    // const handleChoosePhoto = option => {
    //     setMenuId(item.menu_id);
    
    //     const options = {
    //       storageOptions: {
    //         path: 'images',
    //         mediaType: 'photo',
    //       },
    //       includeBase64: true,
    //     };
    
    //     option(options, res => {
    //       if (res.didCancel) {
    //         console.log('User cancelled');
    //       } else if (res.error) {
    //         console.log('ImagePicker error', res.error);
    //       } else if (res.customButton) {
    //         console.log('User tapped custom button');
    //       } else {
    //         const source = {uri: res.assets[0].uri};
    
    //         setImageUri(source);
    //         setDataImage(res.assets[0].base64);
    //         setShowUpload(true);
    //       }
    //     });
    //   };

    return (
        <View>
             <BottomSheet 
                    ref={bs}
                    // snapPoints={[330, 0]}
                    snapPoints={[resWidth * 0.94, 0]}
                    renderContent={renderInner}
                    // renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall.curent}
                    enabledGestureInteraction={true}
                    enabledContentTapInteraction={false}
                    // isBackDrop={true}
                    // isBackDropDismisByPress={true}
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

            <ScrollView style={styles.container} 
                // contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.navigate('DashboardfromLogin')}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>

                </View>
                <Searchbar
                    placeholder="What are you looking for?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon={SearchIcon}
                    iconColor={'#9DA7B2'}
                    clearIcon={ClearIcon}
                    style={styles.searchBar}
                    placeholderTextColor={'#96A0AB'}
                    inputStyle={{
                        fontSize: resWidth * 0.04, 
                        left: -(resWidth * 0.01),
                        color: '#96A0AB',
                    }}
                />

            <View style={styles.menuList}>    

                {menus.map(item => {

                    return(

                        <MenuData
                            key={item.menu_id} 
                            menu_name={item.menu_name} 
                            menu_category={item.menu_category} 
                            menu_price={item.menu_price}
                            menu_picture={item.menu_picture}
                            menu_image={menuImage}
                            horizontal={true}
                            onClickUpdate={() => editMenu(item)}
                            // onSelect={() => selectMenu(item)}
                            onUpload={() => uploadMenuPic(item)}
                            onClickPicture={() => clickPicture(item)}
                        />
                    );
                })}

            </View>

            <View style={{marginBottom: resWidth * 0.3}}></View>

            </ScrollView>
            
            <TouchableOpacity onPress={() => handleGoTo('AddMenu')}>
                <View style={styles.addButton}>
                    <Image 
                        source={Plus}
                        resizeMode="contain"
                        style={{
                            width: resWidth * 0.0645,
                            height: resWidth * 0.0645,
                            tintColor: '#fff',
                        }}
                    />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: resHeight,
        paddingVertical: resWidth * 0.1,
        paddingHorizontal: resWidth * 0.1,
    },
    header: {
        flexDirection: 'row',
        // backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: resWidth * 0.06,
    },
    btnArrowLeft: {
        left: 0,
        position: 'absolute',
    },
    arrowLeft: {
        width: resWidth * 0.09,
        height: resWidth * 0.09,
    },
    menuTitle: {
        fontSize: resWidth * 0.06,
        fontWeight: 'bold',
        color: '#000',
    },
    notification: {
        width: resWidth * 0.064,
        height: resWidth * 0.064,
        right: 0,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
    },
    searchBar: {
        backgroundColor: '#F6F8FB',
        padding: resWidth * 0.02,
        elevation: 0,
        borderRadius:resWidth * 0.03,
    },
    addButton: {
        backgroundColor: '#FC6B68',
        bottom: resWidth * 0.16,
        right: resWidth * 0.07,
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: resWidth * 0.15,
        height: resWidth * 0.15,
        borderRadius: (resWidth * 0.15)/2,
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
    menuList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // backgroundColor: '#eee',
        marginVertical: resWidth * 0.1,
    },
    menuBox: {
        backgroundColor: '#fff',
        // height: resWidth * 0.28,
        paddingBottom: resWidth * 0.1,
        // width: 150,
        width: resWidth * 0.38,
        shadowColor: '#969696',
        shadowOffset: {width: resWidth * 0.1, height: -(resWidth * 1)},
        shadowOpacity: resWidth * 0.01,
        shadowRadius: resWidth * 0.1,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.04,
        justifyContent: 'center',
        marginBottom: resWidth * 0.05,
        marginHorizontal: resWidth * 0.005,
    },
    editPictureBorder: {
        borderWidth: resWidth * 0.008, 
        position: 'absolute', 
        zIndex: 1, 
        padding: resWidth * 0.055,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderRadius: resWidth * 0.03,
        top: resWidth * 0.09,
        opacity: 0.8,
    },
    editPictureIcon: {
        height: resWidth * 0.08,
        width: resWidth * 0.08,
        zIndex: 1,
        position: 'absolute',
        opacity: 1,
    },
    menuPicture: {
        borderRadius: resWidth * 0.04,
        height: resWidth * 0.3,
        width: resWidth * 0.38,
        marginBottom: resWidth * 0.04,
    },
    menuInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.04,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.044,
        marginBottom: resWidth * 0.01,
    },
    menuPrice: {
        color: '#7E7E7E',
        fontSize: resWidth * 0.035,
    },
    menuEditBtn: {
        backgroundColor: '#FC6B68',
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderBottomRightRadius: resWidth * 0.04,
        borderTopLeftRadius: resWidth * 0.04,
        width: resWidth * 0.12,
        height: resWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    menuEditIcon: {
        width: resWidth * 0.05,
        height: resWidth * 0.05,
    },

    // bottomSheetHeader: {
    //     backgroundColor: '#fff',
    //     shadowColor: '#333333',
    //     shadowOffset: {Width: -1, height: -3},
    //     shadowRadius: 2,
    //     shadowOpacity: 0.4,
    //     paddingTop: 20,
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    // },
    // bottomSheetPanelHeader: {
    //     alignItems: 'center',
    // },
    // bottomSheetPanelHandle: {
    //     width: 40,
    //     height: 8,
    //     borderRadius: 4,
    //     backgroundColor: '#000',
    //     marginBottom:10,
    // },
    bottomSheetHeader: {
        backgroundColor: '#FFFFFF',
        // shadowColor: '#333333',
        // shadowOffset: {width: -1, height: -3},
        // shadowRadius: 2,
        // shadowOpacity: 0.4,
        // elevation: 5,
        borderTopLeftRadius: resWidth * 0.1,
        borderTopRightRadius: resWidth * 0.1,
      },
    panelHeader: {
        alignItems: 'center',
      },
      panel: {
        // paddingVertical: 20,
        // paddingHorizontal: 20,
        paddingVertical: resWidth * 0.065,
        paddingHorizontal: resWidth * 0.05,
        shadowColor: '#000',
        shadowOffset: {width: (resWidth * 0.02), height: (resWidth * 0.8)},
        shadowOpacity: resWidth * 0.1,
        shadowRadius: resWidth * 0.08,
        elevation: resWidth * 0.03,
        // height: resWidth * 0.9,
        // backgroundColor: '#FFE9C0',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: resWidth * 0.1,
        borderTopLeftRadius: resWidth * 0.1,
      },
      panelHandle: {
        // width: 40,
        // height: 8,
        // borderRadius: 4,
        height: resWidth * 0.02,
        width: resWidth * 0.1,
        borderRadius: resWidth,
        backgroundColor: '#00000040',
        marginVertical: resWidth * 0.04,
      },
      panelTitle: {
        // fontSize: 27,
        // height: 35,
        // marginBottom: 10,
        fontSize: resWidth * 0.07,
        marginBottom: resWidth * 0.025,
      },
      panelSubtitle: {
        // fontSize: 14,
        fontSize: resWidth * 0.038,
        color: 'gray',
        marginBottom: resWidth * 0.025,
      },
      panelButton: {
        // padding: 13,
        // borderRadius: 10,
        padding: resWidth * 0.033,
        borderRadius: resWidth * 0.03,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        // marginVertical: 7,
        marginVertical: resWidth * 0.018,
      },
      panelButtonTitle: {
        // fontSize: 17,
        fontSize: resWidth * 0.04,
        fontWeight: 'bold',
        color: 'white',
      },

    
})
