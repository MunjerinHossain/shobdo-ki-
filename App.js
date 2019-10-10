import React from 'react';
import { FlatList,View,TouchableOpacity,StyleSheet,TextInput , Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import JoinScreen from './JoinScreen'
const styles = StyleSheet.create({
  list: {
    width:360,
    flex: 3,
    paddingTop: 22,
    flexDirection:'column',
    alignItems:'stretch',
    borderColor:'red'

   },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    //borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
  
  },
  container: {
    flex: 1,
   // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 22,
    
    
  },
  input: {
    margin: 15,
    height: 40,
    width:300,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "aqua",
    width:160,
    padding: 20,
    //margin: 10,
    alignItems: "center",
    height: 20,
    margin: 10
    
  },
  submitButtonText: {
    color: "black",
    fontWeight: 'bold',
    alignItems: "center"
  }
});




const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Join: JoinScreen,
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