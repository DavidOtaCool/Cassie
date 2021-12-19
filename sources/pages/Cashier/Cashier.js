import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

import { Searchbar } from 'react-native-paper';
import LeftArrow from '../../assets/icons/left.png'
import Plus from '../../assets/icons/plus2.png'
import SearchIcon from '../../assets/icons/search.png'
import PreviewCashier from '../../assets/images/user.png'
import ClearIcon from '../../assets/icons/cross.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const OwnerData = ({owner_id, owner_name, owner_email, owner_picture, owner_status, onClickEdit, onSelect, onUpload, onClickPicture, logged_in_cashier, logged_in_cashier_status}) => {
    return (
        <TouchableOpacity style={styles.cashierBox} 
            onPress={
                logged_in_cashier_status === 'Owner' ?
                    () => onClickEdit()
                : null
            }
        >
            <View style={styles.cashierPictureBox}>
                    <Image 
                        source={
                            owner_picture != null ? 
                                {
                                    uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${owner_picture}`
                                } : {
                                    uri: `https://robohash.org/${owner_email}`
                            }
                        }
                        style={styles.cashierPicture}
                    />
            </View>
            <View style={styles.cashierInfo}>
                {
                    owner_id === logged_in_cashier ?
                        <Text style={styles.cashierName}>{owner_name} (You)</Text>
                    :
                        <Text style={styles.cashierName}>{owner_name}</Text>
                }
                <Text style={styles.cashierEmail}>{owner_email}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ManagerData = ({manager_id, manager_name, manager_email, manager_picture, manager_status, onClickEdit, logged_in_cashier, logged_in_cashier_status}) => {
    return (
        <TouchableOpacity style={styles.cashierBox} 
            onPress={
                logged_in_cashier_status === 'Owner' ?
                    () => onClickEdit()
                : null
            }
        >
            <View style={styles.cashierPictureBox}>
                    <Image 
                        source={
                            manager_picture != null ? 
                                {
                                    uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${manager_picture}`
                                } : {
                                    uri: `https://robohash.org/${manager_email}`
                            }
                        }
                        style={styles.cashierPicture}
                    />
            </View>
            <View style={styles.cashierInfo}>
                {
                    manager_id === logged_in_cashier ?
                        <Text style={styles.cashierName}>{manager_name} (You)</Text>
                    :
                        <Text style={styles.cashierName}>{manager_name}</Text>
                }
                <Text style={styles.cashierEmail}>{manager_email}</Text>
            </View>
        </TouchableOpacity>
    )
}

const EmployeeData = ({employee_id, employee_name, employee_email, employee_picture, employee_status, onClickEdit, logged_in_cashier, logged_in_cashier_status}) => {
    return (
        <TouchableOpacity style={styles.cashierBox}
            onPress={
                logged_in_cashier_status === 'Owner' ?
                    () => onClickEdit()
                : null
            }
        >
            <View style={styles.cashierPictureBox}>
                    <Image 
                        source={
                            employee_picture != null ? 
                                {
                                    uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${employee_picture}`
                                } : {
                                    uri: `https://robohash.org/${employee_email}`
                            }
                        }
                        style={styles.cashierPicture}
                    />
            </View>
            <View style={styles.cashierInfo}>
                {
                    employee_id === logged_in_cashier ?
                        <Text style={styles.cashierName}>{employee_name} (You)</Text>
                    :
                        <Text style={styles.cashierName}>{employee_name}</Text>
                }
                <Text style={styles.cashierEmail}>{employee_email}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Cashier = ({navigation}) => {
    const [loginCashierId, setLoginCashierId] = useState('');
    const [loginCashierStatus, setLoginCashierStatus] = useState('');

    const [manager, setManager] = useState([]);
    const [owner, setOwner] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const handleGoTo = (page) => {
        navigation.navigate(page)
    };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            const getCashierData = async () => {
                const gettingLoginCashierId = await AsyncStorage.getItem('login_cashier_id');
                axios
                    .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showLoginCashier&cashier_id=${gettingLoginCashierId}`)
                    .then(response => {
                        // console.log('Response Logged In Cashier: ', response)
                        setLoginCashierId(response.data.logged_in_cashier.cashier_id);
                        setLoginCashierStatus(response.data.logged_in_cashier.cashier_status);
                })
                    .catch(e => alert(e.message))
            }
            getCashierData();
    })
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCashier&cashier_status=Owner')
            .then(responseOwner => {
                // console.log('Response Show Owner: ', responseOwner)
                setOwner(responseOwner.data.data.result)
        })
            await axios
                    .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCashier&cashier_status=Manager')
                .then(responseManager => {
                    // console.log('Response Show Manager: ', responseManager)
                    setManager(responseManager.data.data.result)
            })

            await axios
                    .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCashier&cashier_status=Employee')
                .then(responseEmployee => {
                    // console.log('Response Show Employee: ', responseEmployee)
                    setEmployee(responseEmployee.data.data.result)
            })

            .catch(e => alert(e.message))
        })
        
    }, []);


    
    const editCashier = (item) => {

        // console.log('Selected Cashier: ', item);
        AsyncStorage.setItem('cashier_id',item.cashier_id);
        AsyncStorage.setItem('cashier_name',item.cashier_name);
        AsyncStorage.setItem('cashier_email',item.cashier_email);
        AsyncStorage.setItem('cashier_status',item.cashier_status);
        navigation.navigate('EditCashier');
        
        }

    return (
        <View>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.navigate('DashboardfromLogin')}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Cashier</Text>
                    {/* <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => navigation.navigate('SignUpPage')}>
                        <View style={styles.addButton}>
                            <Image 
                                source={Plus}
                                resizeMode="contain"
                                style={{
                                    width: resWidth * 0.04,
                                    height: resWidth * 0.04,
                                    tintColor: '#fff',
                                }}
                            />
                        </View>
                    </TouchableOpacity> */}

                </View>
                <Searchbar
                    placeholder="Who are you looking for?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon={SearchIcon}
                    iconColor={'#9DA7B2'}
                    clearIcon={ClearIcon}
                    style={styles.searchBar}
                    placeholderTextColor={'#96A0AB'}
                    inputStyle={{
                        fontSize: resWidth * 0.04, 
                        left: -(resWidth * 0.01),
                        color: '#96A0AB',
                    }}
                />

            <View style={styles.cashierList}> 
                    
                <Text style={styles.txtCashierListCategory}>Owner</Text>

                {owner.map(item => {

                    return(

                        <OwnerData
                            key={item.cashier_id} 
                            owner_id={item.cashier_id} 
                            owner_name={item.cashier_name} 
                            owner_email={item.cashier_email} 
                            owner_status={item.cashier_status} 
                            owner_picture={item.cashier_picture} 
                            logged_in_cashier={loginCashierId}
                            logged_in_cashier_status={loginCashierStatus}
                            horizontal={true}
                            onClickEdit={() => editCashier(item)}
                            // onClickUpdate={() => editMenu(item)}
                            // // onSelect={() => selectMenu(item)}
                            // onUpload={() => uploadMenuPic(item)}
                            // onClickPicture={() => clickPicture(item)}
                        />
                    );
                })}
            </View>

            <View style={styles.cashierList}> 
                <Text style={styles.txtCashierListCategory}>Manager</Text>
                {manager.map(item => {
                    return(
                        <ManagerData
                            key={item.cashier_id} 
                            manager_id={item.cashier_id} 
                            manager_name={item.cashier_name} 
                            manager_email={item.cashier_email} 
                            manager_status={item.cashier_status} 
                            manager_picture={item.cashier_picture} 
                            logged_in_cashier={loginCashierId}
                            logged_in_cashier_status={loginCashierStatus}
                            horizontal={true}
                            onClickEdit={() => editCashier(item)}
                        />
                    );
                })}
            </View>

            <View style={styles.cashierList}> 
                <Text style={styles.txtCashierListCategory}>Employee</Text>
                {employee.map(item => {
                    return(
                        <EmployeeData
                            key={item.cashier_id} 
                            employee_id={item.cashier_id} 
                            employee_name={item.cashier_name} 
                            employee_email={item.cashier_email} 
                            employee_status={item.cashier_status} 
                            employee_picture={item.cashier_picture} 
                            logged_in_cashier={loginCashierId}
                            logged_in_cashier_status={loginCashierStatus}
                            horizontal={true}
                            onClickEdit={() => editCashier(item)}
                        />
                    );
                })}
            </View>
                <View style={{marginBottom: resWidth * 0.2}}></View>
        </ScrollView>
        
        </View>
    )
}

export default Cashier

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: resHeight,
        paddingTop: resWidth * 0.1,
        paddingHorizontal: resWidth * 0.1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: resWidth * 0.06,
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
    addButton: {
        backgroundColor: '#FC6B68',
        right: 0,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: resWidth * 0.075,
        height: resWidth * 0.075,
        borderRadius: (resWidth * 0.15)/2,
    },
    searchBar: {
        backgroundColor: '#F6F8FB',
        padding: resWidth * 0.02,
        elevation: 0,
        borderRadius:resWidth * 0.03,
        marginBottom: resWidth * 0.05,
    },
    cashierList: {
        // backgroundColor: '#eee',
        marginVertical: resWidth * 0.04,
    },
    txtCashierListCategory: {
        fontWeight: 'bold',
        fontSize: resWidth * 0.04,
        color: '#9999AB',
        marginLeft: resWidth * 0.04,
        marginBottom: resWidth * 0.03,
    },
    cashierBox: {
        backgroundColor: '#fff',
        paddingVertical: resWidth * 0.07,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.1), height: resWidth * 1},
        shadowOpacity: resWidth * 0.01,
        shadowRadius: resWidth * 0.9,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.04,
        marginBottom: resWidth * 0.05,
        marginHorizontal: resWidth * 0.005,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cashierPictureBox: {
        marginLeft: resWidth * 0.05,
    },
    cashierPicture: {
        borderRadius: resHeight,
        height: resWidth * 0.15,
        width: resWidth * 0.15,
        // backgroundColor: '#CECDF3',
        backgroundColor: '#FFE9C0',
        // borderColor: '#855B54',
        // borderColor: '#CECDF3',
        borderWidth: resWidth * 0.008,
    },
    cashierInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.04,
    },
    cashierName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.035,
        marginBottom: resWidth * 0.01,
    },
    cashierEmail: {
        fontSize: resWidth * 0.035,
        marginBottom: resWidth * 0.01,
        color: '#c4c6cf',
        // color: '#dbdce2',
        fontWeight: 'bold',
    }
})
