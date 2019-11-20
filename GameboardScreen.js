import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Alert, AsyncStorage } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DraggableFlatList from 'react-native-draggable-flatlist'
import Phonetic from './Avro'
import keyboard1 from './LetterLogic'
import getDictionary from './BanglaWordLists'
import { Button } from 'react-native-paper'


export default class GameboardScreen extends Component {
  state = {
    usedletter: [], userInput: [], capsOn: false, bangla: [], asyncDictionary: [],
    hint: "", word: "", level: "", usedWord: [], valid: false, dictionaryCheck: false, indexSlice: [], maxLength: 17,
    point: null
  }


  componentDidMount() {
    this.checkAsyncStorage()

  }

  //generates random index
  randomNumber() {
    var min = 0
    var max = this.state.maxLength
    console.log("gfh")
    return Math.floor(Math.random() * (max - min)) + min;
  }


  // if dictionary check value is true, it means async is not empty
  checkAsyncStorage = async () => {
    let value = await AsyncStorage.getItem('dictionary')
    //async function returns a promise object not the value of async storage getItem()
    //console.log("val" + JSON.stringify(value))
    let dictionary = []
    if (value != null) {
      console.log("value")
      dictionary = value

    }
    else {
      dictionary = getDictionary()
      console.log("blank")

    }
    this.setState({ asyncDictionary: dictionary }, () => {
      this.generateWord(dictionary)
    })

  }

  showNext = () => {
    //slicing
    let indexSlice = this.state.indexSlice
    let dictionary = this.state.asyncDictionary
    dictionary.splice(indexSlice, 1)

    console.log("Spliced" + indexSlice)
  this.setState({maxLength: dictionary.length}, ()=>{
    this.generateWord(dictionary)
  })
    

    // this.setState({})

  }

  //if storage is empty, dictionary will be generated from getDictionary()
  //if storage is not empty, dictionary will be generated from async getItem
  generateWord = dictionaryOriginal => {
    //console.log("dfdf",JSON.stringify(dictionaryOriginal))
    let dictionary = dictionaryOriginal
    let index = this.randomNumber();
    console.log("index" + index)
    let hint = dictionary[index].hint
    let word = dictionary[index].word
    let level = dictionary[index].level
    this.setState({
      hint: hint, word: word, level: level, valid: false, asyncDictionary: dictionary, indexSlice: index,
      bangla: "", userInput: []
    },
      () => { this.storeToken(this.state.asyncDictionary) })

  }

  validateWord = () => {

    let match1 = this.state.bangla
    let match2 = this.state.word

    if (match1 === match2) {
      this.setState({ valid: true })

    }

  }

  pointWord = ()=>{
    let point = (this.state.word.length)*5


  }

  //stores data
  async storeToken(dictionary) {
    try {
      await AsyncStorage.setItem('dictionary', JSON.stringify(dictionary));
      console.log('store' + JSON.stringify(dictionary))
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  //gets data
  async getToken() {
    try {

      let data = await AsyncStorage.getItem('dictionary')
      if (data != null) {
        console.log('get' + JSON.parse(JSON.stringify(data)))
        let result = JSON.parse(data)
        this.setState({ asyncDictionary: result })


        //return isn't working here 
        //getting a promise in async 
        //we could possibly use setstate
      }


    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


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

    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord, valid: valid })


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
    this.setState({ usedletter: disabledletter, userInput: compositionbox, bangla: banglaWord, valid: valid })
  }

  convertEngToBan = (userInput) => {
    let Word = userInput.reduce((a, b) => a + (b.letter), "");
    return Phonetic.parse(Word)

  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
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

  AlertButton() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        { text: 'I am bored', onPress: () => console.log('quit') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => this.validateWord() },
      ],
      { cancelable: false },
    );
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
          <View>

            <Button onPress={() => this.AlertButton()} >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>

          </View>

          
        </View>
        <View>
        <Text style={styles.text}>{this.state.bangla}</Text>
        </View>
        <View style={[styles.container]}>

          <Text> {this.state.valid ? 'true' : 'false'} </Text>

        </View>

        <View>
          <Text>{this.state.hint}</Text>

        </View>


        <View>
          <Text>{this.state.level}</Text>
        </View>

        <View>
        <Button disabled={this.state.valid ? false : true} onPress={() => { this.showNext() }}>
              <Text style={styles.nextButton}>Next</Text>
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
              this.setState({ userInput: data, bangla: banglaWord, valid: valid })
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
              <TouchableOpacity onPress={() => { this.letterClicked(item, index) }}>
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
    width: 140,
    padding: 20,
    //margin: 10,
    alignItems: "center",
 
    //margin: 10

  },
  submitButtonText: {
    color: "black",
    fontWeight: 'bold',
   
   
  },

  nextButton: {
    
    color: "black",
    fontWeight: 'bold',
    backgroundColor: "aqua",
    width: 160,
    padding: 20,
    //margin: 10,
    alignItems: "center",
 
    //margin: 10
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
    justifyContent: 'center',
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