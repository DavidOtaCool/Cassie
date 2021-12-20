import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Dashboard, NewsFeed, Stats, Profile, Order } from '../pages/pageCollection';
// import Router from '../Router/Router';
import Home from '../assets/icons/home.png'
import Feed from '../assets/icons/newspaper.png'
import Statistics from '../assets/icons/statistics.png'
import User from '../assets/icons/user.png'
import Plus from '../assets/icons/plus2.png'

var resHeight = Dimensions.get('window').height;
var resWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const OrderButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            // top: -35,
            top: -(resWidth * 0.085),
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow,
        }}
        onPress={onPress}
    >

        <View style={{
            // width: 60,
            width: resWidth * 0.153,
            // height: 60, 
            height: resWidth * 0.153, 
            // borderRadius: 50,
            borderRadius: (resHeight * 0.153)/2,
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
                    // right: 20,
                    // left: 20,
                    right: resWidth * 0.051,
                    left: resWidth * 0.051,
                    // borderRadius: 20,
                    borderRadius: resWidth * 0.051,
                    // bottom: 20,
                    bottom: resWidth * 0.051,
                    // height: 80,
                    height: resWidth * 0.205,
                    ...styles.shadow,
                    // paddingHorizontal: 5,
                    paddingHorizontal: resWidth * 0.01,
                    // paddingBottom: 10,
                    paddingBottom: resWidth * 0.025,
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
                                    // width: 25,
                                    // height: 25,
                                    width: resWidth * 0.0645,
                                    height: resWidth * 0.0645,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    // marginBottom: 6,
                                    marginBottom: resWidth * 0.015,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', 
                                // fontSize: 11,
                                fontSize: resWidth * 0.028,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Home'}
                            </Text>
                        </View>
                    ),
                }}
            />

            {/* <Tab.Screen 
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
                                    // width: 25,
                                    // height: 25,
                                    width: resWidth * 0.0645,
                                    height: resWidth * 0.0645,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    // marginBottom: 6,
                                    marginBottom: resWidth * 0.015,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', 
                                // fontSize: 11,
                                fontSize: resWidth * 0.028,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Feeds'}
                            </Text>
                        </View>
                    ),
                }}
            /> */}

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
                                width: resWidth * 0.0645,
                                height: resWidth * 0.0645,
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

            {/* <Tab.Screen 
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
                                    // width: 25,
                                    // height: 25,
                                    width: resWidth * 0.0645,
                                    height: resWidth * 0.0645,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    // marginBottom: 6,
                                    marginBottom: resWidth * 0.015,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', 
                                // fontSize: 11,
                                fontSize: resWidth * 0.028,
                            }}>
                                {focused? <Text>&#9679;</Text> : 'Stats'}
                            </Text>
                        </View>
                    ),
                }}
            /> */}

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
                                    // width: 25,
                                    // height: 25,
                                    width: resWidth * 0.0645,
                                    height: resWidth * 0.0645,
                                    tintColor: focused ? '#000' : '#B6B6B6',
                                    // marginBottom: 6,
                                    marginBottom: resWidth * 0.015,
                                }}
                            />
                            <Text style={{
                                color: focused? '#000' : '#B6B6B6', 
                                // fontSize: 11,
                                fontSize: resWidth * 0.028,
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