import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable } from 'react-native'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import logoCassie from '../../assets/icons/cashie_light.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

export class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cashierName:'',
            cashierEmail:'',
            cashierPassword:'',
        };
        this.url = "http://cassie-pos.000webhostapp.com/cassie/php/api_cassie.php";
      }

      addData(){
        if(this.state.cashierName == '' || this.state.cashierEmail == '' || this.state.cashierPassword == ''){
          alert('Please input your data');
        }else{
            
              var urlAction = this.url+"/?operation=addCashier";
  
            fetch(urlAction,{
                method:'post',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:"cashier_name="+this.state.cashierName+"&cashier_email="+this.state.cashierEmail+"&cashier_password="+this.state.cashierPassword
            })
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({cashierName:''});
                this.setState({cashierEmail:''});
                this.setState({cashierPassword:''});
                this.props.navigation.navigate('LoginPage');
            })
        }
    }
    render() {
        // const SignUpPage = ({navigation}) => {
        //     const handleGoTo = (page) => {
        //         navigation.navigate(page)
        //     }
        return (
            <View style={styles.container}>
            <Image source={logoCassie} style={styles.logo}/>
            <Text style={styles.textWelcome}>Sign Up to Cassie!</Text>

            <TextInput 
                placeholder="Please tell us your full name" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput}
                value={this.state.cashierName}
                onChangeText={(text)=>this.setState({cashierName:text})} 
                />
            <TextInput 
                placeholder="Email" 
                placeholderTextColor="#B1B1B1"
                style={styles.customTextInput2} 
                value={this.state.cashierEmail}
                onChangeText={(text)=>this.setState({cashierEmail:text})} 
            />
            <TextInput 
                placeholder="Password" 
                placeholderTextColor="#B1B1B1"
                secureTextEntry={true}
                style={styles.customTextInput2}
                value={this.state.cashierPassword}
                onChangeText={(text)=>this.setState({cashierPassword:text})} 
            />

            <TouchableOpacity style={styles.btnSignUp} onPress={()=>this.addData()}>
            {/* <TouchableOpacity style={styles.btnSignUp} onPress={() => handleGoTo('LoginPage')}> */}
                <Text style={styles.txtSignUp}>Sign up</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDesc}>Already have an account?</Text>
                {/* <Text style={styles.textDesc2} onPress={() => handleGoTo('LoginPage')}> Log in here</Text> */}
                <Text style={styles.textDesc2} onPress={() => this.props.navigation.navigate('LoginPage')}> Log in here</Text>
            </View>



        </View>
        )
    }
}

export default SignUpPage

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
        marginTop: resHeight * 0.03,
    },
    textDesc2: {
        // fontSize: 14,
        fontSize: resWidth * 0.036,
        // marginTop: 20,
        marginTop: resHeight * 0.03,
        color: '#00AEE8',
    },
    btnSignUp: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        // marginTop: 20,
        marginTop: resHeight * 0.026,
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
    txtSignUp: {
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