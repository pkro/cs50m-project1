import React from 'react';
import { StyleSheet, Text, View, Alert, Vibration } from 'react-native';
import Constants from 'expo-constants';

import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls'

/*
Applogic:
press start ->
  - button text = "pause"
  - currentMode = running
  - startTime = time.now
  - if [worktime control value] > timeRemaining
      endTime = startTime - [worktime control value]*60*1000
    else
      endTime = startTime - timeRemaining
  - displayTime = starttime - time.now 
  - interval = setIntervall ({
      if time.now > endTime:
        displayTime = starttime - time.now 
      else
        vibrate
        toggle time remaining font color to pause color
        startTime = time.now
        endTime = startTime - [pausetime control value]*60*1000
    }, 1000)
press pause ->
    - button text = "start"
    - currentMode = paused
    - interval = null
change worktime:
 - set pause state
 - update worktime (also displayed time) as i type
*/
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
    // https://facebook.github.io/react-native/docs/state
    this.setState(previousState => (
        { 
          timerIsRunning: !previousState.timerIsRunning,
          startButtonTitle: this.state.timerIsRunning ? "pause" : "start",
        }
    ));
  
    if(this.state.timerIsRunning) {
      this.iv = setInterval( (() => (this.countDown))(), 1000);
    }
    else {
      clearInterval(this.iv);
      Vibration.vibrate([500, 500, 500]);
    }
  }
  
  countDown = () => {
    if(this.state.timeRemaining > 0) {
      this.setState(previousState => (
          { 
            timeRemaining: previousState.timeRemaining -1,
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
        //workTime: defValues.workTime,
        //pauseTime: defValues.pauseTime,
        isWorkTime: true,
      }));

    if(this.iv) {
      clearInterval(this.iv);
    }
  }

  updateTimers(work, pause) {
    Alert.alert(`Updatetimers: ${work} ${pause}`);
    this.setState(previousState => ({
      workTime: work,
      pauseTime: pause,
      timeRemaining: isWorkTime ? work : pause,
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
          workTime={this.state.workTime}
          pauseTime={this.state.pauseTime}
          onToggle={() => this.toggleTimer()}
          reset={() => this.reset()}
          onTimeChange={() => this.updateTimers}
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
 