import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/MyActions.js";
import { loadingAction } from "../actions/MyActions.js";
import { authorizeAction } from "../actions/MyActions.js";
import { updateProfileInfoAction } from "../actions/MyActions.js";
import { setUsernameAction } from "../actions/MyActions.js";
import { checkLastPostAction } from "../actions/MyActions.js";

import { setPasswordAction } from "../actions/MyActions.js";
import { getRecentBlogAction } from "../actions/MyActions.js";
import { getPostsAction } from "../actions/MyActions.js";
import { logOutAction } from "../actions/MyActions.js";
import { getHabitsAction } from "../actions/MyActions";

import { bindActionCreators } from "redux";

import PasswordInputText from "react-native-hide-show-password-input";

import { LogBox } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "../components/Loading";
import Login from "../components/Login";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackHandler } from "react-native";

//TO DO
// Fix dates on django end to be ISO format where possible automatically
// SecureStorage
// be able to submit a comment via the app

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProfile = this.fetchProfile.bind(this);
    this.retrieveToken = this.retrieveToken.bind(this);
    this.habitCheck = this.habitCheck.bind(this);
    this._storeAsyncStorageToken = this._storeAsyncStorageToken.bind(this);
    this._storeAsyncStorageTokenandLogout = this._storeAsyncStorageTokenandLogout.bind(
      this
    );
    this.blogList = this.blogList.bind(this);
    this.fetchBlog = this.fetchBlog.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    // this.postList = this.postList.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.fetchHabits = this.fetchHabits.bind(this);
  }
  componentDidUpdate(prevProps) {
    // console.log("thisipdated");
    // if (
    //   this.props.enemies.getPosts !== null &&
    //   this.props.enemies.recentBlog !== null &&
    //   this.props.enemies.getHabits !== null
    // ) {
    //   console.log("thisworkd");
    //   this.props.loadingAction(false);
    // }
  }

  componentDidMount() {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }
  _storeAsyncStorageTokenandLogout = async (value) => {
    try {
      await AsyncStorage.removeItem("@token");
    } catch (error) {
      // saving error
      console.log(error);
    }
    this.props.logOutAction();
  };

  _storeAsyncStorageToken = async (value) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (error) {
      // saving error
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
          // if (this.props.enemies.recentBlog !== null) {
          //   this.props.loadingAction(false);
          // }
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
          // if (this.props.enemies.getPosts !== null) {
          //   this.props.loadingAction(false);
          // }
        });
    } catch (error) {
      console.log(error);
    }
  };

  habitList = () => {
    let post_array = [];
    let habit_array = [];
    let temp_array = [];

    this.props.enemies.getHabits.map((item) => {
      let newObj = item;
      newObj["posts"] = [];

      this.props.enemies.getPosts.map((zitem) => {
        if (item.id == zitem.habit) {
          newObj["posts"].push(zitem);
        }
      });
      temp_array.push(newObj);
    });
    return temp_array.map((item) => {
      console.log();
      return (
        <View style={styles.buttonView} key={item.id}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Social", {
                postData: item,
                postId: item.id,
                postName: item.name,
              });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    console.log(temp_array);
  };

  retrieveToken = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/rest-auth/login/`, {
        method: "POST",
        headers: {
          // "Accept": "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest',
          // 'X-CSRFToken': 'csrftoken'
        },
        body: JSON.stringify({
          username: this.props.enemies.inputUsername,
          password: this.props.enemies.inputPassword,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            this.props.navigation.replace("HomeSec");
          }
        })
        .then((res) => {

          // this.props.updateProfileInfoAction(res[0]);
          // this.props.authorizeAction(true);

          // this.props.navigation.replace("Dashboard");
          this.props.setTokenAction(res["key"]);
          Promise.all[
            (this._storeAsyncStorageToken(res["key"]),
            this.fetchProfile(),
            this.habitCheck(),
            this.fetchPosts(),
            this.fetchBlog(),
            this.fetchHabits())
          ];
          this.props.loadingAction(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          // if (this.props.enemies.getPosts !== null) {
          //   this.props.loadingAction(false);
          // }
        });
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/profile/`, {
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
          this.props.updateProfileInfoAction(res[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  habitCheck = () => {
    fetch(`${this.props.enemies.internet}/api/habit_measurements/`, {
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
        for (let i = 0; i < res.length; i++) {
          if (res[i]["habit_record"] === this.props.enemies.userNameKey) {
            return this.props.checkLastPostAction(res[i]["created"]);
          }
        }
      });
  };

  blogList = () => {
    return this.props.enemies.recentBlog.map((item) => {
      return (
        <View style={styles.buttonView} key={item.id}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Blog", { postData: item });
            }}
          >
            <Text >{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

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
        user: 1,
        created_at: new Date(),
        message: "this.state.message",
        message_html: "",
        habit: 1,
        habit_name: "Drink Only Clear Liquids",
        username: "jacoblhughes",
      }),
    })
      .then((response) => {
        console.log(response.error);
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("this is the deal" + error.message + error.body);
      });
  };

  render() {
    if (this.props.enemies.loading === true) {
      return <Loading />;
    } else if (
      this.props.enemies.token === null &&
      this.props.enemies.loading === false
    ) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../src/images/logo.png")}
          />

          <View style={styles.buttonView}>
            <TextInput
              style={styles.username}
              placeholder="Username"
              onChangeText={(text) => this.props.setUsernameAction(text)}
            />
            <PasswordInputText
              style={styles.password}
              getRef={(input) => (this.input = input)}
              label="Password"
              autoCompleteType="password"
              placeholder="Password"
              onChangeText={(text) => this.props.setPasswordAction(text)}
            />
            <Button
              style={styles.button}
              title="Login"
              onPress={() => {
                this.props.loadingAction(true);
                this.retrieveToken();
              }}
            />
          </View>
        </View>
      );
    } else if (
      this.props.enemies.token !== null &&
      this.props.enemies.loading === false &&
      this.props.enemies.getPosts !== null &&
      this.props.enemies.recentBlog !== null &&
      this.props.enemies.getHabits
    ) {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              title="Habit Check-in"
              onPress={() => {
                this.props.loadingAction(true);
                Promise.all[(this.fetchProfile(), this.habitCheck())];
                this.props.navigation.navigate("DashboardSec");
              }}
            />
            <Button
              style={styles.button}
              title="Logout"
              onPress={() => {
                this._storeAsyncStorageTokenandLogout(null);
              }}
            />
            <Button
              style={styles.button}
              title="Exit"
              onPress={() => {
                BackHandler.exitApp();
              }}
            />

          </View>
          <View style={styles.postTitleView}>
            <Text style={styles.postTitle}>Most recent blog entries from EvidentFitness:</Text>
          </View>
          <View style={styles.postView}>{this.blogList()}</View>
          <View style={styles.postTitleView}>
            <Text style={styles.postTitle}>Get social with these habits:</Text>
          </View>
          <View style={styles.postView}>{this.habitList()}</View>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoView: {
    flex: 5,
    height: null,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: null,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 4,
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  postTitleView: {
    flex: 1,
  },
  postTitle: {
    flex: 1,
  },
  postView: {
    flex: 3,
    justifyContent: "space-between",
  },
  post: {
    flex: 1,
  },
  password: {
    width: 100,
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
      logOutAction,
      getHabitsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);