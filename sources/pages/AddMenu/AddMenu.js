import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

// const CategoryData = ({category_name}) => {
//     return (
//         <Picker.Item label={category_name} value={category_name} />
//         // <Text>{category_name}</Text>
//     )
// }

const AddMenu = ({navigation}) => {
    // const [menuName, setMenuName] = useState("");
    // const [menuCategory, setMenuCategory] = useState("");
    // const [menuPrice, setMenuPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [refreshPage, setRefreshPage] = useState("");
    const [menuCategoryId, setMenuCategoryId] = useState("");
    const [btnAdd, setBtnAdd] = useState("Add Menu");
    const [dataMenu, setDataMenu] = useState({
        menu_name: '',
        menu_category: '',
        menu_price: '',
      });

      useEffect(() => {
        navigation.addListener('focus', async() => {
            await axios
                .get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCategory')
            .then(response => {
                // console.log('Response Show Categories: ', response)
                setCategories(response.data.data.result)
        })
            .catch(e => alert(e.message))
        })
        
    }, []);

    useEffect(() => {
        // navigation.addListener('focus', async() => {
        //     await axios.get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
        //     .then(response => {
        //         console.log('Response')
        //     })
        // })
        getData();
    }, []);
    const onInputChange = (value, input) => {
        setDataMenu({
          ...dataMenu,
          [input]: value,
        });
      };

    
    const submit = () => {{

        // function refreshing(){
        //     window.location.reload(false);
        // }
        // const datanya = {
        //     name,
        //     email,
        //     bidang,
        // }
        const menuData = `menu_name=${dataMenu.menu_name}&menu_category_id=${menuCategoryId}&menu_price=${dataMenu.menu_price}`;

            axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=addMenu', menuData)
            .then(res => {
                // console.log('respon: ', res);
                // window.location.reload(false);
                // getData();
                // setRefreshPage("refresh");
                // setMenuName("");
                // setMenuCategory("");
                // setMenuPrice("");
                navigation.navigate('Menu');
                // navigation.goBack();
        });

    }}

    
    const getData = () => {
        axios.get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showMenu')
        .then(res => {
            // console.log("Res getData: ", res);
            setDataMenu(res.data.data.result);

        })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.navigate('Menu')}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Add Menu</Text>
                    {/* <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View> */}

                </View>


            <TextInput 
                placeholder="What name will you go for the menu?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_name')} 
            />

            {/* <TextInput 
                placeholder="What category is this menu in?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_category')}
            />  */}

            <View style={styles.customPicker}>
                    <Picker
                        // prompt={`Change ${cashierFirstName}'s status`}
                        selectedValue={menuCategoryId}
                        // onValueChange={value => onInputChange(value, 'cashier_status')}
                        onValueChange={(itemValue, itemIndex) => setMenuCategoryId(itemValue)}
                    >
                        <Picker.Item label={"What category is this menu in?"} enabled={false} />
                        {categories.map(item => {
                            return(
                                <Picker.Item
                                    key={item.category_id} 
                                    label={item.category_name} 
                                    value={item.category_id} 
                                    horizontal={true}
                                />
                            );
                        })}
                        {/* <Picker.Item label="Owner" value="Owner" />
                        <Picker.Item label="Manager" value="Manager" />
                        <Picker.Item label="Employee" value="Employee" /> */}
                    </Picker>
            </View>

            <TextInput 
                placeholder="How much price will you give for the menu?" 
                placeholderTextColor="#B1B1B1"
                keyboardType="number-pad"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'menu_price')} 
            />

            <TouchableOpacity style={styles.btnAddMenu} onPress={() => submit()}>
                <Text style={styles.txtAddMenu}>Add Menu</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default AddMenu

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
        marginTop: resHeight * 0.03,
    },
    customPicker: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: resWidth * 0.028,
        padding: resWidth * 0.018,
        marginTop: resHeight * 0.03,
    },
    notifStatus: {
        backgroundColor: '#FC6B68',
        borderRadius: resHeight,
        width: resWidth * 0.026,
        height: resWidth * 0.026,
        right: 0,
        position: 'absolute',
    },
    btnAddMenu: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: resHeight * 0.026,
        padding: resWidth * 0.05,
        borderRadius: resWidth * 0.028,
        shadowColor: '#969696',
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        shadowOpacity: resWidth * 0.03,
        shadowRadius: resWidth * 0.05,
        elevation: resWidth * 0.02,
    },
    txtAddMenu: {
        color: '#fff',
        textAlign: 'center',
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
})
