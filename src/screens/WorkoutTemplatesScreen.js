import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";

class StopWatchScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.toggleTimer = this.toggleTimer.bind(this);
    this.workoutList = this.workoutList.bind(this);
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

  workoutList = () => {
    return this.props.enemies.workoutTemplates.map((item) => {

      return (
        <View style={styles.subcategoryView}>
          <View style={styles.titleView}>
            <Text>{item.category}</Text>

            <Text>{item.title}</Text>
          </View>
          <View style={styles.templateView}>
            <Text>{item.template}</Text>
          </View>
          <View style={styles.notesView}>
            <Text>{item.notes}</Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Below are some workout templates</Text>
        </View>
        <View style={styles.workoutTemplates}>
          <ScrollView>
            <View style={styles.workoutTemplatesInner}>
              {this.workoutList()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  workoutTemplates: {
    flex: 11,
  },
  workoutTemplatesInner: {
    flex: 1,
  },
  categoryView: {
    alignItems: "center",
    paddingTop: 10,
  },
  category: {
    fontSize: 20,
  },
  subcategoryView: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column",
  },
  titleView: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  templateView: {
    paddingLeft: 10,
  },
  notesView: {
    paddingLeft: 10,
    paddingTop: 10,
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(StopWatchScreen);
