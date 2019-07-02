import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {
  static propTypes = {
    minutes: PropTypes.number.isRequired,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timer}>
          {this.props.minutes}
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
    fontSize: 40,
  }
});

export default TimerDisplay;
