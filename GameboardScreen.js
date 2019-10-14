import * as React from 'react';
import { Button, View, TextInput,Switch,Text,StyleSheet } from 'react-native';

export default class GameboardScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: ''};
    }
    render() {
        const keyboard = alphabet.map((letter, index) =>
  <Button key={index} title ={letter}/>
  
  );
      return (
        <View style={key.boardContainer}>
          <Text style={key.text}>
          </Text>
  
          <View style={key.keyboard}>
              
            {keyboard}
           </View>
  
        </View>
      );
    }
  }
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                       'I', 'J', 'K', 'L', 'M', 'N', 'O', 
                  'P','Q','R','S','T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  const key = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },

    boardContainer: {
      
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
            text: {
              alignItems: 'center', height: 40, width: "50%", 
              borderColor: 'red', borderWidth: 2, marginTop: 50,
              marginBottom: 50 ,textAlign:'center',padding:10,
            },        
                      keyboard: {
                          flexDirection: 'row',
                          flex: 1,
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          marginLeft: 5,
                          marginRight: 5,
                    },
                    });