import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const CartItemData = ({menu_name, menu_qty}) => {
    return (
        <View>
           <Text style={{textAlign: 'right'}}>{menu_name} x {menu_qty}</Text>
        </View>

    )
}

const Checkout = ({navigation}) => {

    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);
    const [cashierOnDuty, setCashierOnDuty] = useState([]);
    const [dataCheckout, setDataCheckout] = useState({
        // cashier_on_duty: cashierOnDuty,
        ordering_customer_name: '',
        // order_grandtotal: grandTotal,
      });

    const onInputChange = (value, input) => {
        setDataCheckout({
          ...dataCheckout,
          [input]: value,
        });
      };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            
            const cashierNameCheck = async () =>{

                const getCashierOnDuty = await AsyncStorage.getItem('login_cashier_name');
                setCashierOnDuty(getCashierOnDuty);
            }
            cashierNameCheck();

            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCart')
            .then(response => {
                console.log('Response Cart Items: ', response)
                setCartItems(response.data.data.result)
                setGrandTotal(response.data.grandtotal.grandtotal)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    const placeOrder = () => {{

        // console.log('Customer name: ', dataCheckout.ordering_customer_name);
        // console.log('Cashier name: ', cashierOnDuty);
        // console.log('Grandtotal: ', grandTotal);
        const checkoutData = `cashier_on_duty=${cashierOnDuty}&ordering_customer_name=${dataCheckout.ordering_customer_name}&order_grandtotal=${grandTotal}`;
            axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=checkout', checkoutData)
            .then(res => {
                console.log('respon: ', res);
                navigation.navigate('DashboardfromLogin');
        });

    }}
    
    return (
        <View style={styles.container}>
            <Text>Checkout</Text>
            <Text>Cashier on duty: {cashierOnDuty}</Text>
            {cartItems.map(item => {
                    return(
                        <CartItemData
                            key={item.menu_id} 
                            menu_name={item.menu_name} 
                            menu_qty={item.temp_order_qty} 
                            order_subtotal={item.temp_order_subtotal}
                            order_total={item.temp_order_total} 
                            horizontal={true}
                            // onOrderPress={() => addOrder(item)}
                        />


                    );
                })}
           <Text style={{textAlign: 'right'}}>Grandtotal: {grandTotal}</Text>

           <TextInput 
                placeholder="Customer name" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'ordering_customer_name')} 
            />

           <TouchableOpacity style={styles.btnPlaceOrder} onPress={() => placeOrder()}>
                <Text style={styles.txtPlaceOrder}>Place Order</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        padding: resWidth * 0.128,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
    btnPlaceOrder: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        // marginTop: 20,
        marginTop: resHeight * 0.039,
        // padding: 20,
        padding: resWidth * 0.05,
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
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
    txtPlaceOrder: {
        color: '#fff',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
    
    customTextInput: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.05,
        marginTop: resHeight * 0.03,
    },
})
