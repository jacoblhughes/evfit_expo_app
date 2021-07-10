import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/MyActions.js";
import { loadingAction } from "../actions/MyActions.js";
import { authorizeAction } from "../actions/MyActions.js";
import { updateProfileInfoAction } from "../actions/MyActions.js";
import { setUsernameAction } from "../actions/MyActions.js";
import { checkLastPostAction } from "../actions/MyActions.js";
import { getRecentBlogAction } from "../actions/MyActions.js";
import { setPasswordAction } from "../actions/MyActions.js";
import { setEmailAction } from "../actions/MyActions.js";

import { getPostsAction } from "../actions/MyActions.js";
import { TouchableOpacity } from "react-native-gesture-handler";

import { bindActionCreators } from "redux";

import { setExpoAction } from "../actions/MyActions.js";
import { unsetExpoAction } from "../actions/MyActions.js";
import { getExpoAction } from "../actions/MyActions.js";

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class WorkoutLogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.exerciseList = this.exerciseList.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {}

  exerciseList = () => {
    if (this.props.enemies.exerciseLog.length === 0) {
      return (
        <View style={styles.post}>
          <Text style={styles.postMessageCreated}>No Logs Found</Text>
          <Text style={styles.postMessage}>
            Please use the below button to add a workout
          </Text>
        </View>
      );
    } else {
      return this.props.enemies.exerciseLog.map((item) => {
        let time = item.created;
        let time1 = time.split("T")[0];
        return (
          <View style={styles.post} key={item.id}>
            <Text style={styles.postMessageCreated}>{time1}</Text>
            <Text style={styles.postMessage}>{item.exercise}</Text>
          </View>
        );
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollView}>
          <ScrollView>{this.exerciseList()}</ScrollView>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              this.props.navigation.navigate("Workout Add");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.textAll}>Add a workout</Text>
            </View>
          </TouchableOpacity>
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
  buttonView: {
    flex: 1,
  },
  scrollView: {
    flex: 4,
    paddingTop: 20,
  },
  post: {
    marginBottom: 10,
  },
  postMessageCreated: {
    marginBottom: 10,
    marginLeft: 20,
  },
  postMessage: {
    marginLeft: 30,
  },
  button: {
    backgroundColor: "#1F3252",
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textAll: {
    color: "#FFFFFF",
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
      setUsernameAction,
      setPasswordAction,
      checkLastPostAction,
      getRecentBlogAction,
      getPostsAction,
      setEmailAction,
      setExpoAction,
      unsetExpoAction,
      getExpoAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLogScreen);
