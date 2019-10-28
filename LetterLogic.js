import React, {Component} from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Button} from 'react-native';
var SampleArray = ["bhalo",
"apu" ,
"ma" ,
"khela", 
"bhai" ,
"biral" ,
"pani"  ,
"morich",
"alo" ,
"murgi", 
"goru" ,
"chagol",
"jambura",
"zumka"
];
export default class Letterlogic extends React.Component{

    //Keyboard Rules 
    letterFrequency=()=> {
        var SampleArray_2 = SampleArray.toString();
        var Alphabets = "abcdefghijklmnopqrstuvwxyz"
        var CharFreq = {};

        for(var i = 0; i < Alphabets.length; i++){
            var count = 0;
            for(var j = 0; j < SampleArray_2.length; j++) {
                if(SampleArray_2[j] == Alphabets[i]){
                    count++;
                    
                }
            }
            CharFreq[Alphabets[i]] = count        
        }
        //console.log(CharFreq)
        //console.table(CharFreq)
        return CharFreq;
    }

    sortLetters=()=> {
        let letterscount = this.letterFrequency();
        //var letters = [];
        var Letters = {};
        
        for(let [key, value] of Object.entries(letterscount)) {
            if(value != 0){
                //Letters.push([key, value])
                Letters[key] = value;
            }
        }
        //console.log(Letters);
        return Letters;
    }

    generateKeyboard=()=> {
        let keycount = this.sortLetters();
        var letters1 = [];
       // console.log(keycount)

        //for(var i = 0; i < keycount.length; i++){
           
            // if(keycount[i] >= 5){
            //     console.log("np")
            // //    for(var j = 0; j < 3; j++){
            // //         letters1.push(keycount[i])
            // //     }
            // }
        //}
        for(let [key, value] of Object.entries(keycount)) {
            if( value >= 5){
                for(var i = 0; i < 3; i++){
                    letters1.push({key, value});
                    
                }
                
            }
            else if(value < 5 && value > 2){
                for(var i = 0; i <2; i++){
                    letters1.push({key, value});
                }
            }
            else{
                for(var i = 0; i <1; i++){
                    letters1.push({key, value});
                }
            }
            
        }
        
        console.table(letters1);
        //console.log(letters1)
        // for(let [key, value] of Object.entries(keycount)) {
        //     if(value == 5){
        //         for(var i = 0; i < 3; i++){
        //             letters1.push(key)
        //         }
        //     }
        // } [["a",9]]

    }

    render() {
        return (
            <View>
                <Button title="Hello" onPress={()=>{this.generateKeyboard()}}></Button>
                {/* <Text>{this.state.wordString}</Text>  */}
                {/* <Button title="Hello" onPress={()=>{this.converter()}}></Button>
                <Text>{this.state.wordString}</Text>  */}
            </View>
        );
    }
}