import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
} from 'react-native';

class TimerControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
        workTime: this.minFormat(this.props.workTime),
        pauseTime: this.minFormat(this.props.pauseTime),
      }
  }
  minFormat(seconds) {
    return Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0');
  }
  updateWorktime = (e) => {
    this.setState({workTime: e.target.value=="" ? "25": e.target.value});
    this.props.onTimeChange(this.state.workTime, this.state.pauseTime);
  };

  updatePausetime = (e) => {
    this.setState({pauseTime: e.target.value=="" ? "5": e.target.value});
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.textflow}>
          <Button style={styles.button}
            onPress={this.props.onToggle}
            title={this.props.startButtontitle}
          />
          
          <Button style={styles.button}
            onPress={this.props.reset}
            title="Reset"
          />
        </View>
        <View style={styles.textflow}>
          <Text style={styles.textLarge}>Work time: </Text>
          <TextInput 
            onChange={this.updateWorktime}
            style={styles.numericInput} 
            keyboardType='numeric'
            maxLength={2}
            onFocus={() => this.setState({workTime: ''})}
            value={this.state.workTime}
            />
          <Text style={styles.textLarge}> minutes</Text>
        </View>

        <View style={styles.textflow}>
          <Text style={styles.textLarge}>Pause time: </Text>
          <TextInput 
            onChange={this.updatePausetime}
            style={styles.numericInput} 
            keyboardType='numeric'
            onFocus={() => this.setState({pauseTime: ''})}
            maxLength={2}
            value={this.state.pauseTime}
            />
          <Text style={styles.textLarge}> minutes</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // row
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textflow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  textLarge: {
    fontSize: 30,
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
  },
  button: {
    flex:1,
    paddingRight: 20,
    marginBottom: 40,
    marginRight: 10,
  }
});

export default TimerControls;
