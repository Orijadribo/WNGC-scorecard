import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const PlayerInput = ({ player, optional }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder={`${player} ${optional}`}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

export default PlayerInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: "100%",
  },
  textInput: {
    // fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
