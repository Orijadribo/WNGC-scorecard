import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import React from "react";

export default function Table({ isFront }) {
  const holesFront = Array.from({ length: 9 }).map((_, index) => index + 1);
  const holesBack = Array.from({ length: 9 }).map((_, index) => index + 10);

  const parsFront = [5, 4, 3, 5, 4, 4, 3, 4, 4];
  const parsBack = [4, 4, 3, 5, 4, 4, 3, 4, 4];

  const yardsFront = [500, 400, 300, 500, 400, 400, 300, 400, 400];
  const yardsBack = [400, 400, 300, 500, 400, 400, 300, 400, 400];

  const playerInput = Array.from({ length: 9 }).map((_, index) => index + 1);

  const rowData = isFront
    ? holesFront.map((hole, index) => ({
        hole,
        par: parsFront[index],
        yards: yardsFront[index],
        playerInput: playerInput[index],
      }))
    : holesBack.map((hole, index) => ({
        hole,
        par: parsBack[index],
        yards: yardsBack[index],
        playerInput: playerInput[index],
      }));

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.holeParYards}>{item.hole}</Text>
      <Text style={styles.holeParYards}>{item.par}</Text>
      <Text style={styles.holeParYards}>{item.yards}</Text>
      <View style={styles.playerInputContainer}>
        <TextInput keyboardType="numeric" style={styles.playerInput} />
        <TextInput keyboardType="numeric" style={styles.playerInput} />
        <TextInput keyboardType="numeric" style={styles.playerInput} />
        <TextInput keyboardType="numeric" style={styles.playerInput} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Table Header  */}
      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>Hole</Text>
        <Text style={styles.holeParYardsHeader}>Par</Text>
        <Text style={styles.holeParYardsHeader}>Yards</Text>
        <Text style={styles.player}>Player 1</Text>
        <Text style={styles.player}>Player 2</Text>
        <Text style={styles.player}>Player 3</Text>
        <Text style={styles.player}>Player 4</Text>
      </View>

      {/* Data Row  */}
      <FlatList
        data={rowData}
        keyExtractor={(item) => item.hole.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  holeParYardsHeader: {
    width: "12%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  player: {
    width: "16%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  holeParYards: {
    width: "12%",
    borderWidth: 1,
    textAlignVertical: "center",
    textAlign: "center",
  },
  playerInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    width: "16%",
  },
  playerInput: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
  },
});
