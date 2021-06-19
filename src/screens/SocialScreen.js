import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
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
// import { TouchableOpacity } from "react-native-gesture-handler";

import { bindActionCreators } from "redux";

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

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

  deletePost = (post_id) => {
    fetch(`${this.props.enemies.internet}/api/habit_posts/${post_id}/`, {
      method: "DELETE",
      headers: {
        // "Accept": "application/json",
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Token " + this.props.enemies.token,
      },
      body: JSON.stringify({
        // user: this.props.enemies.userNameKey,
        // created_at: new Date(this.props.enemies.date),
        // message: this.state.message,
        // message_html: "",
        id: post_id,
      }),
    })
      .then((response) => {
        // console.log(response)
        return response.text();
      })
      .then((res) => {
        console.log(res);
        this.fetchPosts();

        console.log("------------------");
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
      if (item.user == this.props.enemies.userNameKey) {
        return (
          <View style={styles.post} key={item.created_at}>
            <Text style={styles.postMessage}>{item.message}</Text>
            <Text>
              - {item.username} @ {time1}//{time3.slice(0, 5)}
            </Text>
            <View style={styles.deleteView}>
              <TouchableOpacity
                style={styles.deleteTouchable}
                onPress={() => {
                  this.deletePost(item.id);
                }}
              >
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.post} key={item.created_at}>
            <Text style={styles.postMessage}>{item.message}</Text>
            <Text>- {item.username} </Text>
            <Text>
              @ {time1}//{time3}
            </Text>
          </View>
        );
      }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "null"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        style={styles.container}
      >
        <View style={styles.social_area}>
          <ScrollView>{this.socialList()}</ScrollView>
        </View>

        <TextInput
          style={styles.text_input}
          placeholder="message"
          value={this.state.message}
          onChangeText={(text) => this.setState({ message: text })}
        ></TextInput>

        <TouchableOpacity
          style={styles.submitButtonTouchable}
          onPress={() => {
            this.postMessage();
            this.setState({
              message: "",
            });
          }}
        >
          <View
          // style={styles.submitButton}
          >
            <Text style={styles.textAll}>Submit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 5,
    borderColor: "white",
    // flexGrow:1,
    height: "100%",
  },
  post: {
    flex: 1,
    alignContent: "center",
    borderColor: "#1C3252",
    borderWidth: 1,
    padding: 10,
  },
  social_area: {
    flex: 6,
  },

  text_input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
  submitButtonTouchable: {
    flex: 1,
    backgroundColor: "#1F3252",
    justifyContent: "center",
  },
  textAll: {
    color: "#FFFFFF",
  },
  delete: {
    color: "red",
  },
  postMessage: {
    fontWeight: "bold",
  },
  deleteView: {
    alignItems: "flex-start",
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
