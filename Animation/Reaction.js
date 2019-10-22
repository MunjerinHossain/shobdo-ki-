// import React, { Component } from 'react';
// import {StyleSheet, Text, View,  SafeAreaView,TouchableOpacity } from "react-native";
// import * as Animatable from "react-native-animatable";
// import LottieView from 'lottie-react-native';

// export default class Reaction extends Component{
    
//     render(){
//         return(
//             <SafeAreaView style={styles.container}>
//             <View style={{ alignItems: "center" }}>
//             <TouchableOpacity style={styles.btn} onPress={this._startAnimation}>
//             <Text style={styles.textBtn}>Start animation</Text>
//           </TouchableOpacity>
//           <View style={{alignItems:"center"}}>   
//                  <Animatable.View style={styles.card} animation="slideInDown" iterationCount= "5" direction="alternate">
          
//           <LottieView
//              source={require('../Assets/Reaction/laugh.json')}
//              loop
//              autoPlay
//             />
            
//           </Animatable.View>
//           </View>

//         </View>
        
//             </SafeAreaView>
            
           
//         );
       
//     }
    
// }
// const styles = StyleSheet.create({  
//     container: {    flex: 1,    
//         justifyContent: 'center',   
//         alignItems: 'center',    
//         backgroundColor: '#F5FCFF',
    
//     },
//     card:{
//      width:200,
//      height:200,
     
//     },
//     whiteText:{
// textAlign:'center',
// color:'white',
//     },
//     btn:{
//         backgroundColor:'red',
        

//   color: 'red',
//   padding: 10,
//   textAlign:'center',
  
//     }
// })


 import React, { Component } from 'react';
 import { StyleSheet, View, Button } from 'react-native'; 
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
 export default class Reaction extends Component { 
        
            state = { slideInDown: false }; 
          
          
     handlePress = () => {   
               setTimeout(() => {   
                      this.setState(

                          {                           slideInDown: true
      
                               });    }, ); 
                          };
                          render() {    
                             const { slideInDown } = this.state;
                          return (    
                                   <View style={styles.container}>     
                                   <Button title="press" onPress={this.handlePress} />       

       <Animatable.View   style={styles.card} animation={this.state.slideInDown ? "slideInDown" : null} iterationCount= "5" direction="alternate">
         <LottieView
                       source={require('../Assets/Reaction/laugh.json')}
                     />
                   </Animatable.View>  
                                      </View>   
                                       ); 
                                     }}
                             const styles = StyleSheet.create({  
                                 container: {    flex: 1,    
                                     justifyContent: 'center',   
                                     alignItems: 'center',    
                                     backgroundColor: '#F5FCFF',
                                 },
                                 lottie: {   
                                      width: 100,    
                                    height: 100, 
                                 },
                                 card:{
                                          width:200,
                                          height:200,
                                         
                                         }
                                });


// import { Animated, TouchableWithoutFeedback,View, FlatList } from 'react-native';
// import LottieView from 'lottie-react-native';
// import PropTypes from 'prop-types';
// import styles from './styles';
//import { Card } from 'react-native-paper';

// export default class Reaction extends Component{
//     componentDidMount(){
//         this.animation.play();
//     }
//     render(){
//         return(
// <LottieView
//     ref={animation =>{
//         this.animation=animation;
//     }}
//    // style={styles.reaction}
//     source={require('../Assets/Reaction/7194-smile.json')}
//  />
//         );
//     }
// }

// export default class Reaction extends Component {
//     constructor(props) {
//         super(props);

//         this.animatedValue = new Animated.Value(1);
//         this.animatedMargin = new Animated.Value(0);
//     }

//     componentDidMount() {
//         this.animation.play();
//     }

    // getReactionJson = type => {
    //     switch (type) {
    //     case 'Angry':
    //         return require('../../assets/animations/angry_emoji.json');
    //     case 'Laugh':
    //         return require('../../assets/animations/laugh.json');
    //     case 'Wow':
    //         return require('../../assets/animations/wow.json');
    //     }
    // };

//     onPressIn = () => {
//         Animated.spring(this.animatedValue, {
//             toValue: 2
//         }).start();
//         Animated.spring(this.animatedMargin, {
//             toValue: 16
//         }).start();
//     };

//     onPressOut = () => {
//         Animated.spring(this.animatedValue, {
//             toValue: 1
//         }).start();
//         Animated.spring(this.animatedMargin, {
//             toValue: 0
//         }).start();
//     };

//     render() {
//         const { type } = this.props;
//         const animatedStyle = {
//             transform: [{ scale: this.animatedValue }],
//             paddingBottom: this.animatedMargin
//         };
//         return (
//             <View style={styles.card}>
//             <TouchableWithoutFeedback
//                 onPressIn={this.onPressIn}
//                 onPressOut={this.onPressOut}
//             >
//                 <Animated.View style={[styles.reactView, animatedStyle]}>
//                     <LottieView
//                         ref={animation => {
//                             this.animation = animation;
//                         }}
//                         style={styles.reaction}
//                         source={require('../Assets/Reaction/laugh.json')}
//                     />
//                 </Animated.View>


                
//             </TouchableWithoutFeedback>
            
//                 <FlatList
//                     data={this.types}
//                     horizontal
//                     renderItem={this.renderItem}
//                     keyExtractor={item => item.key}
//                     bounces={false}
//                     style={styles.list}
//                 />
//             </View>


//         );
//     }
// }

// Reaction.propTypes = {
//     type: PropTypes.string,
//     index: PropTypes.number
// };