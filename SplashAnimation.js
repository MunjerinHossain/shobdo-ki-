import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Easing
  } from 'react-native'
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  export default class SplashAnimation extends React.Component{
    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
      }
      componentDidMount () {
        this.spin()
        setTimeout(()=>{
            this.props.navigation.navigate('Home')
        },2000)
      }
      spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
          }
        ).start(() => this.spin())
      }
      render () {
        const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        return (
          <View style={styles.container}>
            <Animated.Image
              style={{
                width: 227,
                height: 200,
                transform: [{rotate: spin}] }}
                source={require('./Assets/Images/splash_icon.png')}
            />
          </View>
        )
      }
  }