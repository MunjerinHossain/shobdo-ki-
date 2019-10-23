import React, { Component } from 'react';
import { TextInput,TouchableOpacity,StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import Phonetic from './Avro'






 export default class GameboardScreen extends Component {
 state = { ButtonStateHolder : false,userInput: '',capsOn:false, bangla:''}
  
 letterClicked = (item) => {
  let composedWord=""
   if(this.state.capsOn==true){
    composedWord=this.state.userInput+item.name.toLocaleUpperCase()

   }
   else{
   composedWord=this.state.userInput+item.name}
   let banglaWord=  Phonetic.parse(composedWord)
  
  this.setState({ButtonStateHolder : true ,userInput:composedWord,bangla:banglaWord})
  
   
  } 
  caps_ = () => {
    
    this.setState({capsOn:!this.state.capsOn})
  
  }
  
  render() {
  

    const letters = [
      { name: 'a' }, { name: 'b' },
      { name: 'c' }, { name: 'd' },
      { name: 'e' }, { name: 'f' },
      { name: 'g' }, { name: 'h' },
      { name: 'i' }, { name: 'j' },
      { name: 'k' }, { name: 'k' },
      { name: 'm' }, { name: 'n' },
      { name: 'o' }, { name: 'p' },
      { name: 'q' }, { name: 'r' },
      { name: 's' }, { name: 't' },
      { name: 'u' },{ name: 'v' },
      { name: 'w' },{ name: 'x' },
      { name: 'y' },{ name: 'z' },
      
    ];
    return (
      <>

      
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.bangla}</Text>
    {this.state.userInput.split("").map((data) => {
      return (
        <TouchableOpacity style={styles.letter}><Text>{data}</Text></TouchableOpacity>
      )
    })}

     
      <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.caps_()}
          >
            <Text style={styles.submitButtonText}> CAPSLOCK </Text>
          </TouchableOpacity>
      </View>
       <FlatGrid
        itemDimension={65}
        items={letters}
        style={styles.gridView}
        
        // staticDimension={300}
         //fixed
        //spacing={10}
        renderItem={( { item, index }) => (
         
         <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <TouchableOpacity disabled={this.state.ButtonStateHolder} onPress={()=>{this.letterClicked(item)}}><Text style={styles.itemName}>{this.state.capsOn?item.name.toLocaleUpperCase():item.name}</Text></TouchableOpacity> 
            <Text style={styles.itemCode}>{item.code}</Text>
           
          </View>
        )}
      />
      </>
    );
  }
 }
 
const styles = StyleSheet.create({
  letter:{
    flexDirection:"row",
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
  },  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    alignItems: 'center', height: 40, width: "50%", 
    borderColor: 'red', borderWidth: 2, marginTop: 20,
    textAlign:'center',padding: 3,
  },     

  gridView: {
    
    flex: 1,
    
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 1,
    height: 60,
    
  },
  itemName: {
    fontSize: 20,
    
    color: 'black',
    fontWeight: '600',
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 100,
    maxWidth: 80,
    padding: 2,
    textAlign: 'center',
  
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  
  },

 
});
 