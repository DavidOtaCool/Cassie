import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome, LoginPage, SignUpPage, Dashboard } from '../pages/pageCollection';

const Stack = createNativeStackNavigator();

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
                name="Dashboard" 
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default Router;
