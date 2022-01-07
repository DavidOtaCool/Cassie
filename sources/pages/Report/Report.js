import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker';
import LeftArrow from '../../assets/icons/left.png'
import NumberFormat from 'react-number-format';

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const ReportCashierData = ({report_cashier_name, report_income_per_cashier}) => {
    return(
        <View style={styles.itemList}>
            <Text style={{...styles.itemInfoNormal, flex: 0.5}}>{report_cashier_name}</Text>
            
            <View style={{flex: 0.5}}>
                <NumberFormat 
                    value={report_income_per_cashier}
                    displayType={'text'} 
                    thousandSeparator={true} 

                    renderText={
                        formattedValue => 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04, marginLeft: resWidth * 0.1}}>Rp</Text>
                                <Text style={styles.itemResultNormal}>{formattedValue}</Text>
                        </View>
                    } 
                />
            </View>
        </View>
    )
}


const Report = ({navigation}) => {

    const [cashierReports, setCashierReports] = useState([]);
    const [reportIncome, setReportIncome] = useState(0);
    const [reportOrder, setReportOrder] = useState(0);

    const [chooseReports, setChooseReports] = useState('');


    // useEffect(() => {
    //     navigation.addListener('focus', async() => {
    //         await axios
    //             .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showReportDay')
    //         .then(response => {
    //             console.log('Response Show History Day: ', response)
    //             setCashierReports(response.data.today_cashier_report)
    //             setReportIncome(response.data.today_income.today_income)
    //             setReportOrder(response.data.today_order)
    //     })
    //         .catch(e => alert(e.message))
    //     })
        
    // }, []);

            const dayReport = () => {
                axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showReportDay')
                    .then(response => {
                        // console.log('Response Show History Day: ', response)
                        setCashierReports(response.data.today_cashier_report)
                        setReportIncome(response.data.today_income.today_income)
                        setReportOrder(response.data.today_order)
                })
                    .catch(e => alert(e.message))
            }
            const monthReport = () => {
                axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showReportMonth')
                    .then(response => {
                        // console.log('Response Show History Month: ', response)
                        setCashierReports(response.data.month_cashier_report)
                        setReportIncome(response.data.month_income.month_income)
                        setReportOrder(response.data.month_order)
                })
                    .catch(e => alert(e.message))
            }
            if(chooseReports === 'Daily'){
                dayReport();
            }else if(chooseReports === 'Monthly'){
                monthReport();
            }else{
                dayReport();
            }

    

    // const dayReport = () => {{
    //     axios
    //     .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showReportDay')
    //         .then(response => {
    //             console.log('Response Show History Day: ', response)
    //             setCashierReports(response.data.today_cashier_report)
    //             setReportIncome(response.data.today_income.today_income)
    //             setReportOrder(response.data.today_order)
    //     })
    //         .catch(e => alert(e.message))
    // }}

    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.navigate('DashboardfromLogin')}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Report</Text>
            </View>

            <View style={styles.customPicker}>
                    <Picker
                        selectedValue={chooseReports}
                        onValueChange={(itemValue, itemIndex) => setChooseReports(itemValue)}
                    >
                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Monthly" value="Monthly" />
                        {/* <Picker.Item label="Yearly" value="Yearly" /> */}
                    </Picker>
                </View>
        {

            cashierReports != null ?
                <View style={styles.reportBox}>

                    <View style={styles.itemList}>
                        <View style={{flex: 0.5}}>
                            <Text style={{...styles.itemInfo}}>Cashier Name</Text>
                        </View>
                        <View style={{flex: 0.5}}>
                            <Text style={{...styles.itemInfo, marginLeft: resWidth * 0.1}}>Income</Text>
                        </View>
                    </View>

                            <View style={styles.cashierList}>  
            
                                {cashierReports.map(item => {
                                    return(
                                            <ReportCashierData
                                                key={item.report_cashier_id} 
                                                report_cashier_name={item.report_cashier_name} 
                                                report_income_per_cashier={item.report_income_per_cashier} 
                                                horizontal={true}
                                            />
                                        );

                                    })}

                            </View>
                                

                    <View style={styles.itemList}>
                        <View style={{flex: 0.5}}>
                            <Text style={{...styles.itemInfo}}>Total Income</Text>
                        </View>
                        <View style={{flex: 0.5}}>
                            <NumberFormat 
                                value={reportIncome}
                                displayType={'text'} 
                                thousandSeparator={true} 

                                renderText={
                                    formattedValue => 
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{...styles.menuPrice, ...styles.currency, fontSize: resWidth * 0.04, marginLeft: resWidth * 0.1}}>Rp</Text>
                                            <Text style={styles.itemResult}>{formattedValue}</Text>
                                    </View>
                                } 
                            />
                        </View>
                    </View>

                    <View style={styles.itemList}>
                        <View style={{flex: 0.5}}>
                            <Text style={{...styles.itemInfo}}>Order Total</Text>
                        </View>
                        <View style={{flex: 0.5}}>
                            <NumberFormat 
                                value={reportOrder}
                                displayType={'text'} 
                                thousandSeparator={true} 

                                renderText={
                                    formattedValue => 
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{...styles.itemResult, marginLeft: resWidth * 0.1}}>
                                                {
                                                    reportOrder > 1 
                                                    ? `${formattedValue} orders`
                                                    : `${formattedValue} order`
                                                }
                                            </Text>
                                    </View>
                                } 
                            />
                        </View>
                    </View>
                </View>
            :
                <View style={{marginVertical: resWidth * 0.05}}>
                    <Text>There is no transaction</Text>
                </View>
        }
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: resHeight,
        paddingVertical: resWidth * 0.1,
        paddingHorizontal: resWidth * 0.1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: resWidth * 0.1,
        marginTop: resWidth * 0.01,
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
    customPicker: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.018,
        marginBottom: resWidth * 0.05
    },
    reportBox: {
        backgroundColor: '#F4F6FA',
        paddingHorizontal: resWidth * 0.05,
        paddingVertical: resWidth * 0.08,
        borderRadius: resWidth * 0.05,
    },
    cashierList: {
        marginVertical: resWidth * 0.05,
    },
    itemList: {
        flexDirection: 'row',
        // backgroundColor: '#ccc',
        marginVertical: resWidth * 0.01
    },
    itemInfo: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
    },
    itemResult: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
    },
    itemInfoNormal: {
        color: '#000',
        fontSize: resWidth * 0.04,
    },
    itemResultNormal: {
        color: '#000',
        fontSize: resWidth * 0.04,
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
