import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {
  static propTypes = {
    timeRemaining: PropTypes.number.isRequired,
  }

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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timer: {
    fontSize: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  work: {
    color: 'red',
  },
  pause: {
    color: 'orange',
  },
});

export default TimerDisplay;
