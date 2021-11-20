import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const AddMenu = ({navigation}) => {
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [refreshPage, setRefreshPage] = useState("");
    const [btnAdd, setBtnAdd] = useState("Add Menu");
    const [dataMenu, setDataMenu] = useState({
        menu_name: '',
        menu_category: '',
        menu_price: '',
      });

    useEffect(() => {
        navigation.addListener('focus', async() => {
        const menuCheck = async () =>{

            const getMenuId = await AsyncStorage.getItem('menu_id');
            const getMenuName = await AsyncStorage.getItem('menu_name');
            const getMenuCategory = await AsyncStorage.getItem('menu_category');
            const getMenuPrice = await AsyncStorage.getItem('menu_price');
            setMenuId(getMenuId);
            setMenuName(getMenuName);
            setMenuCategory(getMenuCategory);
            setMenuPrice(getMenuPrice);
        }
        menuCheck();
    })
    }, []);

    const onInputChange = (value, input) => {
        setDataMenu({
          ...dataMenu,
          [input]: value,
        });
      };

    
    // const update = () => {{
        
    //     const editedMenuData = `menu_name=${dataMenu.menu_name}&menu_category=${dataMenu.menu_category}&menu_price=${dataMenu.menu_price}`;

    //         axios.put('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=addMenu', editedMenuData)
    //         .then(res => {
    //             console.log('respon: ', res);
    //             // window.location.reload(false);
    //             // getData();
    //             // setMenuName("");
    //             // setMenuCategory("");
    //             // setMenuPrice("");
    //             navigation.navigate('Menu');
    //             // navigation.goBack();
    //     });

    // }}

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Edit Menu {menuId}</Text>
                    {/* <Text>{menuName},{menuCategory},{menuPrice}</Text> */}
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>

                </View>


            <TextInput 
                placeholder="What name will you go for the menu?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_name')} 
            />

            <TextInput 
                placeholder="What category is this menu in?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_category')}
            />  

            <TextInput 
                placeholder="How much price will you give for the menu?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_price')} 
            />

            <TouchableOpacity style={styles.btnSignUp} onPress={() => update()}>
                <Text style={styles.txtSignUp}>Add Menu</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default AddMenu

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
    customTextInput: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.05,
        marginTop: resHeight * 0.03,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
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
