import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class TimerControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
        workTime: this.minFormat(this.props.workTime),
        pauseTime: this.minFormat(this.props.pauseTime),
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return Number(nextProps.workTime) > 0 && Number(nextProps.pauseTime) > 0
    return true;
  }

  minFormat(seconds) {
    return Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0');
  }

  updateWorktime = (minutes) => {
    this.props.onUpdateWorktime(minutes);
    this.setState({workTime: minutes});
  };

  updatePausetime = (minutes) => {
    this.props.onUpdatePausetime(minutes);
    this.setState({pauseTime: minutes});
  };

  reset(workTime, pauseTime) {
    this.setState(({
      workTime: this.minFormat(workTime),
      pauseTime: this.minFormat(pauseTime),
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.textflow}>
          <Text style={styles.textLarge}>Work time: </Text>
          <TextInput 
            onChangeText={this.updateWorktime}
            style={styles.numericInput} 
            keyboardType='numeric'
            maxLength={2}
            //onFocus={() => this.setState({workTime: ''})}
            value={this.state.workTime}
            />
          <Text style={styles.textLarge}> minutes</Text>
        </View>

        <View style={styles.textflow}>
          <Text style={styles.textLarge}>Pause time: </Text>
          <TextInput 
            onChangeText={this.updatePausetime}
            style={styles.numericInput} 
            keyboardType='numeric'
            //onFocus={() => this.setState({pauseTime: ''})}
            maxLength={2}
            value={this.state.pauseTime}
            />
          <Text style={styles.textLarge}> minutes</Text> 
        </View>

        <View style={styles.textflow}>
          <Button style={styles.button}
            onPress={this.props.onToggle}
            title={this.props.startButtontitle}
          />

          <View style={styles.spacer}></View>
        
          <Button style={styles.button}
            onPress={this.props.reset}
            title="Reset"
          />
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
    justifyContent: 'flex-start',
  },
  textflow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },

  textLarge: {
    fontSize: 30,
  },
  numericInput: {
    height: 50,
    width:70,
    fontSize:40,
    borderRadius: 10,  
    borderWidth: 2,  
    borderColor: '#009688',
    textAlign: 'center',
    marginBottom: 10  ,
    justifyContent: 'center',
  },
  spacer: {
    width: 40,
  },
});

export default TimerControls;
