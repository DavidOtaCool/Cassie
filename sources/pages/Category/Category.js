import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

import { Searchbar } from 'react-native-paper';
import LeftArrow from '../../assets/icons/left.png'
import Plus from '../../assets/icons/plus2.png'
import Fork from '../../assets/icons/fork2.png'
import EditIcon from '../../assets/icons/edit.png'
import SearchIcon from '../../assets/icons/search.png'
import PreviewCashier from '../../assets/images/user.png'
import ClearIcon from '../../assets/icons/cross.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const CategoryData = ({category_name, login_cashier_status, onClickEdit}) => {

        
    return (
        <View style={styles.categoryBox}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        source={Fork}
                        style={styles.categoryPicture}
                    /> 
                </View>
                <View style={styles.menuInfo}>
                    <Text style={styles.menuName}>{category_name}</Text>
                </View>
                <TouchableOpacity onPress={onClickEdit}
                    style={
                        login_cashier_status === 'Owner' || login_cashier_status === 'Manager' ?
                        styles.menuEditBtn : {display: 'none'}
                    } 
                >
                    <Image 
                        source={EditIcon}
                        style={styles.menuEditIcon}
                    />
                </TouchableOpacity>
            </View>

    )
}


const Category = ({navigation}) => {
    const [loginCashierStatus, setLoginCashierStatus] = useState('');
    const [categories, setCategories] = useState([]);
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
                        setLoginCashierStatus(response.data.logged_in_cashier.cashier_status);
                })
                    .catch(e => alert(e.message))
            }
            getCashierData();

            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCategory')
            .then(response => {
                // console.log('Response Show Categories: ', response)
                setCategories(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    const editCategory = (item) => {
        // console.log('Selected Category: ', item);
        AsyncStorage.setItem('edit_category_id',item.category_id);
        AsyncStorage.setItem('edit_category_name',item.category_name);
        navigation.navigate('EditCategory');
        
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
                    <Text style={styles.menuTitle}>Category</Text>

                </View>
                
            <View style={styles.categoryList}>    

                {categories.map(item => {

                    return(

                        <CategoryData
                            key={item.category_id} 
                            category_name={item.category_name} 
                            login_cashier_status={loginCashierStatus} 
                            horizontal={true}
                            onClickEdit={() => editCategory(item)}
                        />


                    );
                })}
            </View>
                <View style={{marginBottom: resWidth * 0.3}}></View>
        </ScrollView>

        <TouchableOpacity onPress={() => handleGoTo('AddCategory')}
            style={
                loginCashierStatus === 'Owner' || loginCashierStatus === 'Manager' ?
                null : {display: 'none'}
            }
        >
            <View style={styles.addButton}>
                <Image 
                    source={Plus}
                    resizeMode="contain"
                    style={{
                        width: resWidth * 0.0645,
                        height: resWidth * 0.0645,
                        tintColor: '#fff',
                    }}
                />
            </View>
        </TouchableOpacity>
        
        </View>
    )
}

export default Category

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
        // marginBottom: resWidth * 0.06,
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
    categoryBox: {
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
    menuInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.04,
    },
    categoryPicture: {
        borderRadius: resWidth * 0.04,
        height: resWidth * 0.3,
        width: resWidth * 0.38,
        marginBottom: resWidth * 0.04,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.044,
        marginBottom: resWidth * 0.01,
        maxWidth: resWidth * 0.29,
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
    menuEditIcon: {
        width: resWidth * 0.05,
        height: resWidth * 0.05,
    },
    addButton: {
        backgroundColor: '#FC6B68',
        bottom: resWidth * 0.16,
        right: resWidth * 0.07,
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: resWidth * 0.15,
        height: resWidth * 0.15,
        borderRadius: (resWidth * 0.15)/2,
    },
    searchBar: {
        backgroundColor: '#F6F8FB',
        padding: resWidth * 0.02,
        elevation: 0,
        borderRadius:resWidth * 0.03,
    },
    categoryList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginVertical: resWidth * 0.1,
    },
    customerBox: {
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
    customerPictureBox: {
        marginLeft: resWidth * 0.05,
    },
    customerPicture: {
        borderRadius: resHeight,
        height: resWidth * 0.15,
        width: resWidth * 0.15,
    },
    cashierInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.04,
    },
    customerName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.035,
        marginBottom: resWidth * 0.01,
    },
    customerEmail: {
        fontSize: resWidth * 0.035,
        marginBottom: resWidth * 0.01,
        color: '#c4c6cf',
        // color: '#dbdce2',
        fontWeight: 'bold',
    }
})
