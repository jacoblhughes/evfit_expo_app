import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Touchable,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabataTimerScreen = () => {
  const [tabataRounds, setTabataRounds] = useState(8);
  const [tabataTime, setTabataTime] = useState(0);
  const [tabataOn, setTabataOn] = useState(false);
  const [status, setStatus] = useState("Enter # Of Exercises, Hit Set Workout");
  const [tabataReset, setTabataReset] = useState(false);
  const [tabataStart, setTabataStart] = useState(0);
  const [tabataExercises, setTabataExercises] = useState(0);
  const [tabataTotalRounds, setTabataTotalRounds] = useState(0);

  // componentDidUpdate() {}

  // componentDidMount() {}

  function setWorkout() {
    setTabataTotalRounds(tabataExercises * 4);
    setStatus("Hit Start");
  }
  let tabataTimer = null;

  function toggleTabata() {
    if (tabataOn == false) {
      console.log("if");
      setTabataOn(!tabataOn);
      setTabataTime(tabataTime);
      setTabataStart(Date.now());
      tabataTimer = setInterval(() => {
        console.log(tabataTime);
        setTabataTime(tabataTime - Date.now());
      }, 100);
    } else {
      console.log("else");
      clearInterval(tabataTimer);
      setTabataOn(!tabataOn);
      setTabataTime(tabataTime);
    }
    return () => clearInterval(tabataTimer);
  }

  function resetStopwatch() {
    clearInterval(tabataTimer);
    setTabataOn(false);
    setTabataStart(0);
    setTabataTime(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.exerciseLayout}>
        <TextInput
          style={styles.exercise}
          placeholderTextColor="#FFFFFF"
          placeholder="# Of Exercises"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(number) => setTabataExercises(number)}
        />
      </View>

      <View style={styles.textLayout}>
        <Text style={styles.descText}>Seconds Left In Round</Text>
      </View>
      <View style={styles.clockLayout}>
        <Text style={styles.numbers}>
          {("0" + (Math.floor(tabataTime / 1000) % 60)).slice(-2)}
        </Text>
      </View>
      <View style={styles.textLayout}>
        <Text style={styles.descText}>Rounds Left</Text>
      </View>
      <View style={styles.clockLayout}>
        <Text style={styles.numbers}>{tabataTotalRounds}</Text>
      </View>
      <View style={styles.statusLayout}>
        <Text style={styles.descText}>Directions: {status}</Text>
      </View>
      <View style={styles.buttonLayout}>
        <TouchableOpacity style={styles.button} onPress={setWorkout}>
          <Text style={styles.buttonText}>Set Workout</Text>
        </TouchableOpacity>
        <TouchableHighlight style={styles.button} onPress={toggleTabata}>
          <Text style={styles.buttonText}>{!tabataOn ? "Start" : "Pause"}</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
  },
  exerciseLayout: {
    flex: 2,
    justifyContent: "center",
    margin: 20,
  },

  exercise: {
    backgroundColor: "#1F3252",
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    fontSize: 30,
    flex: 1,
    borderWidth: 4,
    borderColor: "#C18527",
    borderRadius: 20,
  },
  textLayout: {
    flex: 1,
    justifyContent: "center",
  },
  clockLayout: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#1F3252",
  },
  buttonLayout: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#1F3252",
  },
  statusLayout: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1F3252",
    alignItems: "center",
    height: 40,
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  numbers: {
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
  },
  descText: {
    textAlign: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(TabataTimerScreen);
