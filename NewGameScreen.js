import * as React from 'react';
import { Button, View, Text,StyleSheet, Alert, TouchableOpacity,AsyncStorage } from 'react-native';


export default class NewGameScreen extends React.Component {
 
    state = {total: 0}
  

componentDidMount() {

   this.getPoint()

  }


  getPoint = async()=> {
    try {

      let storePoint = await AsyncStorage.getItem('score')
      console.log("storePoint" + storePoint)
      if (storePoint != null) {
        console.log('getScore' + JSON.parse(JSON.stringify(storePoint)))
       
        this.setState({total:storePoint })

      }

    } catch (error) {
      console.log("Something went wrong", error);
    }
   }
  
  
  render() {
    return (

      
      <View style={ styles.container}>

        <View>
          <Text style={styles.home}>Total Points: {this.state.total}</Text>
        </View>
       <View>
       <Text>
          {this.state.total}
         
          </Text> 
        
       </View>
      
        

    <View style={{width:"25%",right:10}}>

  <Button
          title="Start"
           onPress={() => this.props.navigation.navigate('Gameboard',{update:this.getPoint})}
        color="blue"
        width="50%"
        />
</View>
                        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
