import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import JoinScreen from './JoinScreen'
import NewGameScreen from './NewGameScreen'
import GameboardScreen from './GameboardScreen'
import StatScreen from "./Stats"
import SplashScreen from 'react-native-splash-screen'
import SplashAnimation from './SplashAnimation'


import NewGameOptionsScreen from './NewGameOptionsScreen'




const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Join: JoinScreen,
    NewGame:NewGameScreen,
    Gameboard:GameboardScreen,
    GameOptionsScreen: NewGameOptionsScreen,
    Stats: StatScreen,
    Splash: SplashAnimation
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
  SplashScreen.hide();
    return <AppContainer />;
  }
}