import * as React from 'react';
import { Button, View, TextInput,Switch,Text,StyleSheet, Alert, TouchableOpacity, } from 'react-native';


export default class NewGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', switchValue: false};
  }
  //state = {switchValue:false}
  
  
  render() {
    return (

      
      <View style={ styles.container}>

        <View>
          <Text style={styles.home}>Total Points</Text>
        </View>
       <TextInput
          style={{height: 40, width: "50%", borderColor: 'red', borderWidth: 1,textAlign:'center',padding:10}}
          placeholder="Earned Points"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
            
        />
        {/* <Button
          title="Show"
          onPress={Alert.alert(gameCode)}
        color="red"
        width="50%"
        /> */}
        

    <View style={{width:"25%",right:10}}>

  <Button
          title="Start"
           onPress={() => this.props.navigation.navigate('Gameboard')}
        color="blue"
        width="50%"
        />
</View>
                        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
