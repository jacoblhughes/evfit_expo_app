import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class StopWatchScreen extends React.Component {
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
              this.props.navigation.navigate("StopWatchScreen");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.textAll}>Start/Stop</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(StopWatchScreen);
