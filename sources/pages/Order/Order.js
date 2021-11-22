import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PreviewImage from '../../assets/images/preview2.png'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import SearchIcon from '../../assets/icons/search.png'
import ClearIcon from '../../assets/icons/cross.png'
import PlusIcon from '../../assets/icons/square-plus-white.png'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const MenuData = ({menu_name, menu_category, menu_price, onOrderPress}) => {
    return (
        <View style={styles.menuBox}>
            <Image 
                source={PreviewImage}
                style={styles.menuPicture}
            />
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
            <TouchableOpacity style={styles.menuEditBtn} onPress={() => onOrderPress()}>
                <Image 
                    source={PlusIcon}
                    style={styles.menuPlusIcon}
                />
            </TouchableOpacity>
        </View>

    )
}

// const cartData = ({cart_menu_name, item_amount}) => {

// }

const Order = ({navigation}) => {

    const [menus, setMenus] = useState([]);

    const [cart, setCart] = useState([]);
    const [cartAmount, setCartAmount] = useState([]);

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
                console.log('Response Order Menu: ', response)
                setMenus(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    const addOrder = (item) => {
        console.log('Selected menu for order: ', item);
        AsyncStorage.setItem('order_menu_id',item.menu_id);
        AsyncStorage.setItem('order_menu_name',item.menu_name);
        AsyncStorage.setItem('order_menu_category',item.menu_category);
        AsyncStorage.setItem('order_menu_price',item.menu_price);
        navigation.navigate('AddOrder');
    }

    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCartAmount')
            .then(response => {
                console.log('Response Cart Amount: ', response)
                setCartAmount(response.data.data.result.cart_amount)
                // setCart(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    const proceedToCheckout = () => {
        axios
        .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCart')
            .then(response => {
                console.log('Proceed to Checkout: ', response);
                navigation.navigate('Checkout');
        })
    }
    
    return (
    <View>
        <ScrollView style={styles.container} 
                // contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
            >
                <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Order</Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>

                </View>
                <Searchbar
                    placeholder="What does your customer want?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon={SearchIcon}
                    iconColor={'#9DA7B2'}
                    clearIcon={ClearIcon}
                    style={styles.searchBar}
                    placeholderTextColor={'#96A0AB'}
                    inputStyle={{
                        fontSize: resWidth * 0.032, 
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
                            horizontal={true}
                            onOrderPress={() => addOrder(item)}
                        />


                    );
                })}

            </View>
                    <View style={{marginBottom: resWidth * 0.2}}></View>
            </ScrollView>

            <TouchableOpacity style={{marginHorizontal: resWidth * 0.1}} onPress={() => proceedToCheckout()}>        
                <View style={styles.cart}>
                    <Text style={styles.txtCartAmount}>
                        {cartAmount} item(s)
                    </Text>
                </View>
            </TouchableOpacity>

    </View>
    )
}

export default Order

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
    menuList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // backgroundColor: '#eee',
        marginVertical: resWidth * 0.1,
    },
    menuBox: {
        backgroundColor: '#fff',
        height: resWidth * 0.28,
        // width: 150,
        width: resWidth * 0.38,
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -(resWidth * 1)},
        shadowOpacity: resWidth * 0.01,
        shadowRadius: resWidth * 0.1,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: resWidth * 0.05,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.045,
    },
    menuPrice: {
        color: '#7E7E7E',
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
    menuPlusIcon: {
        width: resWidth * 0.05,
        height: resWidth * 0.05,
    },
    cart: {
        bottom: resWidth * 0.18,
        position: 'absolute',
        backgroundColor: '#A7796D',
        left: 0,
        right: 0,
        paddingVertical: resWidth * 0.05,
        paddingHorizontal: resWidth * 0.05,
        borderRadius: resHeight,
    },
    txtCartAmount: {
        color: '#fff',
    }
})
