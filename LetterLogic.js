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

    removeComma =()=> {
        var SampleArray_2 = SampleArray.toString();
        var Alphabets = "abcdefghijklmnopqrstuvwxyz"
         var CharFreq = [];
        for(var i = 0; i < Alphabets.length; i++){
            var count = 0;
            for(var j = 0; j < SampleArray_2.length; j++) {
                if(SampleArray_2[j] == Alphabets[i]){
                    //console.log(SampleArray_2[i])
                    count++;
                    
                }
                //console.log("it works") 
            }
            //console.log(Alphabets[i], count)
            CharFreq.push({okkhor: Alphabets[i], freq: count})
            
        }
        console.table(CharFreq)
        this.logic(CharFreq)
    }

    logic = (CharFreq)=> {
        
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
                <Button title="Hello" onPress={()=>{this.removeComma()}}></Button>
                {/* <Text>{this.state.wordString}</Text>  */}
                {/* <Button title="Hello" onPress={()=>{this.converter()}}></Button>
                <Text>{this.state.wordString}</Text>  */}
            </View>
        );
    }
}