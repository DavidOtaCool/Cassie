import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, ScrollView, RefreshControl } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import Bin from '../../assets/icons/bin3.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const EditCashier = ({navigation}) => {
    const [loginCashierId, setLoginCashierId] = useState('');
    const [cashierId, setCashierId] = useState("");
    const [cashierName, setCashierName] = useState("");
    const cashierFirstName = cashierName.split(' ')[0];
    const [cashierEmail, setCashierEmail] = useState("");
    const [cashierStatus, setCashierStatus] = useState("");
    const [newCashierStatus, setNewCashierStatus] = useState("");
    const [dataCashier, setDataCashier] = useState({
        cashier_id: 0,
        cashier_name: '',
        cashier_email: '',
        cashier_status: '',
      });

    useEffect(() => {
        navigation.addListener('focus', async() => {
        const cashierCheck = async () =>{

            const getCashierId = await AsyncStorage.getItem('cashier_id');
            const getCashierName = await AsyncStorage.getItem('cashier_name');
            const getCashierEmail = await AsyncStorage.getItem('cashier_email');
            const getCashierStatus = await AsyncStorage.getItem('cashier_status');
            setCashierId(getCashierId);
            setCashierName(getCashierName);
            setCashierEmail(getCashierEmail);
            setCashierStatus(getCashierStatus);
        }
        cashierCheck();
    })
    }, []);

    const onInputChange = (value, input) => {
        setDataCashier({
          ...dataCashier,
          [input]: value,
        });
      };

    const deleteCashier = (item) => {
        console.log(item);
        axios
        .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=deleteCashier&cashier_id=${cashierId}`)
        .then(res => {
            console.log('Res Delete Cashier: ', res);
            navigation.navigate('Cashier');
        })
    }

    
    const update = () => {{

        const editedCashierData = `cashier_name=${dataCashier.cashier_name}&cashier_email=${dataCashier.cashier_email}&cashier_status=${cashierStatus}`;

            axios.post(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=updateCashier&cashier_id=${cashierId}`, editedCashierData)
            .then(res => {
                console.log('Res Edit Cashier: ', res);
                navigation.navigate('Cashier');
        });

    }}

    useEffect(() => {
        navigation.addListener('focus', async() => {
            const getCashierData = async () => {
                const gettingLoginCashierId = await AsyncStorage.getItem('login_cashier_id');
                axios
                    .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showLoginCashier&cashier_id=${gettingLoginCashierId}`)
                    .then(response => {
                        // console.log('Response Logged In Cashier: ', response)
                        setLoginCashierId(response.data.logged_in_cashier.cashier_id);
                })
                    .catch(e => alert(e.message))
            }
            getCashierData();
    })
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>
                        {
                            cashierId === loginCashierId 
                            ? `Edit Cashier ${cashierId} (You)`
                            : `Edit Cashier ${cashierId}`
                        }
                    </Text>
                    {/* <Text>{menuName},{menuCategory},{menuPrice}</Text> */}
                    {/* <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View> */}

                </View>


            {/* <View style={styles.forms}>
                <Text style={styles.formName}>Cashier Name</Text>
                <TextInput 
                    placeholder="Please tell us your full name" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    // onFocus={() => dataCashier(editMenu)}
                    defaultValue={cashierName}
                    onChangeText={value => onInputChange(value, 'cashier_name')} 
                />
            </View>

            <View style={styles.forms}>
                <Text style={styles.formName}>Cashier Email</Text>
                <TextInput 
                    placeholder="Email" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    defaultValue={cashierEmail}
                    onChangeText={value => onInputChange(value, 'cashier_email')}
                />
            </View> */}

            <View style={styles.forms}>
                <Text style={styles.formName}>Cashier Name</Text>
                <TextInput 
                    editable={
                        cashierId === loginCashierId ? true 
                        : false
                    }
                    placeholder="Please tell us your full name" 
                    // color='#000'
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    // onFocus={() => dataCashier(editMenu)}
                    defaultValue={cashierName}
                    onChangeText={value => onInputChange(value, 'cashier_name')} 
                />
            </View>

            <View style={styles.forms}>
                <Text style={styles.formName}>Cashier Status</Text>
                <View style={styles.customPicker}>
                    <Picker
                        enabled={
                            cashierId === loginCashierId ? false 
                                : true
                        }
                        prompt={`Change ${cashierFirstName}'s status`}
                        selectedValue={cashierStatus}
                        // onValueChange={value => onInputChange(value, 'cashier_status')}
                        onValueChange={(itemValue, itemIndex) => setCashierStatus(itemValue)}
                    >
                        <Picker.Item label="Owner" value="Owner" />
                        <Picker.Item label="Manager" value="Manager" />
                        <Picker.Item label="Employee" value="Employee" />
                    </Picker>
                </View>
            </View>

            {/* <View style={styles.forms}>
                <Text style={styles.formName}>Cashier Status</Text>
                <TextInput 
                    placeholder="Cashier Status" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    defaultValue={cashierStatus}
                    onChangeText={value => onInputChange(value, 'cashier_status')}
                />
            </View> */}
   
            <TouchableOpacity 
                style={styles.btndeleteCashier}
                onPress={() => {
                    Alert.alert(
                        'Warning',
                        `Are you sure want to delete ${cashierName}?`,
                        [
                            {
                                text: 'No', 
                                // onPress: () => console.log('Chose No')
                            }, 
                            {
                                text: 'Yes', 
                                // onPress: () => console.log('Chose Yes')
                                onPress: () => deleteCashier()
                            }
                        ]
                    )
                }}
            >
                <Image 
                    source={Bin} 
                    style={{width: resWidth * 0.065, height: resWidth * 0.065, tintColor: '#e74c3c'}} 
                />
            </TouchableOpacity>
                     
            <TouchableOpacity style={styles.btnUpdateCashier} onPress={() => update()}>
                <Text style={styles.txtUpdateCashier}>Update Cashier</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default EditCashier

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
    customTextInput: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.05,
    },
    customPicker: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.018,
    },
    forms: {
        marginTop: resHeight * 0.04,
    },
    formName: {
        fontSize: resWidth * 0.035,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: resWidth * 0.025,
        marginLeft: resWidth * 0.01,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
    },
    btnUpdateCashier: {
        // backgroundColor: '#E3BD82',
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: resHeight * 0.03,
        padding: resWidth * 0.05,
        borderRadius: resWidth * 0.028,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        shadowOpacity: resWidth * 0.03,
        shadowRadius: resWidth * 0.05,
        elevation: resWidth * 0.02,
    },
    txtUpdateCashier: {
        color: '#fff',
        textAlign: 'center',
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
    btndeleteCashier: {
        alignSelf: 'flex-end',
        marginTop: resWidth * 0.05,
    },
    
})
