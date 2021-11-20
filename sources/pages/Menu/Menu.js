import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, VirtualizedList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import SearchIcon from '../../assets/icons/search.png'
import ClearIcon from '../../assets/icons/cross.png'
import Plus from '../../assets/icons/plus2.png'
import PreviewImage from '../../assets/images/preview2.png'
import EditIcon from '../../assets/icons/edit.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const MenuData = ({menu_name, menu_category, menu_price, onClickUpdate, onSelect}) => {
    return (
            <View style={styles.menuBox}>
                <Image 
                    source={PreviewImage}
                    style={styles.menuPicture}
                />
                <View style={styles.menuInfo}>
                    <Text style={styles.menuName}>{menu_name}</Text>
                    {/* <Text>{menu_category}</Text> */}
                    <Text style={styles.menuPrice}>Rp{menu_price}</Text>
                </View>
                <TouchableOpacity style={styles.menuEditBtn} onPress={onClickUpdate}>
                    <Image 
                        source={EditIcon}
                        style={styles.menuEditIcon}
                    />
                </TouchableOpacity>
            </View>

    )
}

const Menu = ({navigation}) => {
  
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState({});
    // const [refreshPage, setRefreshPage] = useState("");

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const handleGoTo = (page) => {
        navigation.navigate(page)
    };

    useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
            .then(response => {
                console.log('ResponseAddListener: ', response)
                setMenus(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
        // getData();
        
    // return () => {
    //     refreshing;
    // };
    }, []);

    const selectMenu = (item) => {
        console.log("Selected menu: ", item);
        // setSelectedMenu(item);
        // setName(item.name);
        // setEmail(item.email);
        // setBidang(item.bidang);
        // setTombol("Update");
    }

    const editMenu = (item) => {
        // axios.get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu`)
        // .then(item => {
        //         console.log('Selected Menu: ', item);
        //     // console.log("Selected menu: ", item);
        //     // AsyncStorage.setItem('menu_id',item.menu_id)
        //     // navigation.navigate('EditMenu');
        // })
        console.log('Selected Menu: ', item);
        AsyncStorage.setItem('menu_id',item.menu_id);
        AsyncStorage.setItem('menu_name',item.menu_name);
        AsyncStorage.setItem('menu_category',item.menu_category);
        AsyncStorage.setItem('menu_price',item.menu_price);
        navigation.navigate('EditMenu');
        
}


    // const getData = () => {

    //     axios.get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
    //     .then(res => {
    //         console.log("Res getData: ", res);
    //         setMenus(res.data.data.result)
    //     })
    // }

    return (
        <View>
            <ScrollView style={styles.container} 
                // contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View>

                </View>
                <Searchbar
                    placeholder="What are you looking for?"
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

            <View style={styles.menuList}>    

                {menus.map(item => {

                    return(

                        <MenuData
                            key={item.menu_id} 
                            menu_name={item.menu_name} 
                            menu_category={item.menu_category} 
                            menu_price={item.menu_price}
                            horizontal={true}
                            onClickUpdate={() => editMenu(item)}
                            // onSelect={() => selectMenu(item)}
                        />


                    );
                })}

            </View>
            <View style={{marginBottom: resWidth * 0.3}}></View>

            </ScrollView>
            <TouchableOpacity onPress={() => handleGoTo('AddMenu')}>
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

export default Menu

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
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
    },
    searchBar: {
        backgroundColor: '#F6F8FB',
        padding: resWidth * 0.02,
        elevation: 0,
        borderRadius:resWidth * 0.03,
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
    menuList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // backgroundColor: '#eee',
        marginVertical: resWidth * 0.1,
    },
    menuBox: {
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
    menuPicture: {
        borderRadius: resWidth * 0.04,
        height: resWidth * 0.3,
        width: resWidth * 0.38,
        marginBottom: resWidth * 0.04,
    },
    menuInfo: {
        textAlign: 'left',
        marginLeft: resWidth * 0.04,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.044,
        marginBottom: resWidth * 0.01,
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
    }
})
