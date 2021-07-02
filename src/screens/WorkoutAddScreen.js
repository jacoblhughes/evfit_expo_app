import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
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
import { setExerciseLogAction } from "../actions/MyActions.js";
import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class WorkoutAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fetchExerciseLog = this.fetchExerciseLog.bind(this);
    this.state = { exercise: null };
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {}

  fetchExerciseLog = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/exerciselog/`, {
        method: "GET",
        headers: {
          // "Accept": "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: "Token " + this.props.enemies.token,
        },
      })
        .then((response) => {
          // console.log(response)
          return response.json();
        })
        .then((res) => {
          this.props.setExerciseLogAction(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  postExercise = () => {
    fetch(`${this.props.enemies.internet}/api/exerciselog/`, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        exercise_record: this.props.enemies.userNameKey,
        created: new Date(Date.now()),
        exercise: this.state.exercise,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        Promise.all(this.fetchExerciseLog());
        this.props.navigation.navigate("WorkoutLogSec");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>Type your workout below:</Text>
        </View>
        <View style={styles.buttonView}>
          <TextInput
            placeholder="Type here"
            value={this.state.exercise}
            onChangeText={(text) => this.setState({ exercise: text })}
            multiline = {true}
          ></TextInput>
        </View>
        <View style={styles.exerciseView}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              this.postExercise();
            }}
          >
            <View style={styles.button}>
              <Text style={styles.textAll}>Submit workout</Text>
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
  textView: {
    flex: 1,
    alignSelf: "center",
  },
  buttonView: {
    flex: 1,
  },
  exerciseView:{
  flex: 5,
  borderColor: '#000000',
  borderWidth: 1,
},
  post: {
    marginBottom: 10,
  },
  postMessageCreated: {
    marginBottom: 10,
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
      setExerciseLogAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutAddScreen);
