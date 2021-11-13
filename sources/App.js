import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, ScrollView} from 'react-native';
import Welcome from './pages/Welcome/Welcome';
import Router from './Router/Router';
import Footer from './Footer/Footer';

const App = () => {
  const [isShow, SetIsShow] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      SetIsShow(false);
    }, 5000);
  }, []);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    // <View>
    //   <Welcome />
    // </View>
  );
};



export default App;
