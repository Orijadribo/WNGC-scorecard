import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

export default function Table({ isFront, scores }) {
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

  const [playerScores, setPlayerScores] = useState(
    Array.from({ length: 4 }, () => Array(9).fill(0))
  );

  const handleScoreChange = (playerIndex, holeIndex, score) => {
    const updatedScores = [...playerScores];
    updatedScores[playerIndex][holeIndex] = score;
    setPlayerScores(updatedScores);
  };

  const calculateTotal = (playerIndex) => {
    return playerScores[playerIndex].reduce(
      (acc, score) => acc + parseInt(score),
      0
    );
  };

  const renderPlayerScores = () => {
    return Array.from({ length: 4 }).map((_, playerIndex) => (
      <Text key={playerIndex} style={styles.player}>
        {calculateTotal(playerIndex)}
      </Text>
    ));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.holeParYards}>{item.hole}</Text>
      <Text style={styles.holeParYards}>{item.par}</Text>
      <Text style={styles.holeParYards}>{item.yards}</Text>
      <View style={styles.playerInputContainer}>
        {Array.from({ length: 4 }).map((_, playerIndex) =>
          !scores ? (
            <TextInput
              key={playerIndex}
              keyboardType='numeric'
              style={styles.playerInput}
              onChangeText={(text) =>
                handleScoreChange(playerIndex, index, text)
              }
            />
          ) : (
            <Text key={playerIndex} style={styles.score}>
              {scores[playerIndex]?.scores?.joseph?.[`hole${item.hole}`]}
            </Text>
          )
        )}
      </View>
    </View>
  );

  return (
    <View >
      {/* Table Header  */}
      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>Hole</Text>
        <Text style={styles.holeParYardsHeader}>Par</Text>
        <Text style={styles.holeParYardsHeader}>Yards</Text>
        {Array.from({ length: 4 }).map((_, playerIndex) =>
          scores ? (
            <Text key={playerIndex} style={styles.player}>
              {Object.keys(scores[playerIndex]?.scores || {}).map(
                (playerName) => (
                  <Text key={playerName}>{playerName}</Text>
                )
              )}
            </Text>
          ) : (
            <Text key={playerIndex} style={styles.player}>
              Player
            </Text>
          )
        )}
      </View>

      {/* Data Row  */}
      <FlatList
        data={rowData}
        keyExtractor={(item) => item.hole.toString()}
        renderItem={renderItem}
      />

      {/* Totals  */}
      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>Totals</Text>
        <Text style={styles.holeParYardsHeader}>{isFront ? 36 : 35}</Text>
        <Text style={styles.holeParYardsHeader}>{isFront ? 3600 : 3500}</Text>
        {renderPlayerScores()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  holeParYardsHeader: {
    width: '12%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  player: {
    width: '16%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    borderWidth: 1,
  },
  holeParYards: {
    width: '12%',
    // borderWidth: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  playerInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    width: '16%',
  },
  playerInput: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
  score: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
});
