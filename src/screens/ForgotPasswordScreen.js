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

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import RootTagContext from "react-native/Libraries/ReactNative/RootTagContext";

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.submitEmail = this.submitEmail.bind(this);
    this.state = { submitted: false };
  }
  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {}

  submitEmail = () => {
    fetch(`${this.props.enemies.internet}/rest-auth/password/reset/`, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        // Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        email: this.props.enemies.setEmail,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.setState({ submitted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.submitted == false) {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
          </View>
          <View style={styles.buttonView}>
            <TextInput
              style={styles.email}
              placeholder="Email"
              onChangeText={(text) => this.props.setEmailAction(text)}
            />

            <Button
              style={styles.button}
              title="Submit Email"
              onPress={() => {
                this.submitEmail();
              }}
            />
            <Button
              style={styles.button}
              title="Console"
              onPress={() => {
                console.log(this.state);
              }}
            />
          </View>
        </View>
      );
    } else if (this.state.submitted == true) {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
          </View>
          <View style={styles.buttonView}>
            <Text>
              If this email exists in the system you will receieve an email
              shortly.
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
  },
  logoView: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 1,
    alignItems: "center",
  },
  email: {
    width: 200,
    borderColor: "black",
    borderWidth: 1,
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
