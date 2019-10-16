import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback,View, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import styles from './styles';
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

export default class Reaction extends Component {
    constructor(props) {
        super(props);

        this.animatedValue = new Animated.Value(1);
        this.animatedMargin = new Animated.Value(0);
    }

    componentDidMount() {
        this.animation.play();
    }

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

    onPressIn = () => {
        Animated.spring(this.animatedValue, {
            toValue: 2
        }).start();
        Animated.spring(this.animatedMargin, {
            toValue: 16
        }).start();
    };

    onPressOut = () => {
        Animated.spring(this.animatedValue, {
            toValue: 1
        }).start();
        Animated.spring(this.animatedMargin, {
            toValue: 0
        }).start();
    };

    render() {
        const { type } = this.props;
        const animatedStyle = {
            transform: [{ scale: this.animatedValue }],
            paddingBottom: this.animatedMargin
        };
        return (
            <View style={styles.card}>
            <TouchableWithoutFeedback
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <Animated.View style={[styles.reactView, animatedStyle]}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.reaction}
                        source={require('../Assets/Reaction/laugh.json')}
                    />
                </Animated.View>


                
            </TouchableWithoutFeedback>
            
                <FlatList
                    data={this.types}
                    horizontal
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key}
                    bounces={false}
                    style={styles.list}
                />
            </View>


        );
    }
}

Reaction.propTypes = {
    type: PropTypes.string,
    index: PropTypes.number
};