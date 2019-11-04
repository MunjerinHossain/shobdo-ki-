import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DraggableFlatList from 'react-native-draggable-flatlist'
import Phonetic from './Avro'
import keyboard1 from './LetterLogic'
import validateWord from './BanglaWordLists'


export default class GameboardScreen extends Component {
  state = { usedletter: [], userInput: [], capsOn: false, bangla: [], valid:false }

  letterClicked = (item, index) => {
    let disabledletter = this.state.usedletter
    disabledletter.push(index)

    let compositionbox = this.state.userInput
    if (this.state.capsOn == true) {
      compositionbox.push({ letter: item.name.toLocaleUpperCase(), boardIndex: index })

    }
    else {
      compositionbox.push({ letter: item.name, boardIndex: index })
    }

    let banglaWord = this.convertEngToBan(compositionbox)
    let valid = validateWord(banglaWord)
    
    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord, valid:valid })


  }
  caps_ = () => {

    this.setState({ capsOn: !this.state.capsOn })

  }
  backspace = (index) => {

    let compositionbox = this.state.userInput
    let disabledIndex = this.state.usedletter.indexOf(this.state.userInput[index].boardIndex)
    compositionbox.splice(index, 1)
    let disabledletter = this.state.usedletter
    disabledletter.splice(disabledIndex, 1)
    let banglaWord = this.convertEngToBan(compositionbox)
    let valid = validateWord(banglaWord)
    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord, valid:valid })
  }

  convertEngToBan = (userInput) => {
    let Word = userInput.reduce((a, b) => a + (b.letter), "");
    return Phonetic.parse(Word)

  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => { (this.backspace(index)) }}
        delayLongPress={100}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{
          fontWeight: 'bold',
          fontcolor: 'black',
          fontSize: 30,
          letterSpacing: 20

        }}>{item.letter}</Text>
      </TouchableOpacity>
    )
  }

  // wordvalidate = () => {
  //   var word1 = this.state.bangla;
  //   console.log(word1);
  // }

  render() {


    // const letters = [
    //   { name: 'a' }, { name: 'b' },
    //   { name: 'c' }, { name: 'd' },
    //   { name: 'e' }, { name: 'f' },
    //   { name: 'g' }, { name: 'h' },
    //   { name: 'i' }, { name: 'j' },
    //   { name: 'k' }, { name: 'k' },
    //   { name: 'm' }, { name: 'n' },
    //   { name: 'o' }, { name: 'p' },
    //   { name: 'q' }, { name: 'r' },
    //   { name: 's' }, { name: 't' },
    //   { name: 'u' }, { name: 'v' },
    //   { name: 'w' }, { name: 'x' },
    //   { name: 'y' }, { name: 'z' },

    // ];

    let letters = []
    let temp = keyboard1()
    console.log("render")
    temp.forEach((item)=> {
      //console.log(item)
     letters.push({name: item.letter})
    })
    //console.log("game", letters)

    return (
      <>


        <View style={styles.container}>

          <Text style={styles.text}>{this.state.bangla}</Text>
        </View>
        <View style={[styles.container]}>
          
            <Text style={styles.text}> {this.state.valid?'true':'false'} </Text>
          
        </View>

        {/* <View style={{height:40}}>
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
          </View> */}
        <View style={{ height: 80 }}>
          <DraggableFlatList
            data={this.state.userInput}
            renderItem={this.renderItem}
            horizontal={true}
            keyExtractor={(item, index) => `draggable-item-${item.boardIndex}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => {
              let banglaWord = this.convertEngToBan(data)
              let valid = validateWord(banglaWord)
              this.setState({ userInput: data, bangla: banglaWord, valid:valid })
            }}
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
              <TouchableOpacity disabled={this.state.usedletter.indexOf(index) != -1} onPress={() => { this.letterClicked(item, index) }}>
                <Text style={styles.itemName}>{this.state.usedletter.indexOf(index) == -1 && (this.state.capsOn ? item.name.toLocaleUpperCase() : item.name)}
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
    padding: 5,

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
