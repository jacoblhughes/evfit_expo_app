import * as React from "react";
import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import HomeScreen from "./src/screens/HomeScreen";
import HabitScreen from "./src/screens/HabitScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import BlogScreen from "./src/screens/BlogScreen";
import SocialScreen from "./src/screens/SocialScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ToolsScreen from "./src/screens/ToolsScreen";
import StopWatchScreen from "./src/screens/StopWatchScreen";

// import LoadingScreen from './src/screens/LoadingScreen';
import ReactDOM from "react-dom";

import myReducer from "./src/reducers/MyReducer";

import { Provider } from "react-redux";

const Stack = createStackNavigator();
const store = createStore(myReducer);

function HomeSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
            fontSize: 10,
          },
        }}
      />
      <Stack.Screen
        name="Social"
        component={SocialScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
            fontSize: 10,
          },
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function WelcomeSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HabitSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Habit Check-In"
        component={HabitScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ToolsSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workout Tools"
        component={ToolsScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
          },
        }}
      />
      <Stack.Screen
        name="Stop Watch"
        component={StopWatchScreen}
        options={{
          headerShown: true,
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#1F3252",
          },
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "flex-start",
            fontSize: 10,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeSec">
          <Stack.Screen
            name="HomeSec"
            options={{ headerShown: false }}
            component={HomeSec}
          />
          <Stack.Screen
            name="WelcomeSec"
            options={{ headerShown: false }}
            component={WelcomeSec}
          />
          <Stack.Screen
            name="HabitSec"
            options={{ headerShown: false }}
            component={HabitSec}
          />
          <Stack.Screen
            name="ToolsSec"
            options={{ headerShown: false }}
            component={ToolsSec}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
