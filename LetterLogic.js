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
"chagol"
];
export default class Letterlogic extends React.Component{

    // converter1 =()=> {
    //     //var SampleArray_2 = SampleArray.toString();
    //     console.log(SampleArray)
        
    // }

    // state = {
    //     wordString: "hello"
    // }
  
    // converter =()=> {
    //     this.setState({
    //         wordString: SampleArray.toString()
    //     })
    // }
    //Keyboard 
    removeComma =()=> {
        var SampleArray_2 = SampleArray.toString();
        var Alphabets = "abcdefghijklmnopqrstuvwxyz"
        var CharFreq = {};
        for(var i = 0; i < Alphabets.length; i++){
            var count = 0;
            for(var j = 0; j < SampleArray_2.length; j++) {
                if(SampleArray_2[j] == Alphabets[i]){
                    //console.log(SampleArray_2[i])
                    count++;
                    
                }
                //console.log("it works") 
            }
            
            CharFreq[Alphabets[i]] = count
           // console.log(Alphabets[i], count)
           // CharFreq.push({okkhor: Alphabets[i], freq: count})
           
           
            
        }
        console.log(CharFreq)
        //console.table(CharFreq)
        return CharFreq;
    }

    logic = ()=> {
        let letterscount = this.removeComma();
        //console.log("asdasa")
        //console.table(letterscount);

        //const entries = Object.entries(letterscount) 
        //console.log(entries)
        var letters = [];
        for(let [key, value] of Object.entries(letterscount)) {

            if(value != 0){
                letters.push([key, value])
                
            }
        }
        console.log(letters);
    }
    render() {
        
        //console.log("asaa")
        // var SampleArray = ["bhalo",
        // "apu" ,
        // "ma" ,
        // "khela", 
        // "bhai" ,
        // "biral" ,
        // "pani"  ,
        // "morich",
        // "alo" ,
        // "murgi", 
        // "goru" ,
        // "chagol"
        // ];

        // var SampleArray_2 = SampleArray.toString();


        return (
            <View>
                <Button title="Hello" onPress={()=>{this.logic()}}></Button>
                {/* <Text>{this.state.wordString}</Text>  */}
                {/* <Button title="Hello" onPress={()=>{this.converter()}}></Button>
                <Text>{this.state.wordString}</Text>  */}
            </View>
        );
    }
}