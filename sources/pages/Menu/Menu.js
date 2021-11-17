import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, VirtualizedList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import SearchIcon from '../../assets/icons/search.png'
import ClearIcon from '../../assets/icons/cross.png'
import Plus from '../../assets/icons/plus2.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const MenuData = ({menu_name, menu_category, menu_price}) => {
    return (
            <TouchableOpacity style={styles.menuBox}>
                <Text style={styles.menuName}>{menu_name}</Text>
                <Text>{menu_category}</Text>
                <Text style={styles.menuPrice}>{menu_price}</Text>
            </TouchableOpacity>

    )
}

const Menu = ({navigation}) => {
  
    const [menus, setMenus] = useState([]);
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
                        />


                    );
                })}

            </View>
            <View style={{marginBottom: resWidth * 0.1}}></View>

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
        height: resWidth * 0.28,
        // width: 150,
        width: resWidth * 0.38,
        shadowColor: '#969696',
        shadowOffset: {width: 0, height: -(resWidth * 1)},
        shadowOpacity: resWidth * 0.01,
        shadowRadius: resWidth * 0.1,
        elevation: resWidth * 0.012,
        borderRadius: resWidth * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: resWidth * 0.05,
    },
    menuName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: resWidth * 0.045,
    },
    menuPrice: {
        color: '#7E7E7E',
    },
})
