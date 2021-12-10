import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
// import CheckBox from '@react-native-community/checkbox';
import { Checkbox } from 'react-native-paper';
import PreviewImage from '../../assets/images/preview2.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NumberFormat from 'react-number-format';
import LeftArrow from '../../assets/icons/left.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const CartItemData = ({menu_name, menu_qty, order_subtotal}) => {
    return (
        // <View>
        //    <Text style={{textAlign: 'right'}}>{menu_name} x {menu_qty}</Text>
        // </View>
        <View style={styles.menuBox}>
            <View style={styles.menuPictureBox}>
                    <Image 
                        source={PreviewImage}
                        style={styles.menuPicture}
                    />
            </View>
            <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{menu_name}</Text>
                <NumberFormat 
                        value={order_subtotal}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp'} 
                        renderText={
                            formattedValue => <Text style={styles.menuPrice}>{formattedValue}</Text>
                        } 
                />
            </View>
            <View style={styles.menuQuantity}>
                <Text style={styles.txtMenuQuantity}>x {menu_qty}</Text>
            </View>
        </View>
    )
}

const Checkout = ({navigation}) => {

    const [notMember, setNotMember] = useState(null);
    const [isMember, setIsMember] = useState(null);

    const [checkMember, setCheckMember] = useState(null);
    const [validatedMemberName, setValidatedMemberName] = useState('');
    const [memberPoint, setMemberPoint] = useState('');
    const [memberPointValue, setMemberPointValue] = useState('');
    const [pointCut, setPointCut] = useState('');

    const [checked, setChecked] = useState(false);
    const [usePoint, setUsePoint] = useState(null);

    const btnNo = () => {{
        setIsMember(null);
        setNotMember(true);
        setCheckMember(null);
        setUsePoint(null);
        setChecked(false);
    }}

    const btnYes = () => {{
        setIsMember(true);
        setNotMember(null);
    }}

    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState('');
    const [totalPayment, setTotalPayment] = useState('');

    const [cashierOnDuty, setCashierOnDuty] = useState([]);
    const [dataCheckout, setDataCheckout] = useState({
        // cashier_on_duty: cashierOnDuty,
        ordering_customer_code: '',
        not_member_customer_name: '',
        // order_grandtotal: grandTotal,
      });

    const onInputChange = (value, input) => {
        setDataCheckout({
          ...dataCheckout,
          [input]: value,
        });
      };

    
    const checkMemberCode = () => {{
    //   const dataMember = `customer_unique=${cashierLogin.email}&cashier_password=${cashierLogin.password}`;
        axios.get(
            `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=validateMember&customer_unique_code=${dataCheckout.ordering_customer_code}`)
            .then(res => {
                // console.log('Result check member: ', res);
                if (res.data.status == 'correct') {
                    //alert('correct');
                    setValidatedMemberName(res.data.customer_name);
                    setMemberPoint(parseInt(res.data.customer_point));
                    setCheckMember(true);
                    setChecked(false);
                    setUsePoint(true);
                }else{
                    alert('Sorry, the code you entered is wrong :(');
                    setCheckMember(null);
                    setChecked(false);
                    setUsePoint(null);
                }

            })
    }}

    // const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const checkUsePoint = () => {{
        setChecked(!checked);
        setMemberPointValue(parseInt(memberPoint * 100));
    }}

    useEffect(() => {
        navigation.addListener('focus', async() => {
            
            const menuNameCheck = async () =>{

                const getCashierOnDuty = await AsyncStorage.getItem('login_cashier_name');
                setCashierOnDuty(getCashierOnDuty);
            }
            menuNameCheck();
            // setTotalPayment(grandTotal)

            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCart')
            .then(response => {
                // console.log('Response Cart Items: ', response)
                setCartItems(response.data.data.result)
                setGrandTotal(parseInt(response.data.grandtotal.grandtotal))
                // setTotalPayment(parseInt(response.data.grandtotal.grandtotal))

                // if(checked === true){
                //     setTotalPayment(1)
    
                // }else{
                //     setTotalPayment(parseInt(response.data.grandtotal.grandtotal))
                // }
        })

            .catch(e => alert(e.message))

        })
        
    }, []);

    useEffect(() => {
        if(checked === true){
            if(grandTotal >= memberPointValue)
            {
                setPointCut(memberPointValue)
            }else{
                setPointCut(grandTotal);
            }
        }else{
            setPointCut(0);
        }

      });

    useEffect(() => {
        if(checked === true){
            if(grandTotal >= pointCut)
            {
                setTotalPayment(grandTotal - pointCut)
            }else{
                setTotalPayment(0);
            }
        }else{
            setTotalPayment(grandTotal);
        }

      });

    const placeOrder = () => {{

        if (notMember === true && isMember === null){
            if(dataCheckout.not_member_customer_name === ''){
                alert("Please input your customer's name");
            }else{
                const checkoutData = `cashier_on_duty=${cashierOnDuty}&ordering_customer_name=${dataCheckout.not_member_customer_name}&member=${'No'}&order_grandtotal=${grandTotal}`;
                    axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=checkout', checkoutData)
                    .then(res => {
                        console.log('respon: ', res);
                        navigation.navigate('Dashboard');
                    });
            }
        }

        // console.log('Customer name: ', dataCheckout.ordering_customer_code);
        // console.log('Cashier name: ', cashierOnDuty);
        // console.log('Grandtotal: ', grandTotal);
        else if (isMember === true && notMember === null){
            if(dataCheckout.ordering_customer_code === ''){
                alert("Please input your customer's special code");
            }else{
                // const checkoutData = `cashier_on_duty=${cashierOnDuty}&ordering_customer_code=${dataCheckout.ordering_customer_code}&member=${'Yes'}&order_grandtotal=${grandTotal}`;
                //     axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=checkout', checkoutData)
                //     .then(res => {
                //         console.log('respon: ', res);
                //         navigation.navigate('Dashboard');
                // });

                if(checked === true){
                    const checkoutData = `cashier_on_duty=${cashierOnDuty}&ordering_customer_code=${dataCheckout.ordering_customer_code}&member=${'Yes'}&use_point=${'Yes'}&point_used=${pointCut/100}&order_grandtotal=${grandTotal}&point_cut=${pointCut}&total_payment=${totalPayment}`;
                    axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=checkout', checkoutData)
                    .then(res => {
                        console.log('respon: ', res);
                        navigation.navigate('Dashboard');
                    });
                }else{
                    const checkoutData = `cashier_on_duty=${cashierOnDuty}&ordering_customer_code=${dataCheckout.ordering_customer_code}&member=${'Yes'}&use_point=${'No'}&order_grandtotal=${grandTotal}`;
                        axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=checkout', checkoutData)
                        .then(res => {
                            console.log('respon: ', res);
                            navigation.navigate('Dashboard');
                        });
                }
            }   
        }
        else{
            alert('Please confirm about your customer membership')
        }
        // navigation.navigate('Dashboard');


    }}
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Cart</Text>

            </View>
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
           {/* <Text style={{textAlign: 'right'}}>
               Grandtotal: 
               <NumberFormat 
                        value={grandTotal}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp'} 
                        renderText={
                            formattedValue => <Text> {formattedValue}</Text>
                        } 
                />
            </Text> */}

                    <View style={{marginBottom: resWidth * 0.05}}></View>

        <View style={styles.hasMemberBox}>

            <Text 
                style={{
                    fontSize: resWidth * 0.045, color: '#000', fontWeight: 'bold'
            }}>
                    Is your customer a member?
            </Text>
            <View style={styles.isAMember}>
                <TouchableOpacity onPress={() => btnYes()} style={styles.buttonYes}>
                    <Text style={styles.txtButtonYesNo}>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => btnNo()} style={styles.buttonNo}>
                    <Text style={styles.txtButtonYesNo}>NO</Text>
                </TouchableOpacity>
            </View>

        </View>
                
                <View style={{marginBottom: resWidth * 0.08}}></View>

            {
                isMember ? (
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TextInput 
                                placeholder="Customer's special code" 
                                placeholderTextColor="#B1B1B1"
                                keyboardType="number-pad"
                                style={styles.customTextInput}
                                onChangeText={value => onInputChange(value, 'ordering_customer_code')} 
                            />
                            <TouchableOpacity onPress={() => checkMemberCode()} style={styles.buttonConfirm}>
                                <Text style={styles.txtButtonConfirm}>Validate</Text>
                            </TouchableOpacity>
                        </View>
                        {
                        usePoint ? 
                            memberPoint < 1 ? null :

                                memberPoint > 1 ?
                                    (
                                        <Checkbox.Item
                                            status={checked ? 'checked' : 'unchecked'}
                                            label={"Use point? ("+memberPoint+" points)"}
                                            onPress={() => checkUsePoint()}
                                            style={styles.usePointCheckBox}
                                        /> 
                                    ) :
                                    (
                                        <Checkbox.Item
                                            status={checked ? 'checked' : 'unchecked'}
                                            label={"Use point? ("+memberPoint+" point)"}
                                            onPress={() => checkUsePoint()}
                                            style={styles.usePointCheckBox}
                                        /> 
                                    )
                                : null
                        }
                            <View style={{marginBottom: resWidth * 0.08}} />
                    
                    </View>
                    
                ) : 
                null
            }
            {
                notMember ? 
                (   <View>
                        <TextInput 
                            placeholder="Customer's name" 
                            placeholderTextColor="#B1B1B1"
                            style={styles.customTextInput}
                            onChangeText={value => onInputChange(value, 'not_member_customer_name')} 
                        />
                            <View style={{marginBottom: resWidth * 0.08}} />
                    </View>
                )
                : null
            }
           

            <View style={styles.proceedToCheckoutBox}>

                {
                    checkMember ?
                        <View style={styles.itemCheckOut}>
                            <Text style={styles.itemInfo}>Customer name: {validatedMemberName}</Text>
                        </View>
                    : null
                }

                <View style={styles.itemCheckOutNormal}>
                    <Text style={styles.itemInfoNormal}>Cashier on duty: {cashierOnDuty}</Text>
                </View>

                        <View style={{marginBottom: resWidth * 0.02}} />

                <View style={styles.itemCheckOut}>
                    <Text style={styles.itemInfoNormal}>Total Price</Text>
                    <NumberFormat 
                        value={grandTotal}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp'}

                        renderText={
                            formattedValue => <Text style={styles.itemResultNormal}> {formattedValue}</Text>
                        } 
                    />
                </View>

                {
                    checked ?
                        <View style={styles.itemCheckOut}>
                            <Text style={styles.itemInfoNormal}>Point cut:</Text>
                            <NumberFormat 
                                value={pointCut}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}

                                renderText={
                                    formattedValue => <Text style={styles.itemResultNormal}>-{formattedValue}</Text>
                                } 
                            />
                            {/* {

                            grandTotal >= (pointCut) ?
                            <NumberFormat 
                                value={pointCut}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}

                                renderText={
                                    formattedValue => <Text style={styles.itemResultNormal}>-{formattedValue}</Text>
                                } 
                            />
                            :
                            <NumberFormat 
                                value={grandTotal}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}

                                renderText={
                                    formattedValue => <Text style={styles.itemResultNormal}>-{formattedValue}</Text>
                                } 
                            />
                        } */}

                        </View>
                    : null
                }

                <View style={styles.itemCheckOut}>
                    <Text style={styles.itemInfo}>Total Payment</Text>
                    {/* {
                        checked ?
                            grandTotal > pointCut ?
                            <NumberFormat 
                                value={grandTotal - pointCut}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}

                                renderText={
                                    formattedValue => <Text style={styles.itemResult}> {formattedValue}</Text>
                                } 
                            />
                            :
                            <NumberFormat 
                                value={0}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp'}

                                renderText={
                                    formattedValue => <Text style={styles.itemResult}> {formattedValue}</Text>
                                } 
                            />
                        :
                        <NumberFormat 
                            value={grandTotal}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp'}

                            renderText={
                                formattedValue => <Text style={styles.itemResult}> {formattedValue}</Text>
                            } 
                        />
                    } */}

                    <NumberFormat 
                            value={totalPayment}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp'}

                            renderText={
                                formattedValue => <Text style={styles.itemResult}> {formattedValue}</Text>
                            } 
                        />

                </View>
                
                <TouchableOpacity style={styles.btnPlaceOrder} onPress={() => placeOrder()}>
                    <Text style={styles.txtPlaceOrder}>CHECKOUT</Text>
                </TouchableOpacity>

            </View>

                    <View style={{marginBottom: resWidth * 0.25}}></View>

        </ScrollView>
    )
}

export default Checkout

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
        marginBottom: resWidth * 0.1 ,
    },
    btnArrowLeft: {
        left: 0,
        position: 'absolute',
    },
    arrowLeft: {
        width: resWidth * 0.09,
        height: resWidth * 0.09,
    },
    title: {
        fontSize: resWidth * 0.06,
        fontWeight: 'bold',
        color: '#000',
    },
    menuBox: {
        backgroundColor: '#F4F6FA',
        // backgroundColor: '#FFF',
        // shadowColor: '#969696',
        // shadowOffset: {width: -(resWidth * 0.1), height: resWidth * 1},
        // shadowOpacity: resWidth * 0.01,
        // shadowRadius: resWidth * 0.9,
        // elevation: resWidth * 0.012,
        borderTopRightRadius: resWidth * 0.5,
        borderBottomRightRadius: resWidth * 0.5,
        borderTopLeftRadius: resWidth,
        borderBottomLeftRadius: resWidth,
        marginBottom: resWidth * 0.05,
        marginHorizontal: resWidth * 0.005,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuPictureBox: {
        // marginLeft: resWidth * 0.05,
        zIndex: 1,
    },
    menuPicture: {
        borderRadius: resHeight,
        height: resWidth * 0.26,
        width: resWidth * 0.26,
    },
    menuInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.05,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.045,
        marginBottom: resWidth * 0.01,
        maxWidth: resWidth * 0.3,
        // width: resWidth * 0.3,
        // backgroundColor: '#ccc',
    },
    menuPrice: {
        fontSize: resWidth * 0.035,
        color: '#c4c6cf',
        // color: '#dbdce2',
        fontWeight: 'bold',
    },
    menuQuantity: {
        // backgroundColor: '#ccc',
        justifyContent: 'center',
        position: 'absolute',
        right: resWidth * 0.08,
        top: 0,
        bottom: 0,
    },
    txtMenuQuantity: {
        color: '#000',
        fontSize: resWidth * 0.045,
        fontWeight: 'bold',
    },
    hasMemberBox: {
        // backgroundColor: '#F9F9F9',
        backgroundColor: '#F4F6FA',
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.08,
        borderRadius: resWidth * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    isAMember: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F9F9F9',
        alignSelf: 'stretch',
        marginTop: resWidth * 0.05,
    },
    buttonYes: {
        backgroundColor: '#56DF95',
        height: resWidth * 0.12,
        width: resWidth * 0.28,
        borderRadius: resWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNo: {
        // backgroundColor: '#FF6464',
        backgroundColor: '#FF345D',
        height: resWidth * 0.12,
        width: resWidth * 0.28,
        borderRadius: resWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtButtonYesNo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: resWidth * 0.045,
        letterSpacing: resWidth * 0.008,
    },
    customTextInput: {
        backgroundColor: '#F4F6FA',
        borderTopLeftRadius: resWidth * 0.028,
        borderBottomLeftRadius: resWidth * 0.028,
        padding: resWidth * 0.05,
        // flex: 0.65,
        flex: resWidth * 0.065,
    },
    buttonConfirm: {
        backgroundColor: '#32bea6',
        borderTopRightRadius: resWidth * 0.028,
        borderBottomRightRadius: resWidth * 0.028,
        justifyContent: 'center',
        alignItems: 'center',
        padding: resWidth * 0.05,
        // flex: 0.35,
        flex: resWidth * 0.035,
    },
    txtButtonConfirm: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: resWidth * 0.045,
        letterSpacing: resWidth * 0.002,
    },
    usePointCheckBox: {
        marginTop: resWidth * 0.01,
    },
    proceedToCheckoutBox: {
        backgroundColor: '#F4F6FA',
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.08,
        borderRadius: resWidth * 0.05,
    },
    itemCheckOut: {
        flexDirection: 'row',
        // backgroundColor: '#ccc',
    },
    itemInfo: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
        marginBottom: resWidth * 0.02,
    },
    itemResult: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
        position: 'absolute',
        right: 0,
    },
    itemInfoNormal: {
        color: '#000',
        fontSize: resWidth * 0.04,
        marginBottom: resWidth * 0.02,
    },
    itemResultNormal: {
        color: '#000',
        fontSize: resWidth * 0.04,
        position: 'absolute',
        right: 0,
    },
    btnPlaceOrder: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.04,
        // borderRadius: resWidth * 0.028,
        marginTop: resWidth * 0.05,
        borderRadius: resHeight,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        shadowOpacity: resWidth * 0.03,
        shadowRadius: resWidth * 0.05,
        elevation: resWidth * 0.02,
    },
    txtPlaceOrder: {
        color: '#fff',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.042,
        fontWeight: '500',
        letterSpacing: resWidth * 0.01,
    },
})
