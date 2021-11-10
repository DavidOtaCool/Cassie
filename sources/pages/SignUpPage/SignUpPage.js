import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, View, Alert, Touchable } from 'react-native'
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler'
import logoCassie from '../../assets/icons/cashie_light.png'

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
                style={styles.customTextInput}
                value={this.state.cashierName}
                onChangeText={(text)=>this.setState({cashierName:text})} 
                />
            <TextInput 
                placeholder="Email" 
                style={styles.customTextInput2} 
                value={this.state.cashierEmail}
                onChangeText={(text)=>this.setState({cashierEmail:text})} 
            />
            <TextInput 
                placeholder="Password" 
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
        fontSize: 14,
        marginTop: 20,
    },
    textDesc2: {
        fontSize: 14,
        marginTop: 20,
        color: '#00AEE8',
    },
    btnSignUp: {
        backgroundColor: '#FC6B68',
        alignSelf: 'stretch',
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: -4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    txtSignUp: {
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