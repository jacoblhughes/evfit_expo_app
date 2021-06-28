import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// fireNotification = async () => {
    
//   await Notifications.cancelAllScheduledNotificationsAsync();

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "CountdownTimer! 📬",
//       body: 'Countdown Timer',
//     }
//   });
// };

class CountdownTimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdownReset: false,
      countdownOn: false,
      countdownStart: 0,
      countdownTime: 0,
      countdownMinutes: 0,
      countdownSeconds: 0,
      countdownMillis: 0,
      countdownBegan: false,
    };
    // this.toggleTimer = this.toggleTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
    this.toggleCountdown = this.toggleCountdown.bind(this);
    this.resetCountdown = this.resetCountdown.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidUpdate() {
    if (this.state.countdownTime < 0 && this.state.countdownBegan == true) {
          this.setState({
      countdownReset: true,
      countdownOn: false,
      countdownStart: 0,
      countdownTime: 0,
      countdownBegan: false
    });

    clearInterval(this.timer);
    }
  }

  componentDidMount() {
  }

  // toggleTimer() {
  //   this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  // }

  setTimer() {
    let tempNum = (this.state.countdownMinutes * 60000) + (this.state.countdownSeconds * 1000) + (this.state.countdownMillis);
    this.setState({ countdownTime: tempNum, countdownBegan: true});
  }

  toggleCountdown() {
    if (this.state.countdownOn == false && this.state.countdownTime !== 0) {
      this.setState({
        countdownOn: !this.state.countdownOn,
        countdownReset: false,
        countdownTime: this.state.countdownTime,
        countdownStart: Date.now() + this.state.countdownTime,
      });

      this.timer = setInterval(() => {
        this.setState({
          countdownTime: -1 *(Date.now() - this.state.countdownStart),
        });
      }, 10);
    } else {
      this.setState({
        countdownOn: !this.state.countdownOn,
        countdownReset: false,
        countdownTime: this.state.countdownTime,
      });
      clearInterval(this.timer);
    }
  }

  resetCountdown() {
    this.setState({
      countdownReset: true,
      countdownOn: false,
      countdownStart: 0,
      countdownTime: 0,
      countdownBegan: false
    });

    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.setTimeLayout}>
          <TextInput
            style={styles.numbers}
            placeholderTextColor="#FFFFFF"
            placeholder="MM"
            keyboardType="numeric"
            returnKeyType='done'
            onChangeText={(number) =>
              this.setState({ countdownMinutes: number })
            }
          />
          <TextInput
            style={styles.numbers}
            placeholderTextColor="#FFFFFF"
            placeholder="SS"
            keyboardType="numeric"
            returnKeyType='done'
            onChangeText={(number) =>
              this.setState({ countdownSeconds: number })
            }
          />

          <TextInput
            style={styles.numbers}
            placeholderTextColor="#FFFFFF"
            placeholder="mm"
            keyboardType="numeric"
            returnKeyType='done'
            onChangeText={(number) =>
              this.setState({ countdownMillis: number })
            }
          />
        </View>
        <View style={styles.textLayout}>
          <Text style={styles.descText}>Minutes</Text>
          <Text style={styles.descText}>Seconds</Text>
          <Text style={styles.descText}>Milliseconds</Text>
        </View>
        <View style={styles.clockLayout}>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.countdownTime / 60000) % 60)).slice(
              -2
            )}
          </Text>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.countdownTime / 1000) % 60)).slice(
              -2
            )}
          </Text>
          <Text style={styles.numbers}>
            {("0" + (Math.floor(this.state.countdownTime / 10) % 100)).slice(
              -2
            )}
          </Text>
        </View>
        <View style={styles.buttonLayout}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.setTimer}
          >
            <Text style={styles.buttonText}>Set Timer</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.toggleCountdown}
          >
            <Text style={styles.buttonText}>
              {!this.state.countdownOn ? "Start" : "Pause"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.resetCountdown}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#1F3252",
    alignItems: "center",
    height: 40,
    justifyContent: "space-evenly",
  },

  clockLayout: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  numbers: {
    flex: 1,
    backgroundColor: "#1F3252",
    color: "#FFFFFF",
    margin: 10,
    textAlign: "center",
    fontSize: 50,
  },
  buttonLayout: {
    flex: 3,
    padding: 10,
    margin: 10,
  },
  textLayout: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
    textAlign: 'center',
  },
  setTimeLayout: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(CountdownTimerScreen);
