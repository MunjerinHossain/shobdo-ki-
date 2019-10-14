import * as React from 'react';
import { Button, View, TextInput,Switch,Text,StyleSheet } from 'react-native';


export default class NewGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  state = {switchValue:false}
  toggleSwitch = (value) => {
    this.setState({switchValue: value})
  }
  
  render() {
    return (
      <View style={ styles.container}>
       <TextInput
          style={{height: 40, width: "50%", borderColor: 'red', borderWidth: 1,textAlign:'center',padding:10}}
          placeholder="Enter Game Name"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <View style={{paddingTop:10}}>
          <Text style={{padding:10,right:20}} >{this.state.switchValue?'Private':'Public'}</Text>

<Switch style={{
  // position:"relative",
  // left: 60
  bottom:32,
  left:20,
  
  }}
          onValueChange = {this.toggleSwitch}
          value = {this.state.switchValue}/>
</View>

    <View style={{width:"25%",right:10}}>
  <Button
          title="Create"
          onPress={() => this.props.navigation.navigate('Details')}
        color="red"
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
