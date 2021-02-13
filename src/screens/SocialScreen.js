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

class SocialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.socialList = this.socialList.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.state = { message: null };
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  componentDidUpdate(prevProps) {
    // if (!prevProps.enemies.getPosts && this.props.enemies.getPosts) {
    // }
  }

  componentDidMount() {
    this.fetchPosts();
    this.props.navigation.setOptions({
      title: this.props.route.params.postName,
    });
  }

  postMessage = () => {
    fetch(`${this.props.enemies.internet}/api/habit_posts/`, {
      method: "POST",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        user: this.props.enemies.userNameKey,
        created_at: new Date(this.props.enemies.date),
        message: this.state.message,
        message_html: "",
        habit: this.props.route.params.postId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  socialList = () => {
    return this.props.route.params.postData["posts"].map((item) => {
      let time = item.created_at;
      let time1 = time.split("T")[0];
      let time2 = time.split("T")[1];
      let time3 = time2.split(".")[0];

      return (
        <View style={styles.post} key={item.created_at}>
          <Text>{item.message}</Text>
          <Text>
            - {item.username} @ {time1}//{time3}
          </Text>
        </View>
      );
    });
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
          if (this.props.enemies.recentBlog !== null) {
            this.props.loadingAction(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.flex1} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.scrolls}>
            <ScrollView>{this.socialList()}</ScrollView>
          </View>
          <View style={styles.message_area}>
            <TextInput
              style={styles.text_input}
              placeholder="message"
              value={this.state.message}
              onChangeText={(text) => this.setState({ message: text })}
            ></TextInput>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.postMessage();
                this.setState({
                  message: "",
                });
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrolls: {
    flex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    borderWidth: 5,
    borderColor: "white",
  },
  post: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  text_input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    flex: 1,
  },
  message_area: {
    flex: 3,
    justifyContent: "space-around",
  },
  textAll: {
    color: "#FFFFFF",

  },
  homeButtonView: {
    flex: 1,
    justifyContent:'center',
    alignSelf:'center',
  },
  homeButton: {
    backgroundColor: "#1F3252",
    height: 40,
    justifyContent: "center",
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SocialScreen);
