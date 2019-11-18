import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, View, Text , Alert, AsyncStorage} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DraggableFlatList from 'react-native-draggable-flatlist'
import Phonetic from './Avro'
import keyboard1 from './LetterLogic'
import getDictionary from './BanglaWordLists'
import { Button } from 'react-native-paper';


export default class GameboardScreen extends Component {
  state = { usedletter: [], userInput: [], capsOn: false, bangla: [], asyncDictionary: {},
    hint: "", word: "", level: "",valid:false }

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
    let valid = this.validateWord(banglaWord)
    
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
    let valid = this.validateWord(banglaWord)
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
          fontColor: 'black',
          fontSize: 25,
          letterSpacing: 20

        }}>{item.letter}</Text>
      </TouchableOpacity>
    )
  }

  AlertButton(){

let dictionary = getDictionary()
    this.getToken(dictionary)
   
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.validateWord()},
      ],
      {cancelable: false},
    );
  }

  

  randomNumber() {
    

    var min=0
    var max=17
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

  // wordvalidate = () => {
  //   var word1 = this.state.bangla;
  //   console.log(word1);
  // }
  componentDidMount(){
    this.generateWord()
   
  }
  generateWord=()=>{
    let dictionaryOriginal = getDictionary()

    let dictionary = dictionaryOriginal
    let index = this.randomNumber();
    console.log("index" + index)
    let hint = dictionary[index].hint
    let word = dictionary[index].word
    let level = dictionary[index].level
       this.setState({hint:hint, word:word, level:level, valid: false, asyncDictionary: dictionary})
     
     this.storeToken(dictionary)
      }

validateWord=()=>{

 let match1 = this.state.bangla
 let match2 = this.state.word
 
 if(match1===match2){
   this.setState({valid: true})
   
 }

}


async storeToken(dictionary) {
  try {
     await AsyncStorage.setItem('dictionary', JSON.stringify(dictionary));
     console.log(JSON.stringify(dictionary))
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

  async getToken(dictionary) {
    try {
      let data = await AsyncStorage.getItem("dictionary");
      // let data = JSON.parse(data);
      // console.log(data);
      console.log("Fstorage"+ JSON.parse(JSON.stringify(data)))
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  
  render() {


    const letters = [
      { name: 'a' }, { name: 'b' },
      { name: 'c' }, { name: 'd' },
      { name: 'e' }, { name: 'f' },
      { name: 'g' }, { name: 'h' },
      { name: 'i' }, { name: 'j' },
      { name: 'k' }, { name: 'l' },
      { name: 'm' }, { name: 'n' },
      { name: 'o' }, { name: 'p' },
      { name: 'q' }, { name: 'r' },
      { name: 's' }, { name: 't' },
      { name: 'u' }, { name: 'v' },
      { name: 'w' }, { name: 'x' },
      { name: 'y' }, { name: 'z' },

    ];

    // let letters = []
    // let temp = keyboard1()
    // console.log("render")
    // temp.forEach((item)=> {
    //   //console.log(item)
    //  letters.push({name: item.letter})
    // })
    // //console.log("game", letters)




    return (
      <>


        <View style={styles.container}>

          <Text style={styles.text}>{this.state.bangla}</Text>
        </View>
        <View style={[styles.container]}>
          
            <Text style={styles.text}> {this.state.valid?'true':'false'} </Text>
           
        </View>

        <View>
    <Text>{this.state.hint}</Text>

        </View>

        
        <View>
    <Text>{this.state.level}</Text>
        </View>
        <View>

<Button onPress={()=> this.AlertButton()}>
  <Text style={styles.submitButtonText}>Submit</Text>
</Button>


<Button disabled={this.state.valid ? false : true} onPress={()=> this.generateWord()}>
  <Text style={styles.submitButtonText}>Next</Text>
</Button>

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
              let valid = this.validateWord(banglaWord)
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
              <TouchableOpacity  onPress={() => { this.letterClicked(item, index) }}>
                <Text style={styles.itemName}>{(this.state.capsOn ? item.name.toLocaleUpperCase() : item.name)}
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