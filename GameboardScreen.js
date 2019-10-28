import React, { Component } from 'react';
import { FlatList,TextInput, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import Phonetic from './Avro'
import { ScrollView } from 'react-native-gesture-handler';


export default class GameboardScreen extends Component {
  state = {  usedletter:[],userInput: [], capsOn: false, bangla: [] }

  letterClicked = (item,index) => {
   let disabledletter= this.state.usedletter
   disabledletter.push(index)

    let composedWord = this.state.userInput
    if (this.state.capsOn == true) {
      composedWord.push({letter:item.name.toLocaleUpperCase(),boardIndex:index})

    }
    else {
      composedWord.push({letter:item.name,boardIndex:index})
    }
    
    let Word = composedWord.reduce((a, b) => a + (b.letter),"");

    console.log(Word)
    let banglaWord = Phonetic.parse(Word)

    this.setState({ usedletter:disabledletter ,userInput: composedWord, bangla: banglaWord })


  }
  caps_ = () => {

    this.setState({ capsOn: !this.state.capsOn })

  }
  backspace = (index) => {
  
    let compositionbox = this.state.userInput
    let disabledIndex=this.state.usedletter.indexOf(this.state.userInput[index].boardIndex)
    compositionbox.splice(index,1)
    let usedletter= this.state.usedletter
    usedletter.splice(disabledIndex,1)
    let Word = compositionbox.reduce((a, b) => a + (b.letter), "");
    let banglaWord = Phonetic.parse(Word)
    this.setState({ usedletter:usedletter,userInput: compositionbox, bangla: banglaWord })
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
      { name: 'u' }, { name: 'v' },
      { name: 'w' }, { name: 'x' },
      { name: 'y' }, { name: 'z' },

    ];

    
    return (
      <>


        <View style={styles.container}>
          
          <Text style={styles.text}>{this.state.bangla}</Text>
        </View>
          <View style={{height:40}}>
          <FlatList
            
            data={this.state.userInput}
            style={styles.container1}
            horizontal={true}
            

            renderItem={({ item, index }) => (
              <View style={[styles.container2]}>


                <TouchableOpacity onPress={() => { (this.backspace(index))} }><Text style={{fontSize:20}}>{item.letter}</Text></TouchableOpacity>


              </View>
            )}

          />
          </View>
          

        <View style={[styles.container]}>
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
          // letterClicked={letters}
          style={styles.gridView}

          // staticDimension={300}
          //fixed
          //spacing={10}
          renderItem={({ item, index }) => (

            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <TouchableOpacity disabled={this.state.usedletter.indexOf(index)!=-1} onPress={() => { this.letterClicked(item,index) }}>
                <Text style={styles.itemName}>{this.state.usedletter.indexOf(index)==-1 && (this.state.capsOn ? item.name.toLocaleUpperCase() : item.name)}
                </Text></TouchableOpacity>
              <Text style={styles.itemCode}>{item.code}</Text>

            </View>
          )}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  letters: {
    flexDirection: "row",
  },
  submitButton: {
    backgroundColor: "aqua",
    width: 160,
    padding: 20,
    //margin: 10,
    alignItems: "center",
    height: 10,
    margin: 10

  },
  submitButtonText: {
    color: "black",
    fontWeight: 'bold',
    alignItems: "center"
  },

  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    alignSelf: 'flex-start',
    
    
  },
  container2: {
    alignSelf: 'flex-start',
    padding:5,
    
  },

  text: {
    alignItems: 'center', height: 40, width: "50%",
    borderColor: 'red', borderWidth: 2, marginTop: 20,
    textAlign: 'center', padding: 3,
  },

  gridView: {

    flex: 1,

  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 1,
    height: 60,

  },
  itemContainer1: {
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
