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
    // this.resetTimer = this.resetTimer.bind(this);
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Below are some workout templates (Weightlifting, HIIT)</Text>
        </View>
        <View style={styles.workoutTemplates}>
          <ScrollView>
            <View style={styles.workoutTemplatesInner}>
              <View style={styles.categoryView}>
                <Text style={styles.category}>Weighlifting</Text>
              </View>
              <View style={styles.subcategoryView}>
                <View style={styles.titleView}>
                  <Text>Template 1</Text>
                </View>
                <View style={styles.templateView}>
                  <Text>Pullups 3 x 5</Text>
                  <Text>Roman Dead Lifts 3 x 8</Text>
                  <Text>Back Squat 3 x 8</Text>
                  <Text>Shoulder Press 3 x 8</Text>
                  <Text>Bench Press 3 x 5</Text>
                  <Text>Bicep Curl 3 x 5</Text>
                  <Text>Row 3 x 5</Text>
                  <Text>Overhead Tricep Extension 3 x 5</Text>
                  <Text>Sit Ups 3 x 15</Text>
                </View>
                <View style={styles.notesView}>
                  <Text>
                    Start at 50% of your maximum adding 2.5-5lbs each week for
                    upper body exercises and 5-10lbs for lower body exercises. This will take 1-1.5 hours.
                  </Text>
                </View>
              </View>
              <View style={styles.subcategoryView}>
                <View style={styles.titleView}>
                  <Text>Template 2</Text>
                </View>
                <View style={styles.templateView}>
                  <Text>Front Squat 3 x 8</Text>
                  <Text>Back Squat 3 x 15</Text>
                  <Text>Shoulder Press 3 x 8</Text>
                  <Text>Bench Press 3 x 5</Text>
                  <Text>Row 3 x 5</Text>
                </View>
                <View style={styles.notesView}>
                  <Text>
                    This one really focuses on legs! Keep the squat weights
                    doable. Raise the backsquat weight more slowly than the
                    front squat. Start at 50% of your maximum adding 2.5-5lbs
                    each week for upper body exercises and 5-10lbs for lower
                    body exercises. This will take 1-1.5 hours. Take rest with the squats.
                  </Text>
                </View>
              </View>
              <View style={styles.categoryView}>
                <Text style={styles.category}>HIIT</Text>
              </View>
              <View style={styles.subcategoryView}>
                <View style={styles.titleView}>
                  <Text>Template 1</Text>
                </View>
                <View style={styles.templateView}>
                  <Text>20 Rounds:</Text>
                  <Text>5 Air Squats</Text>
                  <Text>5 Situps</Text>
                  <Text>5 Pushups</Text>
                </View>
                <View style={styles.notesView}>
                  <Text>Keep the squats deep!</Text>
                </View>
              </View>
              <View style={styles.subcategoryView}>
                <View style={styles.titleView}>
                  <Text>Template 2</Text>
                </View>
                <View style={styles.templateView}>
                  <Text>10 Rounds:</Text>
                  <Text>10 Burpess</Text>
                  <Text>20 Reverse Lunges (10 Each Side, in place)</Text>
                </View>
                <View style={styles.notesView}>
                  <Text>More burpees!</Text>
                </View>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'column',
  },
  titleView: {
    alignItems: 'center',
    paddingTop: 10,
  },
  templateView: {
    paddingLeft: 10,
  },
  notesView:{
    paddingLeft: 10,
    paddingTop: 10,
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(StopWatchScreen);
