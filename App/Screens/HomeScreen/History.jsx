import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function History() {
  return (
    <View>
      <View style={styles.heading}>
        <TouchableOpacity>
          <Text style={styles.text}>Causal Rounds</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Tournaments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
},
text: {
    borderWidth: 2,
    borderRadius: 7,
    padding: 10,
  },
});
