import React, { useState } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import logoCassie from '../../assets/icons/cashie_light.png'
import axios from 'axios'

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
            navigation.navigate('Dashboard');
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
                style={styles.customTextInput}
                onChangeText={email => onInputChange(email, 'email')}
            />
            <TextInput 
                placeholder="Password" 
                style={styles.customTextInput2} 
                onChangeText={password => onInputChange(password, 'password')}
            />

            {/* <TouchableOpacity style={styles.btnLogin} onPress={() => handleGoTo('Dashboard')}> */}
            <TouchableOpacity style={styles.btnLogin} onPress={() => loginSystem()}>
                <Text style={styles.txtLogin}>Log in</Text>
            </TouchableOpacity>


        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        padding: 50,
        alignItems: 'center',
        // flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    textWelcome: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 42,
    },
    textDesc: {
        fontSize: 18,
        marginTop: 20,
    },
    btnLogin: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: 30,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: -4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    txtLogin: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },
    
    customTextInput: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: 10,
        marginBottom: 15,
        padding: 20,
        marginTop: 34,
    },

    customTextInput2: {
        alignSelf: 'stretch',
        backgroundColor: '#F4F6FA',
        borderRadius: 10,
        marginBottom: 15,
        padding: 20,
    },
})
