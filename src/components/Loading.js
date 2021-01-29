import React from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { connect } from "react-redux";
// import { TouchableOpacity } from "react-native-gesture-handler";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../src/images/loading.png")}
        />
        <View style={styles.textView}>
          <Text style={styles.text}>Loading...</Text>
        </View>
        <View style={styles.buttonView}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 5,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  buttonView: {
    flex: 3,
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  textView: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const { enemies } = state;
  return { enemies };
};

export default connect(mapStateToProps)(Loading);

