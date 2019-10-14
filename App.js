import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import JoinScreen from './JoinScreen'
import NewGameScreen from './NewGameScreen'
import NewGameOptionsScreen from './NewGameOptionsScreen'


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Join: JoinScreen,
    NewGame:NewGameScreen,
    GameOptionsScreen: NewGameOptionsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}