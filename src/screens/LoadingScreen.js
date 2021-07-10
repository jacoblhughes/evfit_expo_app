import React, { useRef, useEffect } from "react";
import {
  Animated,
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
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FadeInView style={styles.loading}>
          <Text style={styles.text}>Loading and/or Logging</Text>
        </FadeInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F3252",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 5,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 3,
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  loading: {
    width: 250,
    height: 50,
    backgroundColor: "#1F3252",
  },
  text: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
    color: '#FFFFFF'
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadingAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
