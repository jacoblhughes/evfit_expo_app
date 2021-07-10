import React from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/MyActions.js";
import { loadingAction } from "../actions/MyActions.js";
import { authorizeAction } from "../actions/MyActions.js";
import { updateProfileInfoAction } from "../actions/MyActions.js";
import { logOutAction } from "../actions/MyActions.js";
import { checkLastPostAction } from "../actions/MyActions.js";
import { setHabitHistoryAction } from "../actions/MyActions.js";

import { bindActionCreators } from "redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./LoadingScreen";

class HabitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.submitYes = this.submitYes.bind(this);
    this.submitNo = this.submitNo.bind(this);
    this.habitCheck = this.habitCheck.bind(this);

  }

  submitYes = async () => {
    await fetch(`${this.props.enemies.internet}/api/habit_measurements/`, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        habit: this.props.enemies.userHabitKey,
        habit_record: this.props.enemies.userNameKey,
        reply: "Yes",
        created: new Date(
          new Date(Date.now()).getTime() - this.props.enemies.todayOffset
        ),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.habitCheck();
      });

  };

  submitNo = async () => {
    await fetch(`${this.props.enemies.internet}/api/habit_measurements/`, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        habit: this.props.enemies.userHabitKey,
        habit_record: this.props.enemies.userNameKey,
        reply: "No",
        created: new Date(
          new Date(Date.now()).getTime() - this.props.enemies.todayOffset
        ),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.habitCheck();
      });

  };

  habitCheck = async () => {
    await fetch(`${this.props.enemies.internet}/api/habit_measurements/`, {
      method: "GET",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {

        this.props.checkLastPostAction(res[0]["created"])
        this.props.setHabitHistoryAction(res);
        this.props.loadingAction(false);

      })
      .catch((error) => {
        console.log(error);
      });
  };




  componentDidMount() {
    this.props.authorizeAction(true);
    this.props.loadingAction(false);
    Promise.all[this.habitCheck()];
  }

  componentDidUpdate(prevProps) {
    if (this.props.enemies.auth == false) {
      this.props.navigation.replace("HomeSec");
    }
  }

  render() {
    if (this.props.enemies.loading) {
      return <LoadingScreen />;
    } else if (
      this.props.enemies.todayDate !== this.props.enemies.lastPostDate
    ) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../src/images/logo.png")}
          />

          <View style={styles.textView}>
            <Text style={styles.text}>
              Logged in as: {this.props.enemies.userName}
            </Text>
            <Text style={styles.text}>
              Your habit: {this.props.enemies.userHabit}
            </Text>
            <Text style={styles.text}>
              Your last logged day: {this.props.enemies.lastPostDate}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Text style={styles.text}>Please log your habit for the day!</Text>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.loadingAction(true);
                this.submitYes();
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Yes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.loadingAction(true);
                this.submitNo();
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>No</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.navigate("Habit History");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Habit History</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../src/images/logo.png")}
          />
          <View style={styles.textView}>
            <Text style={styles.text}>
              Logged in as: {this.props.enemies.userName}
            </Text>
            <Text style={styles.text}>
              Your habit: {this.props.enemies.userHabit}
            </Text>
            <Text style={styles.text}>
              Your last logged day: {this.props.enemies.lastPostDate}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Text style={styles.text}>
              Congratulations, you already logged!
            </Text>

            {/* <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Go Back</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.navigate("Habit History");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Habit History</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    flex: 1,
    width: null,
    // height: null,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  button: {
    flex: 1,
  },
  homeButton: {
    backgroundColor: "#1F3252",
    height: 40,
    justifyContent: "center",
  },
  textAll: {
    color: "#FFFFFF",
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTokenAction,
      loadingAction,
      authorizeAction,
      updateProfileInfoAction,
      logOutAction,
      checkLastPostAction,
      setHabitHistoryAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HabitScreen);
