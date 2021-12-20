import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import Bin from '../../assets/icons/bin3.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const EditMenu = ({navigation}) => {
    const [menuId, setMenuId] = useState("");
    const [menuName, setMenuName] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [menuCategoryId, setMenuCategoryId] = useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [dataMenu, setDataMenu] = useState({
        menu_id: 0,
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
        navigation.addListener('focus', async() => {
        const menuCheck = async () =>{

            const getMenuId = await AsyncStorage.getItem('menu_id');
            const getMenuName = await AsyncStorage.getItem('menu_name');
            const getMenuCategory = await AsyncStorage.getItem('menu_category');
            const getMenuPrice = await AsyncStorage.getItem('menu_price');
            setMenuId(getMenuId);
            setMenuName(getMenuName);
            setMenuCategory(getMenuCategory);
            setMenuPrice(getMenuPrice);
        }
        menuCheck();
    })
    }, []);

    const DataMenu = () => {
        setDataMenu({
          ...dataMenu,
          menu_id: get.menu_id,
          menu_name: setMenuName(getMenuName),
          menu_category: get.menu_category,
          menu_price: get.menu_price,
        });
        // console.log('item selected');
      };

    const onInputChange = (value, input) => {
        setDataMenu({
          ...dataMenu,
          [input]: value,
        });
      };

    const deleteMenu = (item) => {
        // console.log(item);
        axios
        .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=deleteMenu&menu_id=${menuId}`)
        .then(res => {
            // console.log('res delete: ', res);
            navigation.navigate('Menu');
        })
    }

    
    const update = () => {{

        const editedMenuData = `menu_name=${dataMenu.menu_name}&menu_category_id=${menuCategory}&menu_price=${dataMenu.menu_price}`;

            axios.post(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=editMenu&menu_id=${menuId}`, editedMenuData)
            .then(res => {
                // console.log('Res Edit: ', res);
                navigation.navigate('Menu');
        });

    }}

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>

                    <TouchableOpacity style={styles.btnArrowLeft} onPress={() => navigation.goBack()}>
                        <Image 
                            source={LeftArrow}
                            style={styles.arrowLeft}
                        />
                    </TouchableOpacity>
                    <Text style={styles.menuTitle}>Edit Menu {menuId}</Text>
                    {/* <Text>{menuName},{menuCategory},{menuPrice}</Text> */}
                    {/* <View style={{position: 'absolute', right: 0}}>
                        <Image source={NotifIcon} style={styles.notification} />
                        <View style={styles.notifStatus} />
                    </View> */}

                </View>


            <View style={styles.forms}>
                <Text style={styles.formName}>Menu Name</Text>
                <TextInput 
                    placeholder="What name will you go for the menu?" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    // onFocus={() => DataMenu(editMenu)}
                    defaultValue={menuName}
                    onChangeText={value => onInputChange(value, 'menu_name')} 
                />
            </View>

            <View style={styles.forms}>
                <Text style={styles.formName}>Menu Category</Text>
                <View style={styles.customPicker}>
                    <Picker
                        prompt={`Change ${menuName}'s category`}
                        selectedValue={menuCategory}
                        // defaultValue={menuCategory}
                        // onValueChange={value => onInputChange(value, 'cashier_status')}
                        onValueChange={(itemValue, itemIndex) => setMenuCategory(itemValue)}
                    >
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
                {/* <TextInput 
                    placeholder="What category is this menu in?" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    defaultValue={menuCategory}
                    onChangeText={value => onInputChange(value, 'menu_category')}
                /> */}
            </View>

            

            <View style={styles.forms}>
                <Text style={styles.formName}>Menu Price</Text>
                <TextInput 
                    placeholder="How much price will you give for the menu?" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    defaultValue={menuPrice}
                    keyboardType="number-pad"
                    onChangeText={value => onInputChange(value, 'menu_price')}
                />
            </View>

   
            <TouchableOpacity 
                style={styles.btnDeleteMenu}
                onPress={() => {
                    Alert.alert(
                        'Warning',
                        `Are you sure want to delete ${menuName}?`,
                        [
                            {
                                text: 'No', 
                                // onPress: () => console.log('Chose No')
                            }, 
                            {
                                text: 'Yes', 
                                // onPress: () => console.log('Chose Yes')
                                onPress: () => deleteMenu()
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
                     
            <TouchableOpacity style={styles.btnUpdateMenu} onPress={() => update()}>
                <Text style={styles.txtUpdateMenu}>Update Menu</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default EditMenu

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
    btnUpdateMenu: {
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
    txtUpdateMenu: {
        color: '#fff',
        textAlign: 'center',
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
    btnDeleteMenu: {
        alignSelf: 'flex-end',
        marginTop: resWidth * 0.05,
    },
    
})
