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
import { getHabitsAction } from "../actions/MyActions";
import { getPostsAction } from "../actions/MyActions.js";

import { bindActionCreators } from "redux";

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBlog = this.fetchBlog.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchHabits = this.fetchHabits.bind(this);
    this._retrieveAsyncStorageToken = this._retrieveAsyncStorageToken.bind(
      this
    );
    this.state = { ranRetrieveAsyncStorageToken: false };
  }
  componentDidUpdate(prevProps) {}

  componentDidMount() {
    this._retrieveAsyncStorageToken();
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }

  fetchBlog = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/blog_posts/`, {
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
          this.props.getRecentBlogAction(res);

        });
    } catch (error) {
      console.log(error);
    }
  };

  fetchHabits = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/habits/`, {
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
          this.props.getHabitsAction(res);

        });
    } catch (error) {
      console.log(error);
    }
  };

  fetchPosts = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/habit_posts/`, {
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
          this.props.getPostsAction(res);

        });
    } catch (error) {
      console.log(error);
    }
  };

  _retrieveAsyncStorageToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null && value !== "") {
        Promise.all[this.props.setTokenAction(value)];
        Promise.all[(this.fetchBlog(), this.fetchPosts(), this.fetchHabits())];
        this.props.loadingAction(false);

        this.props.navigation.replace("HomeSec");
      } else {
        this.props.setTokenAction(null);
        this.props.loadingAction(false);

        this.props.navigation.replace("HomeSec");
      }
    } catch (error) {
      // saving error
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../src/images/loading.png")}
        />
        <View style={styles.textView}>
          <Text style={styles.text}>Welcome!</Text>
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
  logo: {
    flex: 5,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  },
  buttonView: {
    flex: 3,
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  textView: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    flex: 1,
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
      getHabitsAction,
      getPostsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
