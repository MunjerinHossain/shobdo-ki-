import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
 export default class GameboardScreen extends Component {
  render() {
const items = [
      { name: 'A' }, { name: 'B' },
      { name: 'C' }, { name: 'D' },
      { name: 'E' }, { name: 'F' },
      { name: 'G' }, { name: 'H' },
      { name: 'I' }, { name: 'J' },
      { name: 'K' }, { name: 'L' },
      { name: 'M' }, { name: 'N' },
      { name: 'O' }, { name: 'P' },
      { name: 'Q' }, { name: 'R' },
      { name: 'S' }, { name: 'T' },
      { name: 'U' },{ name: 'V' },
      { name: 'W' },{ name: 'X' },
      
    ];
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.text}></Text>
      </View>
       <FlatGrid
        itemDimension={65}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
         //fixed
        //spacing={10}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
      />
      </>
    );
  }
 }
 
const styles = StyleSheet.create({

  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    alignItems: 'center', height: 50, width: "50%", 
    borderColor: 'red', borderWidth: 2, marginTop: 40,
    marginBottom: 30 ,textAlign:'center',padding: 10,
  },     

  gridView: {
    
    flex: 1,
    
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 1,
    height: 67,
    
  },
  itemName: {
    fontSize: 20,
    
    color: 'black',
    fontWeight: '600',
    borderColor: 'black',
    borderWidth: 1,
    maxHeight: 100,
    maxWidth: 100,
    textAlign: 'center',
  
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  
  },
});
 