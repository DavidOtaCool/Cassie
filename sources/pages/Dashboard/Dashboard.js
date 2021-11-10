import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import profile1 from '../../assets/images/profile1.jpg'
import NotifIcon from '../../assets/icons/bell.png'
import Order from '../../assets/icons/order.png'
import Inventory from '../../assets/icons/inventory.png'
import Customer from '../../assets/icons/customer.png'
import Report from '../../assets/icons/report.png'
import AddStock from '../../assets/icons/addStock.png'
import AddProduct from '../../assets/icons/addProduct.png'
import RightArrow from '../../assets/icons/right-arrow.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperBackground}>
                <View style={styles.upperItem}>
                    <Image source={profile1} style={styles.profilePicture} />
                    <Text style={styles.userName}>Hi, Lucas</Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>
                </View>
            </View>

            <View style={styles.shortcutBox}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>500</Text>
                        <Text style={styles.shortcutDesc}>Total Order</Text>
                    </View>
                    <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>Rp300.000</Text>
                        <Text style={styles.shortcutDesc}>Today's Income</Text>
                    </View>
                </View>
                        <View style={styles.line}></View>
                <View style={{flexDirection: 'row'}}>
                <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>12</Text>
                        <Text style={styles.shortcutDesc}>Today's Order</Text>
                    </View>
                    <View style={styles.shortcutItem}>
                        <Text style={styles.shortcutInfo}>3</Text>
                        <Text style={styles.shortcutDesc}>Cancelled Order</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menus}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                    <View style={styles.boxMenu}>
                        <Image source={Order} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Order</Text>
                    </View>
                    <View style={styles.boxMenu}>
                        <Image source={Inventory} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Inventory</Text>
                    </View>
                    <View style={styles.boxMenu}>
                        <Image source={Customer} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Customer</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <View style={styles.boxMenu}>
                        <Image source={Report} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Report</Text>
                    </View>
                    <View style={styles.boxMenu}>
                        <Image source={AddStock} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Add Stock</Text>
                    </View>
                    <View style={styles.boxMenu}>
                        <Image source={AddProduct} style={styles.menuIcon} />
                        <Text style={styles.menuName}>Add Product</Text>
                    </View>
                </View>
            </View>


            <View style={styles.waitingOrderElement}>
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
            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    upperBackground: {
        backgroundColor: '#FFE9C0',
        flex: 0.2,
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 70,
        paddingVertical: 70,
        paddingHorizontal: 45,
    },
    upperItem: {
        flexDirection: 'row',
        alignItems: 'center',
        top: -30,
    },
    profilePicture: {
        borderRadius: 100,
        borderColor: '#855B54',
        borderWidth: 3,
        width: 40,
        height: 40,
    },
    userName: {
        fontSize: 16,
        marginLeft: 14,
        color: '#000',
    },
    notification: {
        width: 25,
        height: 25,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: 100,
        width: 10,
        height: 10,
        right: 0,
        position: 'absolute',
    },
    shortcutBox: {
        backgroundColor: '#fff',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: -4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        marginHorizontal: 45,
        top: 100,
        position: 'absolute',
        left: 0,
        right: 0,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    shortcutItem: {
        flex: 0.5,
        // backgroundColor: '#ccc',
        marginHorizontal: 5,
        marginVertical: 10,
    },
    
    shortcutInfo: {
        fontSize: 19,
        color: '#855B54',
        textAlign: 'center',
    },
    shortcutDesc: {
        fontSize: 14,
        color: '#AFAFAF',
        textAlign: 'center',
        marginVertical: 5,
    },
    line: {
        height: 0.5,
        backgroundColor: '#707070',
        marginHorizontal: 7,
        //marginVertical: 20,
    },
    menus: {
        // backgroundColor: '#ccc',
        top: 105,
        paddingHorizontal: 45,
    },
    boxMenu: {
        backgroundColor: '#fff',
        width: 91,
        height: 105,
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 7,
        borderRadius: 20,
        flex: 0.29,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        width: 45,
        height: 45,
        marginBottom: 10,
    },
    menuName: {
        color: '#000',
        fontSize: 13,
    },
    
    waitingOrderElement:{
        // backgroundColor: '#ccc',
        top: 130,
        paddingHorizontal: 45,
    },
    waitingOrderText: {
        fontSize: 20,
        color: '#000',
        marginBottom: 15
    },
    waitingOrderBox: {
        backgroundColor: '#fff',
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 7,
        borderRadius: 10,
        padding: 10
    },
    waitingOrderList: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    waitingOrderNum: {
        backgroundColor: '#FC6B68',
        borderRadius: 100,
        color: '#fff',
        padding: 3,
        paddingHorizontal: 8,
        fontWeight: 'bold',
    },
    waitingOrderMenuName: {
        color: '#000',
        paddingLeft: 10,
    },
    waitingOrderRemainingTime: {
        color: '#FF0000',
        paddingLeft: 10,
        marginRight: 10,
    },
    rightArrow: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    line2: {
        height: 0.5,
        backgroundColor: '#707070',
        marginHorizontal: 3,
        marginVertical: 10,
    },
    more: {
        fontSize: 16,
        color: '#000'
    }
})
