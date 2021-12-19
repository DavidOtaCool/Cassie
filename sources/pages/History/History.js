import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const OrderData = ({no_order, order_date, cashier_on_duty, ordering_customer_name, member, order_grandtotal, point_cut, total_payment, onPressHistory}) => {
    return (

    <TouchableOpacity style={styles.historyOrderBox} onPress={onPressHistory}>
        <View style={styles.itemTitleInfo}>
            <Text style={styles.itemResultNormal}>{order_date}</Text>
            <Text style={{...styles.itemResult, position: 'absolute', right: 0, fontSize: resWidth * 0.04}}>{no_order}</Text>
        </View>
        <View style={styles.line} />
        {/* <Text>{cashier_on_duty}</Text> */}
        <View style={styles.historyOrderItem}>
            <Text style={{...styles.itemInfoNormal, marginBottom: resWidth * 0.005}}>Customer name</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemResult}>{ordering_customer_name}</Text>
                {
                    member === 'Yes' 
                    ? 
                        <Text style={{...styles.itemResult, color: '#56DF95'}}> (member)</Text>
                    : 
                        <Text style={{...styles.itemResultNormal}}> (not member)</Text>
                }
            </View>
        </View>
        {/* <Text>{order_grandtotal}</Text> */}
        {/* <Text>{point_cut}</Text> */}
        <View style={{...styles.historyOrderItem, flexDirection: 'row', marginBottom: 0}}>
            <Text style={styles.itemInfo}>Total Payment</Text>

            <NumberFormat 
                value={total_payment}
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
    </TouchableOpacity>
    )
}

// const OrderDetailData = ({no_order, menu_name, menu_note, order_qty, order_subtotal, order_total, cashier_on_duty, ordering_customer_name, member, order_date, order_grandtotal, point_cut, total_payment}) => {
const OrderDetailData = ({no_order, menu_name, menu_note, order_qty, order_subtotal, order_total}) => {
    return (    

    <View style={styles.orderDetailItemBox}>
        <View style={styles.orderDetailItem}>
            <Text style={styles.itemInfoNormal}>Menu Name:</Text>
            <Text style={styles.menuNameDetailStyle}>{menu_name}</Text>
        </View>
        {
            menu_note ? 
                <View style={styles.orderDetailItem}>
                    <Text style={styles.itemInfoNormal}>Note:</Text>
                    <Text style={styles.menuNoteDetailStyle}>{menu_note}</Text>
                </View>
            : null
        }
        <View style={{...styles.orderDetailItem, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{...styles.itemInfoNormal, position: 'absolute', left: 0}}>Subtotal:</Text>
            <Text style={{...styles.itemResultNormal, color: '#969696'}}>{order_qty} x </Text>
            <NumberFormat 
                value={order_subtotal}
                displayType={'text'} 
                thousandSeparator={true} 

                renderText={
                    formattedValue => 
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04,}}>Rp</Text>
                            <Text style={{...styles.itemResultNormal, color: '#969696'}}>{formattedValue}</Text>
                    </View>
                } 
            />
        </View>
            <View style={{...styles.line, marginBottom: resWidth * 0.03, marginTop: resWidth * 0.015}} />
                <View style={{...styles.orderDetailItem, flexDirection: 'row'}}>
                    <Text style={styles.itemResult}>Total: </Text>
                    <NumberFormat 
                        value={order_total}
                        displayType={'text'} 
                        thousandSeparator={true} 
                    
                        renderText={
                            formattedValue => 
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0}}>
                                    <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04}}>Rp</Text>
                                    <Text style={styles.itemResult}>{formattedValue}</Text>
                            </View>
                        } 
                    />
                </View>
            {/* <Text>{cashier_on_duty}</Text>
            <Text>{member}</Text>
            <Text>{order_date}</Text>
            <Text>{order_grandtotal}</Text>
            <Text>{ordering_customer_name}</Text>
            <Text>{point_cut}</Text>
            <Text>{total_payment}</Text> */}
    </View>
    )
}

const History = ({navigation}) => {
    
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [selectedNoOrder, setSelectedNoOrder] = useState('');
    const [selectedOrderCashier, setSelectedOrderCashier] = useState('');
    const [selectedOrderCustomer, setSelectedOrderCustomer] = useState('');
    const [selectedOrderMember, setSelectedOrderMember] = useState('');
    const [selectedOrderDate, setSelectedOrderDate] = useState('');
    const [selectedOrderGrandtotal, setSelectedOrderGrandtotal] = useState('');
    const [selectedOrderQty, setSelectedOrderQty] = useState('');
    const [selectedOrderPointCut, setSelectedOrderPointCut] = useState('');
    const [selectedOrderTotalPayment, setSelectedOrderTotalPayment] = useState('');
    const [seeDetail, setSeeDetail] = useState(null);

    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showHistory')
            .then(response => {
                // console.log('History info: ', response)
                setOrders(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    const seeHistoryDetail = (item) => {
        // console.log('Selected order: ', item);
        // setSelectedOrderNumber(item.no_order);
        axios
                .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showHistoryDetail&no_order=${item.no_order}`)
            .then(response => {
                console.log('History detail info: ', response)
                setOrderDetails(response.data.data.result)
                setSelectedNoOrder(response.data.selected_tborder.no_order)
                setSelectedOrderCashier(response.data.selected_tborder.cashier_on_duty)
                setSelectedOrderCustomer(response.data.selected_tborder.ordering_customer_name)
                setSelectedOrderMember(response.data.selected_tborder.member)
                setSelectedOrderDate(response.data.selected_tborder.order_date)
                setSelectedOrderQty(response.data.order_quantity.order_quantity)
                setSelectedOrderGrandtotal(response.data.selected_tborder.order_grandtotal)
                setSelectedOrderPointCut(response.data.selected_tborder.point_cut)
                setSelectedOrderTotalPayment(response.data.selected_tborder.total_payment)
        })
            .catch(e => alert(e.message))
        setSeeDetail(true);
        
    }

    return (
        <View>
            {
                seeDetail ? 
                <View style={styles.orderDetailBackground}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: resHeight, width: resWidth}} />
                    <ScrollView style={styles.orderDetailBox}>
                        <View style={{marginTop: resWidth * 0.06, marginBottom: resWidth * 0.1}}>
                            <View style={{...styles.itemTitleInfo, alignSelf: 'flex-start'}}>
                                <Text style={{...styles.itemResult, fontSize: resWidth * 0.05}}>Order</Text>
                                <Text style={{...styles.itemResult, fontSize: resWidth * 0.05, color: '#855B54'}}> {selectedNoOrder} </Text>
                                <Text style={{...styles.itemResult, fontSize: resWidth * 0.05}}>Detail</Text>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.itemDetailBox}>
                                <View style={{...styles.historyOrderItem}}>
                                    <Text style={styles.itemInfoNormal}>Order date:</Text>
                                    <Text style={styles.itemResult}>{selectedOrderDate}</Text>
                                </View>
                                <View style={{...styles.historyOrderItem}}>
                                    <Text style={styles.itemInfoNormal}>Customer: </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{...styles.itemResult}}>{selectedOrderCustomer}</Text>
                                        {
                                            selectedOrderMember === 'Yes' 
                                            ? 
                                                <Text style={{...styles.itemResult, color: '#56DF95'}}> (member)</Text>
                                            : 
                                                <Text style={{...styles.itemResultNormal}}> (not member)</Text>
                                        }
                                    </View>
                                </View>
                                
                                <View style={{...styles.historyOrderItem, flexDirection: 'row'}}>
                                    <Text style={styles.itemInfoNormal}>Cashier: </Text>
                                    <Text style={{...styles.itemResult, maxWidth: resWidth * 0.4}}>{selectedOrderCashier}</Text>
                                </View>

                            </View>

                            <Text style={{...styles.itemInfo, marginTop: resWidth * 0.03, marginBottom: 0, marginLeft: resWidth * 0.01}}>Menu Details</Text>

                            {orderDetails.map(item => {
                                return(
                                    <OrderDetailData
                                        key={item.menu_id} 
                                        no_order={item.no_order} 
                                        menu_name={item.menu_name} 
                                        menu_note={item.menu_note}
                                        order_qty={item.order_qty}
                                        order_subtotal={item.order_subtotal}
                                        order_total={item.order_total}
                                        // cashier_on_duty={item.cashier_on_duty}
                                        // ordering_customer_name={item.ordering_customer_name}
                                        // member={item.member}
                                        // order_date={item.order_date}
                                        // order_grandtotal={item.order_grandtotal}
                                        // point_cut={item.point_cut}
                                        // total_payment={item.total_payment}
                                        horizontal={true}
                                        // onPressHistory={() => seeHistoryDetail(item)}
                                    />
                                );
                            })}
                            <View style={styles.paymentDetailBox}>
                                <Text style={styles.itemInfo}>Payment Details</Text>
                                    <View style={{...styles.orderDetailItem, flexDirection: 'row'}}>
                                            <Text style={styles.itemInfoNormal}>
                                                {
                                                    selectedOrderQty > 1 
                                                    ? `Total Price (${selectedOrderQty} items)`
                                                    : `Total Price (${selectedOrderQty} item)`
                                                }
                                            </Text>

                                            <NumberFormat 
                                                    value={selectedOrderGrandtotal}
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
                                {
                                    selectedOrderMember === 'Yes' ?
                                    <View>
                                        
                                        <View style={{...styles.orderDetailItem, flexDirection: 'row'}}>
                                            <Text style={{...styles.itemInfoNormal}}>Point Cut:</Text>
                                            <NumberFormat 
                                            value={selectedOrderPointCut}
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
                                <View style={{...styles.orderDetailItem, flexDirection: 'row', marginBottom: 0}}>
                                    <Text style={styles.itemInfo}>Total Payment</Text>

                                    <NumberFormat 
                                            value={selectedOrderTotalPayment}
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

                            <TouchableOpacity onPress={() => setSeeDetail(null)} style={styles.btnCloseDetailBox}>
                                    <Text style={{...styles.txtBtnClose, color: '#fff'}}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                : null
            }
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                            <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.navigate('Dashboard')}>
                                <Image 
                                    source={LeftArrow}
                                    style={styles.arrowLeft}
                                />
                            </TouchableOpacity>
                            <Text style={styles.menuTitle}>Order History</Text>
                    </View>

                    <View style={styles.historyOrderList}>

                        {orders.map(item => {
                            return(
                                <OrderData
                                    key={item.id_order} 
                                    no_order={item.no_order} 
                                    order_date={item.order_date} 
                                    ordering_customer_name={item.ordering_customer_name}
                                    cashier_on_duty={item.cashier_on_duty}
                                    member={item.member}
                                    order_grandtotal={item.order_grandtotal}
                                    point_cut={item.point_cut}
                                    total_payment={item.total_payment}
                                    horizontal={true}
                                    onPressHistory={() => seeHistoryDetail(item)}
                                />
                            );
                        })}
                    </View>
                            <View style={{marginBottom: resWidth * 0.1}}></View>
                </ScrollView>
        </View>
    )
}

export default History

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
    orderDetailBackground: {
        position: 'absolute',
        width: resWidth,
        height: resHeight,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
    },
    orderDetailBox: {
        backgroundColor: '#fff',
        position: 'absolute',
        borderRadius: resWidth * 0.045,
        paddingHorizontal: resWidth * 0.075,
        maxHeight: resHeight * 0.7,
    },
    orderDetailItemBox: {
        // backgroundColor: '#ccc',
        width: resWidth * 0.65,
        marginVertical: resWidth * 0.025,
        marginHorizontal: resWidth * 0.01,
        backgroundColor: '#fff',
        shadowColor: '#858585',
        shadowOffset: {width: 0, height: -(resWidth * 0.9)},
        shadowOpacity: resWidth * 0.09,
        shadowRadius: resWidth * 0.09,
        elevation: resWidth * 0.01,
        borderRadius: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.03,
    },
    orderDetailItem: {
        marginVertical: resWidth * 0.01,
    },
    itemDetailBox: {
        backgroundColor: '#F4F6FA',
        paddingHorizontal: resWidth * 0.06,
        paddingVertical: resWidth * 0.06,
        borderRadius: resWidth * 0.05,
        marginVertical: resWidth * 0.04,
    },
    itemDetailInfo: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: resWidth * 0.65,
        height: resWidth * 0.34,
    },
    menuNameDetailStyle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.037,
        marginBottom: resWidth * 0.015
    },
    menuNoteDetailStyle: {
        fontWeight: 'bold',
        marginBottom: resWidth * 0.015
    },
    menuPriceDetailStyle: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    btnCloseDetailBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: resWidth * 0.01,
        borderColor: '#FC6B68',
        backgroundColor: '#FC6B68',
        // marginHorizontal: resWidth * 0.08,
        paddingVertical: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.25,
        borderRadius: resHeight,
        marginTop: resWidth * 0.05,
    },
    txtBtnClose: {
        fontSize: resWidth * 0.045,
        fontWeight: 'bold',
        color: '#000',
    },
    historyOrderList: {
        marginVertical: resWidth * 0.1,
        marginHorizontal: resWidth * 0.012,
        // backgroundColor: '#ccc',
    },
    historyOrderBox: {
        marginVertical: resWidth * 0.025,
        backgroundColor: '#fff',
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -(resWidth * 0.9)},
        shadowOpacity: resWidth * 0.09,
        shadowRadius: resWidth * 0.09,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.035,
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.055,
    },
    historyOrderItem: {
        marginVertical: resWidth * 0.02,
    },
    itemTitleInfo: {
        flexDirection: 'row', 
        // backgroundColor: '#ccc',
        alignItems: 'center',
    },
    line: {
        height: resHeight * 0.0008,
        opacity: 0.5,
        backgroundColor: '#969696',
        marginTop: resWidth * 0.03,
        marginBottom: resWidth * 0.005,
    },
    paymentDetailBox: {
        marginHorizontal: resWidth * 0.01,
        marginTop: resWidth * 0.05,
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
})
