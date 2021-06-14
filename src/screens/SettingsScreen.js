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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import RootTagContext from "react-native/Libraries/ReactNative/RootTagContext";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// import Loading from "../components/Loading";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.registerForPushNotificationsAsync =
      this.registerForPushNotificationsAsync.bind(this);
    this.unregisterForPushNotificationsAsync =
      this.unregisterForPushNotificationsAsync.bind(this);
    this.postExpoToken = this.postExpoToken.bind(this);
    this.getExpoToken = this.getExpoToken.bind(this);
  }
  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  postExpoToken = () => {
    fetch(`${this.props.enemies.internet}/api/expo/${this.props.enemies.setExpoId}/`, {
      method: "PATCH",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        // id: this.props.enemies.setExpoId,
        // expo_user: this.props.enemies.userNameKey,
        expoToken: this.props.enemies.setExpo,
        expoAccepted: this.props.enemies.setExpoAccepted,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // console.log('------')
        // console.log(res);
        // console.log('---------------');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getExpoToken = async () => {
    // console.log(this.props.enemies)

    try {
      await fetch(`${this.props.enemies.internet}/api/expo/`, {
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
          // console.log(res);
          this.props.setExpoAction(res[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  registerForPushNotificationsAsync = async () => {
    console.log("settings here");
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token)
      await this.props.getExpoAction(token);
      await this.postExpoToken();
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Work That Habit! 📬",
        body: 'Log your progress',
      },
      trigger: { 
        hour:18,
        minute: 0,
        repeats: true,
        },
    });
  };

  unregisterForPushNotificationsAsync = async () => {
    console.log("unsettings here");

    await Notifications.cancelAllScheduledNotificationsAsync();
    await this.props.unsetExpoAction();
    this.postExpoToken();
  };

  componentDidMount() {
    this.getExpoToken();
  }

  render() {
    if (this.props.enemies.setExpo === null) {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
            <Text>SETTINGS</Text>
          </View>

          <View style={styles.buttonView}>
            <Text>Logged in as: {this.props.enemies.userName}</Text>
            <TouchableOpacity
              style={styles.unregistered}
              onPress={() => {
                this.registerForPushNotificationsAsync();
              }}
            >
              <View>
                <Text style={styles.textAll}>Accept Notifications at 6:00 PM</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
          </View>

          <View style={styles.buttonView}>
            {/* <Text>Logged in as: {this.props.enemies.userName}</Text> */}
            <TouchableOpacity
              style={styles.registered}
              onPress={() => {
                this.unregisterForPushNotificationsAsync();
              }}
            >
              <View>
                <Text style={styles.textAll}>Decline Notifications at 6:00 PM</Text>
              </View>
            </TouchableOpacity>
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
  registered: {
    backgroundColor: "red",
    borderRadius: 5,
    margin: 5,
    padding: 5,

  },
  unregistered: {
    backgroundColor: "lightgreen",
    borderRadius: 5,
    margin: 5,
    padding: 5,

    
  },
  textAll:{
    fontSize: 20,
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
