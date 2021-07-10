import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HabitHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GBP: 0,
      GBPPercent: 0,
      GBPDenominator: 0,
      twoWeeks:
        new Date(
          new Date(Date.now() - this.props.enemies.todayOffset)
        ).getTime() -
        86400000 * 14,
    };
    this.goodBoyPoints = this.goodBoyPoints.bind(this);
    this.habitList = this.habitList.bind(this);
  }

  goodBoyPoints = () => {
    this.props.enemies.habitHistory.map((item) => {
      let time = item.created;
      let time1 = time.split("T")[0];

      if (
        item.habit == this.props.enemies.userHabitKey &&
        new Date(time1).getTime() > this.state.twoWeeks &&
        item.reply == "Yes"
      ) {
        this.setState({
          GBP: this.state.GBP++,
        });
      }
    });

    this.setState({
      GBP: this.state.GBP,
    });
    this.setState({
      GBPPercent: this.state.GBP / 14,
    });
  };

  habitList = () => {
    let i = 1
    return this.props.enemies.habitHistory.map((item) => {
      let time = item.created;
      let time1 = time.split("T")[0];

      return (
        <View style={styles.post} key={item.id}>
          <Text style={styles.postMessage}>{time1}</Text>
          <Text style={styles.postMessage}>{item.reply}</Text>
          <Text style={styles.postMessage}>{item.habit_name}</Text>
        </View>
      );
    });
  };

  componentDidMount() {
    this.goodBoyPoints();
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            Current Habit: {this.props.enemies.userHabit}
          </Text>
          <Text style={styles.text}>Past Two Weeks: {this.state.GBP}/14</Text>
          <Text style={styles.text}>{this.state.GBPPercent.toFixed(2)*100} %</Text>
        </View>
        <View style={styles.chartView}>
          <ProgressChart
            data={[this.state.GBPPercent]}
            width={screenWidth}
            height={300}
            strokeWidth={20}
            radius={75}
            chartConfig={{
              backgroundColor: "#1F3252",
              backgroundGradientFrom: "#1F3252",
              backgroundGradientTo: "#1F3252",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            hideLegend={true}
          />
        </View>
        <View>
          <Text style={styles.text}>30 Most Recent Submissions</Text>
        </View>
        <View style={styles.scrollView}>
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
  textView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  chartView: {
    flex: 3,
    backgroundColor: "#1F3252",
  },
  scrollView: {
    flex: 3,
  },
  button: {
    flex: 1,
  },
  homeButton: {
    backgroundColor: "#1F3252",
    height: 40,
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
  },
  post: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  postMessage: {},
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
