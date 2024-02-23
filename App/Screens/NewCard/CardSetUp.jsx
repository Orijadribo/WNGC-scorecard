import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import PlayerInput from "./PlayerInput";
import ScoreCards from "./ScoreCards";

export default function CardSetUp() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Add players  */}
      <View style={styles.heading}>
        {/* Each player field to have a leading icon */}
        <Text style={{ fontSize: 24 }}>Add Players</Text>
        <PlayerInput player={"Player 1"} optional={""} />
        <PlayerInput player={"Player 2"} optional={""} />
        <PlayerInput player={"Player 3"} optional={" (Optional)"} />
        <PlayerInput player={"Player 4"} optional={" (Optional)"} />
      </View>

      {/* Add scorecard  */}
      <View style={styles.heading}>
        <Text style={{ fontSize: 24 }}>Select a ScoreCard</Text>
        <ScoreCards />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
