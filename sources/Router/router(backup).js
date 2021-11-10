import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import Welcome from "../pages/Welcome/Welcome";
import LoginPage from "../pages/LoginPage/LoginPage";

const screens = {
    //The "Welcome" screen will be show first. Because it is on the top (after LoginPage etc)
    Home: {
        screen: Welcome
    },

    LoginPage: {
        screen: LoginPage
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);