import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import btnMinus from '../../assets/icons/minus.png'
import btnPlus from '../../assets/icons/add.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const AddOrder = ({navigation}) => {
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [dataMenu, setDataMenu] = useState({
        menu_id: menuId,
        menu_name: menuName,
        temp_order_subtotal: menuPrice,
        temp_order_qty: orderQuantity,
      });

    useEffect(() => {
        navigation.addListener('focus', async() => {
        const menuCheck = async () =>{

            const getMenuId = await AsyncStorage.getItem('order_menu_id');
            const getMenuName = await AsyncStorage.getItem('order_menu_name');
            const getMenuCategory = await AsyncStorage.getItem('order_menu_category');
            const getMenuPrice = await AsyncStorage.getItem('order_menu_price');
            setMenuId(getMenuId);
            setMenuName(getMenuName);
            setMenuCategory(getMenuCategory);
            setMenuPrice(getMenuPrice);
        }
        menuCheck();
    })
    }, []);

    const addToCart = () => {{

        const menuData = `menu_id=${menuId}&menu_name=${menuName}&temp_order_subtotal=${menuPrice}&temp_order_qty=${orderQuantity}`;

            axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=addToCart', menuData)
            .then(res => {
                console.log('Add to Cart Response: ', res);
                navigation.navigate('Order');
        });

                // console.log('menu_id: ', menuId);
                // console.log('menu_name: ', menuName);
                // console.log('temp_order_subtotal: ', menuPrice);
                // console.log('temp_order_qty: ', orderQuantity);

    }}

    return (
        <View style={styles.container}>
            <Text>{menuName}</Text>
            <Text>{menuPrice}</Text>
            <View style={styles.quantityBtn}>
                <TouchableOpacity onPress={() => setOrderQuantity(orderQuantity - 1)}>
                    <Image 
                        source={btnMinus}
                        style={styles.quantityMinus}
                    />
                </TouchableOpacity>
                <Text style={styles.txtQuantity}>{orderQuantity}</Text>
                <TouchableOpacity onPress={() => setOrderQuantity(orderQuantity + 1)}>
                    <Image 
                        source={btnPlus}
                        style={styles.quantityPlus}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnAddToCart} onPress={() => addToCart()}>
                <Text style={styles.txtAddToCart}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddOrder

const styles = StyleSheet.create({
    container: {
        padding: resWidth * 0.128,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
    quantityBtn: {
        borderRadius: resHeight,
        borderWidth: resWidth * 0.005,
        flexDirection: 'row',
        width: resWidth * 0.3,
        paddingHorizontal: resWidth * 0.02,
        paddingVertical: resWidth * 0.015,
        borderColor: '#855B54',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    quantityMinus: {
        width: resWidth * 0.04,
        height: resWidth * 0.04
    },
    quantityPlus: {
        width: resWidth * 0.04,
        height: resWidth * 0.04
    },
    txtQuantity: {
        fontSize: resWidth * 0.05,
        color: '#000',
    },
    btnAddToCart: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        // marginTop: 20,
        marginTop: resHeight * 0.039,
        // padding: 20,
        padding: resWidth * 0.05,
        // borderRadius: 10,
        borderRadius: resHeight,
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
    txtAddToCart: {
        color: '#fff',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
})
