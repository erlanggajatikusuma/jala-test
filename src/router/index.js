import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Header } from '../components';
import { Detail, Home, Splash } from '../pages';
import Color from '../styles/Color';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ header: () => <Header title="Jala Media" /> }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ header: () => <Header title="Harga Udang" /> }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <View style={{ backgroundColor: Color.WHITE, flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Color.PRIMARY} />
      <App />
    </View>
  );
};

export default Router;
