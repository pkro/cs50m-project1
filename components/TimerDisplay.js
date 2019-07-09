import React, { Component } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {
  
  render() {
    let time = this.props.timeRemaining;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    
    return (
      <View style={styles.container}>
        <Text style={[styles.timer, styles.work]}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </Text>
      </View> 
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  timer: {
    fontSize: 100,
  },
  work: {
    color: 'red',
  },
  pause: {
    color: 'orange',
  },
});

export default TimerDisplay;
