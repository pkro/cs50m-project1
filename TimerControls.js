import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput } from 'react-native';

class TimerControls extends Component {
  // put numeric input in its own component?
  render() {
    return (
      <View style={styles.container}>
          <Text>Please enter unit work time in minutes:</Text>
        <TextInput 
            style={styles.numericInput} 
            keyboardType='numeric'
            maxLength={2}
            placeholder="00"
            onChangeText={(text)=> this.onChanged(text)}
            />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numericInput: {
    height: 50,
    fontSize:40,
    borderRadius: 10,  
    borderWidth: 2,  
    borderColor: '#009688',
    textAlign: 'center',
    marginBottom: 10  ,
    justifyContent: 'center',
  }
});

export default TimerControls;
