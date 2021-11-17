import React, { useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import logoCassie from '../../assets/icons/cashie_light.png'
import axios from 'axios'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const LoginPage = ({navigation}) => {
    const handleGoTo = (page) => {
        navigation.navigate(page)
    };
    const [cashierLogin, setCashierLogin] = useState({
        email: '',
        password: '',
      });


    const loginSystem = () => {
      const data = `cashier_email=${cashierLogin.email}&cashier_password=${cashierLogin.password}`;

      axios.post(
          `http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php?operation=loginCashier`,
          data,
        )
        .then(res => {
            console.log('respon: ', res);

          if (res.data.status == 'correct') {
            navigation.navigate('DashboardfromLogin');
            // alert('benar')
          } else {
            alert('Sorry, your email/password is wrong :(')
            // navigation.navigate('Welcome');
          }
        })
        .catch(err => console.log(err));
    }

    const onInputChange = (value, input) => {
        setCashierLogin({
          ...cashierLogin,
          [input]: value,
        });

      };
      console.log(cashierLogin);

    return (
        <View style={styles.container}>
            <Image source={logoCassie} style={styles.logo}/>
            <Text style={styles.textWelcome}>Login to Cassie!</Text>

            <TextInput 
                placeholder="Enter your username/email" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                onChangeText={email => onInputChange(email, 'email')}
            />
            <TextInput 
                placeholder="Password" 
                placeholderTextColor="#B1B1B1"
                secureTextEntry={true}
                style={styles.customTextInput2} 
                onChangeText={password => onInputChange(password, 'password')}
            />

            {/* <TouchableOpacity style={styles.btnLogin} onPress={() => handleGoTo('Dashboard')}> */}
            <TouchableOpacity style={styles.btnLogin} onPress={() => loginSystem()}>
                <Text style={styles.txtLogin}>Log in</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDesc}>Don't have an account?</Text>
                <Text style={styles.textDesc2} onPress={() => handleGoTo('SignUpPage')}> Just sign up here!</Text>
                {/* <Text style={styles.textDesc2} onPress={() => this.props.navigation.navigate('SignUpPage')}> Just sign up here!</Text> */}
            </View>

        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        // padding: 50,
        padding: resWidth * 0.128,
        alignItems: 'center',
        // flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: resHeight,
    },
    logo: {
        // width: 100,
        // height: 100,
        width: resWidth * 0.26,
        height: resWidth * 0.26,
        borderRadius: resHeight,
    },
    textWelcome: {
        // fontSize: 26,
        fontSize: resWidth * 0.066,
        fontWeight: 'bold',
        color: '#000',
        // marginTop: 42,
        marginTop: resHeight * 0.054,
    },
    textDesc: {
        // fontSize: 14,
        fontSize: resWidth * 0.036,
        // marginTop: 20,
        marginTop: resHeight * 0.035,
    },
    textDesc2: {
        // fontSize: 14,
        fontSize: resWidth * 0.036,
        // marginTop: 20,
        marginTop: resHeight * 0.035,
        color: '#00AEE8',
    },
    btnLogin: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        // marginTop: 20,
        marginTop: resHeight * 0.039,
        // padding: 20,
        padding: resWidth * 0.05,
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
        shadowColor: '#969696',
        // shadowOffset: {width: -2, height: -4},
        shadowOffset: {width: -(resWidth * 0.02), height: -(resWidth * 0.2)},
        // shadowOpacity: 0.2,
        shadowOpacity: resWidth * 0.03,
        // shadowRadius: 3,
        shadowRadius: resWidth * 0.05,
        // elevation: 5,
        elevation: resWidth * 0.02,
    },
    txtLogin: {
        color: '#fff',
        textAlign: 'center',
        // fontSize: 20,
        fontSize: resWidth * 0.051,
        fontWeight: '500',
    },
    
    customTextInput: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
        // marginBottom: 15,
        marginBottom: resHeight * 0.02,
        // padding: 20,
        padding: resWidth * 0.05,
        // marginTop: 34,
        marginTop: resHeight * 0.043,
    },

    customTextInput2: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        // borderRadius: 10,
        borderRadius: resWidth * 0.028,
        // marginBottom: 15,
        marginBottom: resHeight * 0.02,
        // padding: 20,
        padding: resWidth * 0.05,
    },
})
