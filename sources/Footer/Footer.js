import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dashboard, NewsFeed, Order, Stats, Profile } from '../pages/pageCollection';
// import Router from '../Router/Router';
import Home from '../assets/icons/home.png'
import Feed from '../assets/icons/newspaper.png'
import Statistics from '../assets/icons/statistics.png'
import User from '../assets/icons/user.png'
import Plus from '../assets/icons/plus2.png'

const Tab = createBottomTabNavigator();

const OrderButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -35,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow,
        }}
        onPress={onPress}
    >

        <View style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: '#FC6B68',
            ...styles.shadow,
        }}>
            {children}
        </View>

    </TouchableOpacity>
);

const Footer = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    right: 20,
                    left: 20,
                    borderRadius: 20,
                    bottom: 20,
                    height: 80,
                    ...styles.shadow,
                    paddingHorizontal: 5,
                    paddingBottom: 10,
                }
            }}
        >
            <Tab.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                    (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={Home}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    marginBottom: 7,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', fontSize: 11,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Home'}
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen 
                name="NewsFeed" 
                component={NewsFeed}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                    (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={Feed}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    marginBottom: 7,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', fontSize: 11,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Feeds'}
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen 
                name="Order" 
                component={Order}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image 
                            source={Plus}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#fff',
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <OrderButton {...props} />
                    ),
                    tabBarStyle: {
                        display: 'none',
                    }
                }}
            />

            <Tab.Screen 
                name="Stats" 
                component={Stats}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                    (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={Statistics}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    marginBottom: 7,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', fontSize: 11,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Stats'}
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                    (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image 
                                source={User}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    marginBottom: 7,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', fontSize: 11,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Me'}
                            </Text>
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default Footer

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#855B54',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})