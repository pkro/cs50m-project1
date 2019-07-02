import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls'

export default function App() {
  return (
    <View style={styles.container}>
      <TimerDisplay minutes={25}/>
      <TimerControls onChanged=""/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 