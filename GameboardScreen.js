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
    hint: "", word: "", level: "", usedWord: [], valid: false, dictionaryCheck: false, indexSlice: [], maxLength: 0,
    total: 0, singleWordPoint: 0}

    static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
        header: null
      }
    }

  componentDidMount() {
    this.checkAsyncStorage()
    this.getPoint()

  }

  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   return {
    
  //     headerLeft: (
  //       <TouchableOpacity activeOpacity={0.5}
  //         onPress={() => {
  //           Alert.alert(
  //             'Quit',
  //             'Do You want to quit the game?',
  //             [
  //               { text: 'YES', onPress: () =>{ navigation.getParam('update')()
  //                 navigation.navigate('Home') }},//console.warn('YES Pressed')
  //               { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
  //               //
  //             ]
  //           );
  //           //
  //         }
  //         }
  //       >
  //         <Text style={styles.quit}>Quit</Text>
  //         <View 
  //         />
  //       </TouchableOpacity>
  //     ),
  //     // title: navigation.getParam('task').title

  //     // headerRight: (

  //     //   <TouchableOpacity activeOpacity={0.5}
  //     //     disabled={this.state.valid ? false : true} onPress={() => { this.showNext()
  //     //     }}>

  //     //       <View>
              
  //     //   <Text>dsds {this.state.valid}</Text>
  //     //     <Text style={styles.nextButton}>Next</Text>
  //     //     </View>
  //     //   </TouchableOpacity>

  //     // )

      
  //   }
  // }



  //generates random index
  randomNumber() {

    //random generating along with index Update
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
      dictionary = JSON.parse(value)

    }
    else {
      dictionary = getDictionary()
      console.log("blank")

    }
    this.setState({ asyncDictionary: dictionary, maxLength: dictionary.length-1}, () => {
      this.generateWord(dictionary)
    })

  }


  showNext = () => {
    this.pointWord() 
    //splicing
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
    //point systems
    // let all = this.state.asyncDictionary
    // console.log("di"+ all.map((all)=>(all.level,this.state.index)))
    // let pointLevel = this.state.level
    // console.log("level"+ pointLevel)
let point = 0
point = this.state.level == "Easy" ? 3 : point
point = this.state.level == "Medium" ? 5 : point
point = this.state.level == "Difficult" ? 10 : point

  // if(pointLevel === all){
    let score = (this.state.level.length) + point
    let total= this.state.total + score
    this.setState({total:total, singleWordPoint:score}, ()=> {this.storePoint(total)})
    //async store total score

    console.log("point"+ score)
   //}

  }

  //stores data
  storeToken = async(dictionary) =>{
    try {
      await AsyncStorage.setItem('dictionary', JSON.stringify(dictionary));
      console.log('store' + JSON.stringify(dictionary))
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  //gets data
 getToken = async() => {
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
 storePoint= async(total)=>{

    try {
      await AsyncStorage.setItem('score', JSON.stringify(total));
      console.log('storeScore' + JSON.stringify(total))
    } catch (error) {
      console.log("Something went wrong", error);
    }
   }

    getPoint = async() =>{
    try {

      let storePoint = await AsyncStorage.getItem('score')
      if (storePoint != null) {
        console.log('getScore' + JSON.parse(JSON.stringify(storePoint)))
        let save = Number(storePoint)
        this.setState({ total:save })

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

    //same words cannot returning

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
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => this.validateWord() },
      ],
      { cancelable: false },
    );

    // Alert.alert(
    //   'Score',
    //   'My Alert Msg',
    //   [
      
    //     { this.state.score },
    //   ],
    //   { cancelable: false },
    // );

    //need to show score via alert

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
      <View style={styles.Viewquit}>
          <TouchableOpacity activeOpacity={0.5}
          onPress={() => {
            Alert.alert(
              'Quit',
              'Do You want to quit the game?',
              [
                { text: 'YES', onPress: () =>{ this.props.navigation.getParam('update')()
                  this.props.navigation.navigate('Home') }},//console.warn('YES Pressed')
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                
              ]
            );
            //
          }
          }
        >
          <Text style={styles.quit}>Quit</Text>
          <View 
          />
        </TouchableOpacity>
        </View>

        <View style={styles.ViewNext}>
           <TouchableOpacity activeOpacity={0.5}
          disabled={this.state.valid ? false : true} onPress={() => { this.showNext()
          }}>

            <View>
          <Text style={styles.nextButton}>Next</Text>
          </View>
        </TouchableOpacity>
           </View>


   
        <View>
        <Text style={styles.text}>{this.state.bangla}</Text>
        </View>

        <View>
          <Text style={styles.hint}>{this.state.hint}</Text>

        </View>

        <View style={[styles.container]}>

          {/* <Text> {this.state.valid ? 'true' : 'false'} </Text> */}
        
        <View>
          <Text style={styles.level}>{this.state.level}</Text>
        </View>

        </View>
       

        <View style={styles.container}>
          <View style={styles.alertButton}>

            <TouchableOpacity onPress={() => this.AlertButton()} >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

          </View>
           
        
          
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
        <View style={{ height: 60 }}>
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

      
        <FlatGrid
          itemDimension={75}
          items={letters}
          // letterClicked={letters}
          style={styles.gridView}

          // staticDimension={300}
          // fixed
          // spacing={10}
          renderItem={({ item, index }) => (

            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <TouchableOpacity onPress={() => { this.letterClicked(item, index) }}>
                <Text style={styles.itemName}>{(this.state.capsOn ? item.name.toLocaleUpperCase() : item.name)}
                </Text></TouchableOpacity>
              <Text style={styles.itemCode}>{item.code}</Text>

            </View>
          )}
        />
        
          <View style={[styles.container]}>
          <TouchableOpacity
            style={styles.capsButton}
            onPress={() => this.caps_()}
          >
            <Text style={styles.capsLock}> CAPSLOCK </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  letters: {
    flexDirection: "row",
  },
  capsButton: {
    left: 120,
    color: "white",
    fontWeight: 'bold',
    fontSize:15,
    backgroundColor: "#E77471",
    width: 100,
    padding: 10,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',

  },

  capsLock:{
    color: "white",
    fontWeight: 'bold',
    fontSize:15,
  },

  submitButtonText: {
    
    color: "white",
    fontWeight: 'bold',
    fontSize:18,
    backgroundColor: "#E77471",
    width: 80,
    padding: 5,
    marginTop: 12,
    justifyContent: 'center',
    textAlign: 'center',
 
    //margin: 10
  },

  Viewquit:{
   width: 100,
  },

  ViewNext:{
    width: -92,
  },

  quit:{
    top: 10,
    left: 5,
    color: "white",
    fontWeight: 'bold',
    fontSize:18,
    backgroundColor: "#E77471",
    width: 80,
    padding: 5,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
 
    //margin: 10
  },

  nextButton: {
    top: -29,
    left:250,
    color: "white",
    fontWeight: 'bold',
    fontSize:18,
    backgroundColor: "#F7E7CE",
    width: 90,
    padding: 5,
    //margin: 10,
    justifyContent: 'center',
    textAlign: 'center',
 
    //margin: 10
  },

  container: {

    justifyContent: 'center',
    alignItems: 'center',
    
  },
  // container1: {
  //   alignSelf: 'flex-start',


  // },
  // container2: {
  //   alignSelf: 'flex-start',
  //   padding: 5,

  // },

  text: {
    justifyContent: 'center', left: 90,
    alignItems: 'center', height: 40, width: "50%",
    borderColor: 'red', borderWidth: 2, marginTop: 10,
    textAlign: 'center', padding: 5,
  },

  hint:{
    justifyContent: 'center',
    alignItems: 'center', height: 50, width: "100%",
    borderColor: 'red', borderWidth: 1, marginTop: 20, marginBottom: 5,
    textAlign: 'center', padding: 5,
  },

  level:{   justifyContent: 'center', 
  alignItems: 'center', height: 30, width: 100,
  borderColor: 'red', borderWidth: 1, marginTop: 2,
  textAlign: 'center', padding: 5,
},

  gridView: {
     marginTop: 0

  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 1,
    height: 60,
    width: 100,

  },
  // itemContainer1: {
  //   justifyContent: 'flex-end',
  //   borderRadius: 1,
  //   height: 60,

  // },
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