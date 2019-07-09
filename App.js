import React from 'react';
import { StyleSheet, Text, View, Alert, Vibration } from 'react-native';
import Constants from 'expo-constants';

import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls'

const DEBUG = true;

// ToDo: reset time in controls to defaults on reset

const defValues = {
  workTime: 25 * 60,
  pauseTime: 5 * 60,
  startButtonTitle: 'Start',
  pauseButtonTitle: 'Pause',
  resetButtonTitle: 'Reset',
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timerIsRunning: false,
      isWorkTime: true,
      startButtonTitle: defValues.startButtonTitle,
      pauseButtonTitle: defValues.pauseButtonTitle,
      resetButtonTitle: defValues.resetButtonTitle,
      timeRemaining: defValues.workTime,
      workTime: defValues.workTime,
      pauseTime: defValues.pauseTime,
    }
    this.iv = null;
  }
  
  toggleTimer() {
    let beforeClickTimerRunning = this.state.timerIsRunning;
    if( ! beforeClickTimerRunning) {
      this.iv = setInterval( (() => (this.countDown))(), DEBUG ? 100 : 1000);
    }
    else {
      clearInterval(this.iv);
    }
    

    this.setState(previousState => (
        { 
          timerIsRunning: !beforeClickTimerRunning,
          startButtonTitle: beforeClickTimerRunning ? defValues.startButtonTitle : defValues.pauseButtonTitle,
        }
    ));
  }
  
  countDown = () => {
    if(this.state.timeRemaining > 0) {
      this.setState(previousState => (
          { 
            timeRemaining: previousState.timeRemaining -1,
          }
      ));
    }
    else {
      Vibration.vibrate([500, 500, 500]);
      this.setState( previousState => (
        {
          timeRemaining: previousState.isWorkTime ? this.state.pauseTime : this.state.workTime,
          isWorkTime: ! previousState.isWorkTime,
        }
      ));
    }
  }

  reset() {
    this.setState(previousState => (
      { 
        timerIsRunning: false,
        startButtonTitle: defValues.startButtonTitle,
        timeRemaining: defValues.workTime,
        workTime: defValues.workTime,
        pauseTime: defValues.pauseTime,
        isWorkTime: true,
      }));

    if(this.iv) {
      clearInterval(this.iv);
    }
  }

  updateWorktime(minutes) {
    this.setState(previousState => ({
      workTime: Number(minutes) * 60,
      timeRemaining: this.state.isWorkTime ? Number(minutes) * 60 : previousState.timeRemaining,
    }));
  }

  updatePausetime(minutes) {
    this.setState(previousState => ({
      pauseTime: Number(minutes) * 60,
      timeRemaining: ! this.state.isWorkTime ? Number(minutes) * 60 : previousState.timeRemaining,
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <TimerDisplay timeRemaining={this.state.timeRemaining}/>
        
        <View
          style={{
            borderWidth: 1,
            borderColor:'black',
            marginBottom:20,
            width: '90%'
          }}
        />        
        
        <TimerControls
          startButtontitle={this.state.startButtonTitle}
          onUpdateWorktime={(minutes) => this.updateWorktime(minutes)}
          onUpdatePausetime={(minutes) => this.updatePausetime(minutes)}
          workTime={this.state.workTime}
          pauseTime={this.state.pauseTime}
          onToggle={() => this.toggleTimer()}
          reset={() => this.reset()}
          /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
 