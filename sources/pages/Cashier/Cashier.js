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

const CashierData = ({cashier_name, cashier_email, cashier_picture, cashier_status, onClickEdit, onSelect, onUpload, onClickPicture}) => {

        
    return (
        <TouchableOpacity style={styles.cashierBox} onPress={() => onClickEdit()}>
            <TouchableOpacity onPress={() => alert('Click picture')} style={styles.cashierPictureBox}>
                    <Image 
                        source={
                            cashier_picture != null ? 
                                {
                                    uri: `http://cassie-pos.000webhostapp.com/cassie/upload/cashierPicture/${cashier_picture}`
                                } : {
                                    uri: `https://robohash.org/${cashier_email}`
                            }
                        }
                        style={styles.cashierPicture}
                    />
            </TouchableOpacity>
            <View style={styles.cashierInfo}>
                <Text style={styles.cashierName}>{cashier_name} ({cashier_status})</Text>
                <Text style={styles.cashierEmail}>{cashier_email}</Text>
            </View>
        </TouchableOpacity>

)
}


const Cashier = ({navigation}) => {
    const [cashiers, setCashiers] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const handleGoTo = (page) => {
        navigation.navigate(page)
    };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=normal')
            .then(response => {
                console.log('Response Show Cashier: ', response)
                setCashiers(response.data.data.result)
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
                    <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => navigation.navigate('SignUpPage')}>
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
                    </TouchableOpacity>

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

                {cashiers.map(item => {

                    return(

                        <CashierData
                            key={item.cashier_id} 
                            cashier_name={item.cashier_name} 
                            cashier_email={item.cashier_email} 
                            cashier_status={item.cashier_status} 
                            cashier_picture={item.cashier_picture} 
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
    },
    cashierList: {
        // backgroundColor: '#eee',
        marginVertical: resWidth * 0.1,
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
