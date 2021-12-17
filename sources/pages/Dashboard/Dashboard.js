import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import profile1 from '../../assets/images/profile1.jpg'
import NotifIcon from '../../assets/icons/bell.png'
import Menu from '../../assets/icons/coffee-cup.png'
import Inventory from '../../assets/icons/inventory.png'
import Customer from '../../assets/icons/customer.png'
import Report from '../../assets/icons/report.png'
import Cashier from '../../assets/icons/cashier.png'
import History from '../../assets/icons/history2.png'
import RightArrow from '../../assets/icons/right-arrow.png'
import { ScrollView } from 'react-native-gesture-handler'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Dashboard = ({navigation}) => {
    const handleGoTo = (page) => {
        navigation.navigate(page)
    };
    const [currentDate, setCurrentDate] = useState('');

    const [loginCashierId, setLoginCashierId] = useState('');
    const [loginCashierName, setLoginCashierName] = useState('');
    const cashierFirstName = loginCashierName.split(' ')[0];
    const [loginCashierEmail, setLoginCashierEmail] = useState('');
    const [loginCashierPicture, setLoginCashierPicture] = useState('');
    const [totalOrder, setTotalOrder] = useState(0);
    const [todayIncome, setTodayIncome] = useState(0);
    const [todayOrder, setTodayOrder] = useState(0);
    const [todayMostTransaction, setTodayMostTransaction] = useState(0);
    const [totalMember, setTotalMember] = useState(0);
    const [previousOrderCashier, setPreviousOrderCashier] = useState('');
    const [previousOrderCustomer, setPreviousOrderCustomer] = useState('');
    const [previousOrderIsMember, setPreviousOrderIsMember] = useState('');
    const [previousOrderNoOrder, setPreviousOrderNoOrder] = useState('');
    const [previousOrderGrandtotal, setPreviousOrderGrandtotal] = useState('');
    const [previousOrderPointCut, setPreviousOrderPointCut] = useState('');
    const [previousOrderTotalPayment, setPreviousOrderTotalPayment] = useState('');
    
    useEffect(() => {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        // var hours = new Date().getHours(); //Current Hours
        // var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
          date + '/' + month + '/' + year 
        );

        navigation.addListener('focus', async() => {
        const cashierNameCheck = async () =>{

            const getLoginCashierId = await AsyncStorage.getItem('login_cashier_id');
            setLoginCashierId(getLoginCashierId);

            // const getLoginCashierName = await AsyncStorage.getItem('login_cashier_name');
            // setLoginCashierName(getLoginCashierName);

            // const getLoginCashierEmail = await AsyncStorage.getItem('login_cashier_email');
            // setLoginCashierEmail(getLoginCashierEmail);

            // const getLoginCashierPicture = await AsyncStorage.getItem('login_cashier_picture');
            // // setLoginCashierPicture(`https://robohash.org/${loginCashierEmail}`);
            // setLoginCashierPicture(getLoginCashierPicture);
        }
        const getCashierData = async () => {
            const gettingLoginCashierId = await AsyncStorage.getItem('login_cashier_id');

            axios
                .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showLoginCashier&cashier_id=${gettingLoginCashierId}`)
                .then(response => {
                    // console.log('Response Logged In Cashier: ', response)
                    setLoginCashierName(response.data.logged_in_cashier.cashier_name);
                    setLoginCashierEmail(response.data.logged_in_cashier.cashier_email);
                    setLoginCashierPicture(response.data.logged_in_cashier.cashier_picture);
        
            })
                .catch(e => alert(e.message))
        }
        cashierNameCheck();
        getCashierData();
    })
    }, []);

    
    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=shortcutBoxInfo')
            .then(response => {
                // console.log('Shortcut Box Info: ', response)
                setTotalOrder(response.data.total_order)
                setTodayOrder(response.data.today_order)
                setTodayIncome(response.data.today_income.today_income)
                setTodayMostTransaction(response.data.most_transaction.most_transaction)
                setTotalMember(response.data.total_member)
                setPreviousOrderCashier(response.data.latest_transaction.cashier_on_duty)
                setPreviousOrderCustomer(response.data.latest_transaction.ordering_customer_name)
                setPreviousOrderIsMember(response.data.latest_transaction.member)
                setPreviousOrderNoOrder(response.data.latest_transaction.no_order)
                setPreviousOrderGrandtotal(response.data.latest_transaction.order_grandtotal)
                setPreviousOrderPointCut(response.data.latest_transaction.point_cut)
                setPreviousOrderTotalPayment(response.data.latest_transaction.total_payment)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

            // const getCashierData = () => {
            //     axios
            //             .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showLoginCashier&cashier_id=${loginCashierId}`)
            //         .then(response => {
            //             console.log('Response Logged In Cashier: ', response)
            //             // setMenus(response.data.data.result)
            //     })
            //         .catch(e => alert(e.message))
            // }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
            <View style={styles.upperBackground}>
                <View style={styles.upperItem}>
                    <Image source={
                            loginCashierPicture != null ?
                            {
                                uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${loginCashierPicture}`
                            } : {
                                uri: `https://robohash.org/${loginCashierEmail}`
                            }
                            // uri: `https://robohash.org/${loginCashierEmail}`
                        } 
                        style={styles.profilePicture} 
                    />
                    <Text style={styles.userName}>Hi, {cashierFirstName}</Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>
                </View>
            </View>

            <View style={styles.shortcutBox}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>{totalOrder}</Text>
                        <Text style={styles.shortcutDesc}>Total Order</Text>
                    </View>
                    <View style={styles.shortcutItem}>
                    <NumberFormat 
                        value={todayIncome}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'Rp'} 
                        renderText={
                            formattedValue => <Text style={{...styles.shortcutInfo, fontSize: resWidth * 0.047}}>{formattedValue}</Text>
                        } 
                    />
                        {/* <Text style={styles.shortcutInfo}>{todayIncome}</Text> */}
                        <Text style={styles.shortcutDesc}>Today's Income</Text>
                    </View>
                </View>
                        <View style={styles.line}></View>
                <View style={{flexDirection: 'row'}}>
                <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>{todayOrder}</Text>
                        <Text style={styles.shortcutDesc}>Today's Order</Text>
                    </View>
                    <View style={styles.shortcutItem}>
                        {/* <Text style={styles.shortcutInfo}>{todayMostTransaction}</Text> */}
                        <NumberFormat 
                            value={totalMember}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            renderText={
                                formattedValue => <Text style={{...styles.shortcutInfo, fontSize: resWidth * 0.047}}>{formattedValue}</Text>
                            } 
                        />
                        <Text style={styles.shortcutDesc}>Total Member</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menus}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: resHeight * 0.03}}>
                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('Menu')}>
                        <Image source={Menu} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('Inventory')}>
                        <Image source={Inventory} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Inventory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('Customer')}>
                        <Image source={Customer} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Customer</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('Report')}>
                        <Image source={Report} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('Cashier')}>
                        <Image source={Cashier} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Cashier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxMenu} onPress={() => handleGoTo('History')}>
                        <Image source={History} style={styles.menuIcon} />
                        <Text style={styles.menuName}>History</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.lastOrderElement}>
                <Text style={styles.lastOrderText}>Previous Order</Text>

                    <View style={styles.previousOrderBox}>

                        <Text style={{...styles.itemResult, textAlign: 'right', fontSize: resWidth * 0.04}}>{previousOrderNoOrder}</Text>

                        <View style={styles.previousOrderItem}>
                            <Text style={styles.itemInfoNormal}>Cashier on duty</Text>
                            <Text style={styles.itemResult}>{previousOrderCashier}</Text>
                        </View>

                        <View style={styles.previousOrderItem}>
                            <Text style={styles.itemInfoNormal}>Customer name</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.itemResult}>{previousOrderCustomer}</Text>
                                {
                                    previousOrderIsMember === 'Yes' 
                                    ? 
                                        <Text style={{...styles.itemResult, color: '#56DF95'}}> (member)</Text>
                                    : 
                                        <Text style={{...styles.itemResultNormal}}> (not member)</Text>
                                }
                            </View>
                        </View>

                    {
                        previousOrderIsMember === 'Yes' ?

                            <View>
                                <View style={{...styles.previousOrderItem, flexDirection: 'row', marginBottom: 0, marginTop: resWidth * 0.06}}>
                                    <Text style={styles.itemInfoNormal}>Total Price</Text>

                                    <NumberFormat 
                                            value={previousOrderGrandtotal}
                                            displayType={'text'} 
                                            thousandSeparator={true} 

                                            renderText={
                                                formattedValue => 
                                                <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                        <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04,}}>Rp</Text>
                                                        <Text style={styles.itemResultNormal}>{formattedValue}</Text>
                                                </View>
                                            } 
                                    />
                                </View>
                                        
                                <View style={{...styles.previousOrderItem, flexDirection: 'row', marginVertical: resWidth * 0.015}}>
                                    <Text style={styles.itemInfoNormal}>Point Cut</Text>
                                        
                                    <NumberFormat 
                                            value={previousOrderPointCut}
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                        
                                            renderText={
                                                formattedValue => 
                                                <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text style={{...styles.menuPrice, fontWeight: 'normal', fontSize: resWidth * 0.0375, color: '#a2a3a8'}}>-Rp</Text>
                                                    <Text style={{...styles.itemResultNormal, color: '#a2a3a8', fontSize: resWidth * 0.0375}}>{formattedValue}</Text>
                                                </View>
                                            } 
                                    />
                                </View>
                            </View>
                        : null
                    }
                        <View style={{...styles.previousOrderItem, flexDirection: 'row', marginBottom: 0}}>
                            <Text style={styles.itemInfo}>Total Payment</Text>

                            <NumberFormat 
                                    value={previousOrderTotalPayment}
                                    displayType={'text'} 
                                    thousandSeparator={true} 

                                    renderText={
                                        formattedValue => 
                                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04,}}>Rp</Text>
                                                <Text style={styles.itemResult}>{formattedValue}</Text>
                                        </View>
                                    } 
                            />
                        </View>
                    </View>
            </View>


            {/* <View style={styles.waitingOrderElement}>
                <Text style={styles.waitingOrderText}>Waiting Order(s)</Text>

                <View style={styles.waitingOrderBox}>
                    <View style={styles.waitingOrderList}>
                        <Text style={styles.waitingOrderNum}>1</Text>
                        <Text style={styles.waitingOrderMenuName}>Milk Tea, Fried Rice</Text>

                        <View style={{position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.waitingOrderRemainingTime}>0h 35m</Text>
                            <Image source={RightArrow} style={styles.rightArrow} />
                        </View>
                    </View>

                            <View style={styles.line2} />

                    <View style={styles.waitingOrderList}>
                        <Text style={styles.waitingOrderNum}>2</Text>
                        <Text style={styles.waitingOrderMenuName}>French Fries, Green T..</Text>

                        <View style={{position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.waitingOrderRemainingTime}>0h 35m</Text>
                            <Image source={RightArrow} style={styles.rightArrow} />
                        </View>
                    </View>

                            <View style={styles.line2} />

                    <View style={{alignSelf: 'center'}}>
                        <Text style={styles.more}>More</Text>
                    </View>

                </View>
            </View> */}
            <View style={{marginBottom: resWidth * 0.35}}></View>
        </ScrollView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: resHeight,
    },
    upperBackground: {
        // position: 'absolute',
        // top: 0,
        // right: 0,
        // left: 0,
        backgroundColor: '#FFE9C0',
        // borderBottomRightRadius: 70,
        // borderBottomLeftRadius: 70,
        borderBottomRightRadius: resWidth * 0.18,
        borderBottomLeftRadius: resWidth * 0.18,
        // paddingVertical: 70,
        paddingVertical: resHeight * 0.09,
        // paddingHorizontal: 45,
        paddingHorizontal: resWidth * 0.12,
        zIndex: 0,
    },
    upperItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // top: -30,
        top: -(resHeight * 0.045),
    },
    profilePicture: {
        backgroundColor: '#fff',
        borderRadius: resHeight,
        borderColor: '#855B54',
        // borderWidth: 3,
        borderWidth: resWidth * 0.008,
        // width: 40,
        // height: 40,
        width: resWidth * 0.103,
        height: resWidth * 0.103,
    },
    userName: {
        // fontSize: 16,
        fontSize: resWidth * 0.04,
        // marginLeft: 14,
        marginLeft: resWidth * 0.038,
        color: '#000',
    },
    notification: {
        // width: 25,
        // height: 25,
        width: resWidth * 0.064,
        height: resWidth * 0.064,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        // width: 10,
        // height: 10,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
    },
    shortcutBox: {
        backgroundColor: '#fff',
        shadowColor: '#969696',
        // shadowOffset: {width: -2, height: -4},
        shadowOffset: {width: -(resWidth * 0.05), height: -(resWidth * 0)},
        // shadowOpacity: 0.2,
        shadowOpacity: resWidth * 0.01,
        // shadowRadius: 3,
        shadowRadius: resWidth * 0.05,
        // elevation: 5,
        elevation: resWidth * 0.012,
        // marginHorizontal: 45,
        marginHorizontal: resWidth * 0.115,
        // top: 100,
        top: -(resHeight * 0.1),
        // borderRadius: 30,
        borderRadius: resWidth * 0.07,
        // paddingHorizontal: 15,
        paddingHorizontal: resWidth * 0.04,
        // paddingVertical: 5,
        paddingVertical: resHeight * 0.008,
        justifyContent: 'center',
        zIndex: 1,
    },
    shortcutItem: {
        flex: 0.5,
        // backgroundColor: '#ccc',
        // marginHorizontal: 5,
        // marginVertical: 10,
        marginVertical: resHeight * 0.0129,
        justifyContent: 'center',
    },
    
    shortcutInfo: {
        // fontSize: 19,
        fontSize: resWidth * 0.05,
        color: '#855B54',
        textAlign: 'center',
    },
    shortcutDesc: {
        // fontSize: 14,
        // backgroundColor: '#ccc',
        fontSize: resWidth * 0.036,
        color: '#AFAFAF',
        textAlign: 'center',
        // marginVertical: 5,
        marginVertical: resHeight * 0.006,
    },
    line: {
        // height: 0.5,
        height: resHeight * 0.0008,
        opacity: 0.5,
        backgroundColor: '#969696',
        // marginHorizontal: 7,
        marginHorizontal: resWidth * 0.02,
    },
    menus: {
        // backgroundColor: '#ccc',
        // top: 105,
        top: -(resHeight * 0.05),
        // paddingHorizontal: 45,
        paddingHorizontal: resWidth * 0.115,
    },
    boxMenu: {
        backgroundColor: '#fff',
        // width: 91,
        // height: 105,
        // height: resHeight * 0.14,
        height: resWidth * 0.28,
        // shadowColor: '#969696',
        // shadowOffset: {width: 0, height: -10},
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 7,
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -(resWidth * 1)},
        shadowOpacity: resWidth * 0.01,
        shadowRadius: resWidth * 0.1,
        elevation: resWidth * 0.012,
        // borderRadius: 20,
        borderRadius: resWidth * 0.054,
        // flex: 0.29,
        flex: resWidth * 0.00075,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        // width: 45,
        // height: 45,
        width: resWidth * 0.115,
        height: resWidth * 0.115,
        // marginBottom: 10,
        marginBottom: resHeight * 0.015,
    },
    menuName: {
        color: '#000',
        // fontSize: 13,
        fontSize: resWidth * 0.033,
    },
    lastOrderElement:{
        paddingHorizontal: resWidth * 0.115,
        paddingVertical: resWidth * 0.01,
        // backgroundColor: '#ccc',
    },
    lastOrderText: {
        fontSize: resWidth * 0.0505,
        color: '#000',
        marginBottom: resHeight * 0.02,
        marginLeft: resWidth * 0.01,
    },
    previousOrderBox: {
        backgroundColor: '#F4F6FA',
        paddingHorizontal: resWidth * 0.06,
        paddingVertical: resWidth * 0.06,
        borderRadius: resWidth * 0.05,
    },
    previousOrderItem: {
        marginVertical: resWidth * 0.02,
    },
    itemInfo: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
        marginBottom: resWidth * 0.02,
    },
    itemInfoNormal: {
        color: '#000',
        fontSize: resWidth * 0.037,
    },
    itemResult: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.037,
    },
    itemResultNormal: {
        color: '#000',
        fontSize: resWidth * 0.037,
    },
    menuPrice: {
        fontSize: resWidth * 0.035,
        color: '#000',
        fontWeight: 'bold',
    },
    currency: {
        color: '#56DF95',
    },


    
    waitingOrderElement:{
        // backgroundColor: '#ccc',
        // top: 130,
        // paddingHorizontal: 45,
        paddingHorizontal: resWidth * 0.115,
    },
    waitingOrderText: {
        // fontSize: 20,
        fontSize: resWidth * 0.0505,
        color: '#000',
        // marginBottom: 15,
        marginBottom: resHeight * 0.02,
    },
    waitingOrderBox: {
        backgroundColor: '#fff',
        // shadowColor: '#969696',
        // shadowOffset: {width: 0, height: -10},
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 7,
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -(resWidth * 0.9)},
        shadowOpacity: resWidth * 0.09,
        shadowRadius: resWidth * 0.09,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.025,
        paddingVertical: resWidth * 0.05,
    },
    waitingOrderList: {
        flexDirection: 'row',
        // paddingHorizontal: 10,
        paddingHorizontal: resWidth * 0.025,
        alignItems: 'center'
    },
    waitingOrderNum: {
        backgroundColor: '#FC6B68',
        // borderRadius: 100,
        borderRadius: resHeight,
        color: '#fff',
        // padding: 3,
        // paddingHorizontal: 8,
        paddingVertical: resHeight * 0.003,
        paddingHorizontal: resWidth * 0.02,
        fontWeight: 'bold',
    },
    waitingOrderMenuName: {
        color: '#000',
        // paddingLeft: 10,
        paddingLeft: resWidth * 0.025,
    },
    waitingOrderRemainingTime: {
        color: '#FF0000',
        // paddingLeft: 10,
        // marginRight: 10,
        marginRight: resWidth * 0.025,
    },
    rightArrow: {
        // width: 15,
        // height: 15,
        width: resWidth * 0.035,
        height: resWidth * 0.035,
        // marginRight: 7,
        marginRight: resWidth * 0.016,
    },
    line2: {
        height: resHeight * 0.0008,
        opacity: 0.3,
        backgroundColor: '#969696',
        // marginHorizontal: 3,
        marginHorizontal: resWidth * 0.01,
        // marginVertical: 10,
        marginVertical: resHeight * 0.02,
    },
    more: {
        // fontSize: 16,
        fontSize: resWidth * 0.05,
        color: '#000'
    }
})
