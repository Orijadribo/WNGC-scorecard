import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";

export default function Table({ isFront }) {
  const holesFront = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const holesBack = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  const parsFront = [5, 4, 3, 5, 4, 4, 3, 4, 4];
  const parsBack = [4, 4, 3, 5, 4, 4, 3, 4, 4];

  const yardsFront = [500, 400, 300, 500, 400, 400, 300, 400, 400];
  const yardsBack = [400, 400, 300, 500, 400, 400, 300, 400, 400];

  const playerRows = Array.from({ length: 4 }).map((_, index) => index + 1);

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
  table: {
    // padding: 10,
    display: "flex",
    flexDirection: "row",
    // justifyContent:'space-between',
    borderWidth: 1,
  },
  tableCell: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  holeParYards: {
    width: "100%",
    // borderWidth: 1,
    textAlign: "center",
  },
  playerInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
  },
  playerInputCell: {
    width: "100%",
    // borderWidth: 1,
    // padding: 5,
    textAlign: "center",
  },
  playerInput: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
  },
});
