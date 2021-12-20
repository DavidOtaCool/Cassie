import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
import Bin from '../../assets/icons/bin3.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const EditCategory = ({navigation}) => {
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [dataCategory, setDataCategory] = useState({
        category_id: 0,
        category_name: '',
      });

    useEffect(() => {
        navigation.addListener('focus', async() => {
        const getEditCategoryData = async () =>{

            const getCategoryId = await AsyncStorage.getItem('edit_category_id');
            const getCategoryName = await AsyncStorage.getItem('edit_category_name');
            setCategoryId(getCategoryId);
            setCategoryName(getCategoryName);
        }
        getEditCategoryData();
    })
    }, []);

    const onInputChange = (value, input) => {
        setDataCategory({
          ...dataCategory,
          [input]: value,
        });
      };

    const deleteCategory = (item) => {
        console.log(item);
        axios
        .get(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=deleteCategory&category_id=${categoryId}`)
        .then(res => {
            // console.log('res delete: ', res);
            navigation.navigate('Category');
        })
    }

    
    const update = () => {{

        const editedCategoryData = `category_name=${dataCategory.category_name}`;

            axios.post(`http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=editCategory&category_id=${categoryId}`, editedCategoryData)
            .then(res => {
                // console.log('Res Edit Category: ', res);
                navigation.navigate('Category');
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
                    <Text style={styles.menuTitle}>Edit Category</Text>

                </View>


            <View style={styles.forms}>
                <Text style={styles.formName}>Category Name</Text>
                <TextInput 
                    placeholder="What name will you go for the category?" 
                    placeholderTextColor="#B1B1B1"
                    style={styles.customTextInput}
                    defaultValue={categoryName}
                    onChangeText={value => onInputChange(value, 'category_name')} 
                />
            </View>

            <TouchableOpacity 
                style={styles.btnDeleteCategory}
                onPress={() => {
                    Alert.alert(
                        'Warning',
                        `Are you sure want to delete ${categoryName}?`,
                        [
                            {
                                text: 'No', 
                                // onPress: () => console.log('Chose No')
                            }, 
                            {
                                text: 'Yes', 
                                // onPress: () => console.log('Chose Yes')
                                onPress: () => deleteCategory()
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
                <Text style={styles.txtUpdateMenu}>Update Category</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default EditCategory

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
    btnDeleteCategory: {
        alignSelf: 'flex-end',
        marginTop: resWidth * 0.05,
    },
    
})
