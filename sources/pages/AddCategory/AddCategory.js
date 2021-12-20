import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import LeftArrow from '../../assets/icons/left.png'
import NotifIcon from '../../assets/icons/bell.png'
var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const AddCategory = ({navigation}) => {
    const [dataCategory, setDataCategory] = useState({
        category_name: '',
      });

    useEffect(() => {
        getData();
    }, []);
    const onInputChange = (value, input) => {
        setDataCategory({
          ...dataCategory,
          [input]: value,
        });
      };

    
    const submit = () => {{

        const categoryData = `category_name=${dataCategory.category_name}`;

            axios.post('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=addCategory', categoryData)
            .then(res => {
                // console.log('respon: ', res);
                navigation.navigate('Category');
        });

    }}

    
    const getData = () => {
        axios.get('http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=showCategory')
        .then(res => {
            // console.log("Res getData: ", res);
            setDataCategory(res.data.data.result);

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
                    <Text style={styles.menuTitle}>Add Category</Text>

                </View>


            <TextInput 
                placeholder="What name will you go for the category?" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={value => onInputChange(value, 'category_name')} 
            />

            <TouchableOpacity style={styles.btnAddMenu} onPress={() => submit()}>
                <Text style={styles.txtAddMenu}>Add Category</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

export default AddCategory

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
        // marginBottom: resWidth * 0.06,
        marginBottom: resWidth * 0.02,
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
