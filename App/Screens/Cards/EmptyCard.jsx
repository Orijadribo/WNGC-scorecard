import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import Table from "./Table";

export default function EmptyCard() {
  const [isFront, setIsFront] = useState(true);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Header />
      <View style={styles.titleContainer}>
        <View>
          <Text>Casual Round</Text>
          <Text>Date</Text>
        </View>
        <View style={styles.frontBackContainer}>
          <TouchableOpacity onPress={() => setIsFront(true)}>
            <Text style={[styles.frontBack, isFront && styles.selectedText]}>
              Front
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFront(false)}>
            <Text style={[styles.frontBack, !isFront && styles.selectedText]}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Table isFront={isFront}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frontBackContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  frontBack: {
    padding: 10,
    borderRadius: 5,
  },
  selectedText: {
    backgroundColor: "blue",
  },
});
