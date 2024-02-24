import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TournamentSignIn({hideModal}) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => hideModal()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Heading  */}
      <Text style={{ fontSize: 24, marginTop:10 }}>Tournament SignIn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  backContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
});
