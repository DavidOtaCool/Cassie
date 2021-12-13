import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, KeyboardAvoidingView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import btnMinus from '../../assets/icons/minus.png'
import btnPlus from '../../assets/icons/add.png'
import PreviewImage from '../../assets/images/preview2.png'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const EditOrder = ({navigation}) => {
    const keyboardVerticalOffset = Platform.OS === 'android' ? resWidth * 0.1 : 0
    
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [menuPrice, setMenuPrice] = useState(0);
    const [menuNote, setMenuNote] = useState("");
    const [displayMenuPicture, setDisplayMenuPicture] = useState('');
    
    const [orderQuantity, setOrderQuantity] = useState(1);

    const [dataMenu, setDataMenu] = useState({
        menu_id: menuId,
        menu_name: menuName,
        temp_order_subtotal: menuPrice,
        temp_order_qty: orderQuantity,
        menu_note: '',
      });

    if(orderQuantity < 1) {
        Alert.alert(
            'Alert', 
            `Are you sure want to cancel order for ${menuName}?`, 
            [
                {
                    text: 'No', 
                    onPress: () => setOrderQuantity(1),

                }, 
                {
                    text: 'Yes', 
                    // onPress: () => navigation.navigate('Order'),
                    //onPress: () => navigation.goBack(),

                    onPress: () => axios
                        .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=deleteCart&menu_id=${menuId}`)
                        .then(res => {
                            console.log('res delete cart: ', res);
                            navigation.goBack();
                        })
                }
            ])
    }

    useEffect(() => {
        navigation.addListener('focus', async() => {
        const menuCheck = async () =>{

            const getMenuId = await AsyncStorage.getItem('edit_order_menu_id');
            const getMenuName = await AsyncStorage.getItem('edit_order_menu_name');
            const getMenuCategory = await AsyncStorage.getItem('edit_order_menu_category');
            const getMenuPrice = await AsyncStorage.getItem('edit_order_menu_price');
            const getMenuQty = await AsyncStorage.getItem('edit_order_menu_qty');
            const getMenuNote = await AsyncStorage.getItem('edit_order_menu_note');
            const getDisplayMenuPicture = await AsyncStorage.getItem('order_menu_picture');
            setMenuId(getMenuId);
            setMenuName(getMenuName);
            setMenuCategory(getMenuCategory);
            setMenuPrice(parseInt(getMenuPrice));
            setOrderQuantity(parseInt(getMenuQty));
            setMenuNote(getMenuNote);
            setDisplayMenuPicture(getDisplayMenuPicture);
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

      const updateCart = () => {{

        const editedCartData = `temp_order_subtotal=${menuPrice}&temp_order_qty=${orderQuantity}&menu_note=${dataMenu.menu_note}`;

            axios.post(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=editCart&menu_id=${menuId}`, editedCartData)
            .then(res => {
                console.log('Res Edit: ', res);
                navigation.goBack();
        });

    }}

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Edit Order</Text>

            </View>
            <View style={styles.menuBox}>
                <Image 
                    source={{
                        uri: `http://cassie-pos.000webhostapp.com/cassie/upload/menuPicture/${displayMenuPicture}`
                    }}
                    style={styles.menuPicture}
                />
                <Text style={styles.menuName}>{menuName}</Text>

                <NumberFormat 
                    value={menuPrice}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'Rp'} 
                    renderText={
                        formattedValue => <Text style={styles.menuPrice}>{formattedValue}</Text>
                    } 
                />
                        <View style={{marginBottom: resWidth * 0.1}}></View>
                <View style={styles.menuQuantity}>

                    <Text style={styles.txtMenuQuantity}>Order Quantity:</Text>

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
                </View>

                            <View style={{marginBottom: resWidth * 0.06}}></View>

                <View style={styles.menuNote}>

                    <Text style={styles.txtMenuNote}>Add note</Text>

                            <View style={{marginBottom: resWidth * 0.03}}></View>
                    
                    <TextInput
                        style={styles.noteBox}
                        multiline={true}
                        numberOfLines={resWidth * 0.02}
                        placeholder="What does your customer prefer?"
                        textAlignVertical="top"
                        defaultValue={menuNote}
                        onChangeText={defaultValue => onInputChange(defaultValue, 'menu_note')} 
                    />
                   
                </View>

            </View>

            <TouchableOpacity style={styles.btnAddToCart} onPress={() => updateCart()}>
                <Text style={styles.txtAddToCart}>Save</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default EditOrder

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
        marginBottom: resWidth * 0.12,
        justifyContent: 'center',
    },
    menuBox: {
        alignItems: 'center',
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
    menuPicture: {
        borderRadius: resWidth * 0.04,
        height: resWidth * 0.4,
        width: resWidth * 0.48,
        marginBottom: resWidth * 0.04,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.06,
        marginBottom: resWidth * 0.01,
    },
    menuPrice: {
        color: '#855B54',
        fontSize: resWidth * 0.045,
    },
    menuQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#ccc',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    txtMenuQuantity: {
        color: '#000',
        fontSize: resWidth * 0.05,
        fontWeight: 'bold',
    },
    menuNote: {
        // backgroundColor: '#ccc',
        alignSelf: 'stretch',
    },
    txtMenuNote: {
        color: '#000',
        fontSize: resWidth * 0.05,
        fontWeight: 'bold',
    },
    noteBox: {
        // borderColor: '#EAEAEA',
        borderTopColor: '#EAEAEA',
        borderBottomColor: '#EAEAEA',
        borderLeftColor: 'rgba(0, 0, 0, 0)',
        borderRightColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
    },
    quantityBtn: {
        borderRadius: resHeight,
        borderWidth: resWidth * 0.005,
        flexDirection: 'row',
        width: resWidth * 0.28,
        paddingHorizontal: resWidth * 0.02,
        paddingVertical: resWidth * 0.01,
        borderColor: '#855B54',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    quantityMinus: {
        width: resWidth * 0.03,
        height: resWidth * 0.03
    },
    quantityPlus: {
        width: resWidth * 0.03,
        height: resWidth * 0.03
    },
    txtQuantity: {
        fontSize: resWidth * 0.05,
        color: '#000',
    },
    btnAddToCart: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: resHeight * 0.039,
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.04,
        borderRadius: resHeight,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        shadowOpacity: resWidth * 0.03,
        shadowRadius: resWidth * 0.05,
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
