import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
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
import {setHabitHistoryAction } from "../actions/MyActions"
import { setWorkoutTemplates } from "../actions/MyActions.js";

import { bindActionCreators } from "redux";

import { setExerciseLogAction } from "../actions/MyActions.js";

import { LogBox } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./LoadingScreen";

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
    this._storeAsyncStorageTokenandLogout =
      this._storeAsyncStorageTokenandLogout.bind(this);
    this.blogList = this.blogList.bind(this);
    this.habitList = this.habitList.bind(this);
    this.fetchBlog = this.fetchBlog.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    // this.postList = this.postList.bind(this);
    // this.postMessage = this.postMessage.bind(this);
    this.fetchHabits = this.fetchHabits.bind(this);
    this.fetchExerciseLog = this.fetchExerciseLog.bind(this);
    this.fetchWorkoutTemplates = this.fetchWorkoutTemplates.bind(this);
  }

  componentDidMount() {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    // if(this.props.enemies.todayDate !== new Date(new Date(Date.now()).getTime() - this.props.enemies.todayOffset).toISOString().split('T')[0] ){
    //   this.fetchProfile();
    //   this.habitCheck();
    //   this.fetchExerciseLog();
    // }
    if(this.props.enemies.token !== null ){
      this.fetchProfile();
      this.habitCheck();
      this.fetchExerciseLog();
      this.fetchWorkoutTemplates();
      this.fetchPosts();
      this.fetchBlog();
      this.fetchHabits();
    }

  }

  componentDidUpdate() {
  }

  _storeAsyncStorageTokenandLogout = async (value) => {
    try {
      await AsyncStorage.removeItem("@token");
    } catch (error) {
      // console.log(error);
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

  fetchExerciseLog = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/exerciselog/`, {
        method: "GET",
        headers: {
          // "Accept": "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: "Token " + this.props.enemies.token,
        },
      })
        .then((response) => {
          // console.log(response)
          return response.json();
        })
        .then((res) => {
          this.props.setExerciseLogAction(res);
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
      // console.log();
      return (
        <View style={styles.socialView} key={item.id}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Social", {
                postData: item,
                postId: item.id,
                postName: item.name,
              });
            }}
          >
            <Text style={styles.textAll}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });
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


          this.props.setTokenAction(res["key"]);
          Promise.all[
            (this._storeAsyncStorageToken(res["key"]),
            this.fetchProfile(),
            this.fetchBlog(),
            this.habitCheck(),
            this.fetchPosts(),
            this.fetchHabits(),
            this.fetchExerciseLog(),
            this.fetchWorkoutTemplates())
          ];
          this.props.loadingAction(false);
        });
    } catch (error) {
      console.log(error);
      this.props.loadingAction(false);

      this.props.navigation.navigate("Home");
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

  fetchWorkoutTemplates = async () => {
    try {
      await fetch(`${this.props.enemies.internet}/api/workouttemplate/`, {
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
          this.props.setWorkoutTemplates(res);
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

        this.props.checkLastPostAction(res[0]["created"])
        this.props.setHabitHistoryAction(res);


      });
  };

  blogList = () => {
    return this.props.enemies.recentBlog.map((item) => {
      return (
        <View style={styles.blogView} key={item.id}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Blog", { postData: item });
            }}
          >
            <Text style={styles.textAll}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    if (this.props.enemies.loading) {
      return <LoadingScreen />;
    } else if (this.props.enemies.token === null) {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}

          style={styles.container}
        >
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.username}
              placeholder="Username"
              label="Username"
              autoCompleteType="username"
              autoCapitalize="none"
              onChangeText={(text) => this.props.setUsernameAction(text)}
            />
            <TextInput
              style={styles.password}
              getRef={(input) => (this.input = input)}
              autoCompleteType="password"
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => this.props.setPasswordAction(text)}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.loadingAction(true);
                this.retrieveToken();
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Login</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.loadingAction(true);
                this.retrieveToken();
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Forgot Password</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </KeyboardAvoidingView>
      );
    } else if (
      this.props.enemies.token !== null &&
      this.props.enemies.getPosts !== null &&
      this.props.enemies.recentBlog !== null &&
      this.props.enemies.getHabits
      && this.props.enemies.workoutTemplates !== null
    ) {
      return (
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("../../src/images/logo.png")}
            />
            <Text>Logged in as: {this.props.enemies.userName}</Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.loadingAction(true);
                Promise.all[(this.fetchProfile(), this.habitCheck())];
                this.props.navigation.navigate("HabitSec");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Habit Check-In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.navigate("ToolsSec");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Exercise Tools</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.navigate("WorkoutLogSec");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Workout Log</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Settings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                this._storeAsyncStorageTokenandLogout(null);
              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Logout</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                console.log('ddd')

              }}
            >
              <View style={styles.homeButtonView}>
                <Text style={styles.textAll}>Test</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={styles.postTitleView}>
            <Text style={styles.postTitle}>
              Most recent blog entries from Evident Fitness:
            </Text>
          </View>
          <View style={styles.postView}>{this.blogList()}</View>
          <View style={styles.postTitleView}>
            <Text style={styles.postTitle}>Get social with these habits:</Text>
          </View>
          <View style={styles.postView}><ScrollView>{this.habitList()}</ScrollView></View>
        </View>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoView: {
    flex: 4,
    alignItems: "center",
    marginBottom: 10,
    
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 4,
    width: 200,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  blogView: {
    flex: 5,
    justifyContent: "center",
    backgroundColor: "#AE4828",
    alignItems: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00132F",
    paddingHorizontal: 10,
  },
  socialView: {
    flex: 6,
    justifyContent: "center",
    backgroundColor: "#AE4828",
    alignItems: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00132F",
    paddingHorizontal: 10,
  },
  inputView: {
    flex: 2,
    alignItems: "center",
  },
  postTitleView: {
    flex: 1,
    backgroundColor: "#C18527",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  postTitle: {
    justifyContent: "center",
    fontWeight: "bold",
    color: "#00132F",
  },
  homeButtonView: {
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#1F3252",
    height: 40,
    justifyContent: "center",
  },
  postView: {
    flex: 3,
    backgroundColor: "#AE4828",
  },
  post: {
    flex: 1,
  },
  username: {
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
  },
  password: {
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
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
      logOutAction,
      getHabitsAction,
      setExerciseLogAction,
      setHabitHistoryAction,
      setWorkoutTemplates
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
