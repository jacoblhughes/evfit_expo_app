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

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";


// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class ToolsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              this.props.navigation.navigate("Log Workout");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.textAll}>Stop Watch Timer</Text>
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
    justifyContent: "space-evenly",
  },
  buttonView: {
    flex: 4,
    width: 200,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1F3252",
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around'
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolsScreen);
