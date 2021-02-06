import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import BlogScreen from "./src/screens/BlogScreen";
import SocialScreen from "./src/screens/SocialScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";


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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Social"
        component={SocialScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: true }}
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

function DashboardSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
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
            name="DashboardSec"
            options={{ headerShown: false }}
            component={DashboardSec}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
