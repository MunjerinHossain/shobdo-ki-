import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StatScreen from "./Stats"

const RootStack = createStackNavigator({
  Stats: StatScreen,

  initialRouteName: 'StatScreen',
  
});

const AppContainer =  createAppContainer(RootStack);

export default class App extends React.Component{
  render(){
    return <AppContainer />
  }
}