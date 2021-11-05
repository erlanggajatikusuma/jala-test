import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Splash } from '../pages';
import { Header } from '../components';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ header: () => <Header /> }} />
    </Stack.Navigator>
  );
};

export default Router;
