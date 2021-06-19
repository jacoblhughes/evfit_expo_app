import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";

import { Stopwatch, Timer } from "react-native-stopwatch-timer";
class StopWatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {}

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true });
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View style={styles.container}>
        <Stopwatch
          laps
          msecs
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.toggleStopwatch}
        >
          <Text style={styles.buttonText}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableHighlight>

        <Timer
          totalDuration={this.state.totalDuration}
          msecs
          start={this.state.timerStart}
          reset={this.state.timerReset}
          options={options}
          handleFinish={handleTimerComplete}
          getTime={this.getFormattedTime}
        />
        <TouchableHighlight style={styles.button} onPress={this.toggleTimer}>
          <Text style={styles.buttonText}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    backgroundColor: '#AA4A2C',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    color: '#000000',
    marginLeft: 20,
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: '#FFFFFF'
  },
  button: {
    backgroundColor: "#1F3252",
    height: 40,
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(StopWatchScreen);
