import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/MyActions.js";
import { loadingAction } from "../actions/MyActions.js";
import { authorizeAction } from "../actions/MyActions.js";
import { updateProfileInfoAction } from "../actions/MyActions.js";
import { logOutAction } from "../actions/MyActions.js";
import { checkLastPostAction } from "../actions/MyActions.js";

import { bindActionCreators } from "redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./LoadingScreen";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

class HabitHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  habitList = () => {
    return this.props.enemies.habitHistory.map((item) => {
      let time = item.created;
      let time1 = time.split("T")[0];
      let time2 = time.split("T")[1];
      let time3 = time2.split(".")[0];

      for (let i = 0; i < this.props.enemies.getHabits.length; i++) {
        if (item.habit == this.props.enemies.getHabits[i]["id"]) {
          item.habit = this.props.enemies.getHabits[i]["name"];
        }
      }

      return (
        <View style={styles.post} key={item.id}>
          <Text style={styles.postMessage}>{item.reply}</Text>
          <Text style={styles.postMessage}>{item.habit}</Text>
          <Text style={styles.postMessage}>{time1}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>Habit History</Text>
          <ScrollView>{this.habitList()}</ScrollView>
        </View>
      </View>
    );
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
  post: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HabitHistoryScreen);
