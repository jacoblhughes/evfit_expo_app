import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";

class StopWatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchReset: false,
      stopwatchOn: false,
      stopwatchStart: 0,
      stopwatchTime: 0,
    };
    // this.toggleTimer = this.toggleTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {
    // console.log(this.state)
  }

  // toggleTimer() {
  //   this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  // }

  // resetTimer() {
  //   this.setState({ timerStart: false, timerReset: true });
  // }

  toggleStopwatch() {
    if (this.state.stopwatchOn == false && this.state.stopwatchTime == 0) {
      this.setState({
        stopwatchOn: !this.state.stopwatchOn,
        stopwatchReset: false,
        stopwatchTime: this.state.stopwatchTime,
        stopwatchStart: Date.now() - this.state.stopwatchTime,
      });

      this.timer = setInterval(() => {
        this.setState({
          stopwatchTime: Date.now() - this.state.stopwatchStart,
        });
      }, 10);
    } else if (
      this.state.stopwatchOn == false &&
      this.state.stopwatchTime != 0
    ) {
      this.setState({
        stopwatchOn: !this.state.stopwatchOn,
        stopwatchReset: false,
        stopwatchTime: this.state.stopwatchTime,
        stopwatchStart: Date.now() - this.state.stopwatchTime,
      });

      this.timer = setInterval(() => {
        this.setState({
          stopwatchTime: Date.now() - this.state.stopwatchStart,
        });
      }, 10);
    } else {
      this.setState({
        stopwatchOn: !this.state.stopwatchOn,
        stopwatchReset: false,
        stopwatchTime: this.state.stopwatchTime,
      });
      clearInterval(this.timer);
    }
  }

  resetStopwatch() {
    this.setState({
      stopwatchReset: true,
      stopwatchOn: false,
      stopwatchStart: 0,
      stopwatchTime: 0,
    });

    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.clockLayout}>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.stopwatchTime / 60000) % 60)).slice(
              -2
            )}
          </Text>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.stopwatchTime / 1000) % 60)).slice(
              -2
            )}
          </Text>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.stopwatchTime / 10) % 100)).slice(
              -2
            )}
          </Text>
        </View>
        <View style={styles.buttonLayout}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggleStopwatch}
          >
            <Text style={styles.buttonText}>
              {!this.state.stopwatchOn ? "Start" : "Stop"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.resetStopwatch}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#1F3252",
    alignItems: "center",
    height: 40,
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 30,
    color: "#FFF",
  },
  clockLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  numbers: {
    flex: 1,
    backgroundColor: "#1F3252",
    color: "#FFFFFF",
    margin: 10,
    height: "100%",
    alignSelf: "stretch",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 50,
  },
  buttonLayout: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(StopWatchScreen);
