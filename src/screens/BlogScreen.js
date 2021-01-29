import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/MyActions.js";
import { loadingAction } from "../actions/MyActions.js";
import { authorizeAction } from "../actions/MyActions.js";
import { updateProfileInfoAction } from "../actions/MyActions.js";
import { setUsernameAction } from "../actions/MyActions.js";
import { checkLastPostAction } from "../actions/MyActions.js";
import { getRecentBlogAction } from "../actions/MyActions.js";
import { setPasswordAction } from "../actions/MyActions.js";

import { bindActionCreators } from "redux";

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class BlogScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.auth && this.props.enemies.auth) {
    // }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postView}>
          <View style={styles.postTitle}>
            <Text>{this.props.route.params.postData.title}</Text>
          </View>
          <View style={styles.postBody}>
            <Text>{this.props.route.params.postData.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  postView: {
    flex: 1,
  },
  postTitle: {
    flex: 2,
    justifyContent:'space-around'
  },
  postBody: {
    flex: 8,
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BlogScreen);
