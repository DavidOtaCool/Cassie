import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { 
        Welcome, 
        LoginPage, 
        SignUpPage, 
        Customer,
        Menu,
        Inventory,
        Report,
        Cashier,
        History,
        AddMenu,
        Order
    } from '../pages/pageCollection';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Footer from '../Footer/Footer';
const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();

const Router = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeNoAuth" 
                component={Welcome}
                options={{
                    headerShown: false,
                }} 
            />

            <Stack.Screen 
                name="LoginPage" 
                component={LoginPage}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="SignUpPage" 
                component={SignUpPage}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="DashboardfromLogin" 
                component={Footer}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Customer" 
                component={Customer}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Menu" 
                component={Menu}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Inventory" 
                component={Inventory}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Report" 
                component={Report}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Cashier" 
                component={Cashier}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="History" 
                component={History}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="AddMenu" 
                component={AddMenu}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="Order" 
                component={Order}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// const Footer = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Dashboard" component={Dashboard} />
//             <Tab.Screen name="NewsFeed" component={NewsFeed} />
//             <Tab.Screen name="Order" component={Order} />
//             <Tab.Screen name="Stats" component={Stats} />
//             <Tab.Screen name="Profile" component={Profile} />
//         </Tab.Navigator>
//     )
// }

export default Router;
