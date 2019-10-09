import React from 'react';
import { View,TouchableOpacity,StyleSheet,TextInput , Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "yellow",
    width:160,
    padding: 20,
    margin: 10,
    alignItems: "center",
    height: 20
    
  },
  submitButtonText: {
    color: "black",
    fontWeight: 'bold'
  }
});



class HomeScreen extends React.Component {


  joinin_ = () => {
    this.props.navigation.navigate('Join')
  
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
       <TouchableOpacity
          style={styles.submitButton}
          //onPress={() => this.login(this.state.email, this.state.password)}
          
        >
          <Text style={styles.submitButtonText}> New Game </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.submitButton}
          //onPress={() => this.login(this.state.email, this.state.password)}
          onPress={this.joinin_}
        >
          <Text style={styles.submitButtonText}> Join Game </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class JoinScreen extends React.Component {

  _gameOn = () => {
    //function to make simple alert
    alert('Message received, Waiting for Game UI');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter the code here"
          placeholderTextColor="black"
          autoCapitalize="none"
          // onChangeText={(username)=>this.setState({username})}
          // value={this.state.username}
        />
        


        <TouchableOpacity
          style={styles.submitButton}
          //onPress={() => this.login(this.state.email, this.state.password)}

          onPress={this._gameOn}
        >
          <Text style={styles.submitButtonText}> Alert Button </Text>
        </TouchableOpacity>
      </View>

    );
  }
}

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