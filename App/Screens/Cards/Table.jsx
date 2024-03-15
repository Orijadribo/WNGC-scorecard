import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { collection, doc, updateDoc, deleteField } from 'firebase/firestore';
import { firebase } from '../../api/firebaseConfig';

export default function Table({ isFront, scores, selectedPlayers }) {
  const holesFront = Array.from({ length: 9 }).map((_, index) => index + 1);
  const holesBack = Array.from({ length: 9 }).map((_, index) => index + 10);

  const parsFront = [5, 4, 3, 5, 4, 4, 3, 4, 4];
  const parsBack = [4, 4, 3, 5, 4, 4, 3, 4, 4];

  const yardsFront = [460, 355, 177, 471, 371, 379, 177, 292, 362];
  const yardsBack = [395, 374, 188, 487, 397, 387, 203, 282, 384];

  const playerInput = Array.from({ length: 9 }).map((_, index) => index + 1);

  const tournamentsCollectionRef = collection(
    firebase.firestore(),
    'tournaments'
  );

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

  const [playerScoresFront, setPlayerScoresFront] = useState(
    Array.from({ length: selectedPlayers.length }, () => Array(9).fill(''))
  );
  const [playerScoresBack, setPlayerScoresBack] = useState(
    Array.from({ length: selectedPlayers.length }, () => Array(9).fill(''))
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handleScoreChange = async (playerIndex, holeIndex, score) => {
    const updatedScoresFront = [...playerScoresFront];
    const updatedScoresBack = [...playerScoresBack];

    if (isFront) {
      updatedScoresFront[playerIndex][holeIndex] =
        score !== '' ? parseInt(score) : null;
    } else {
      updatedScoresBack[playerIndex][holeIndex] =
        score !== '' ? parseInt(score) : null;
    }

    setPlayerScoresFront(updatedScoresFront);
    setPlayerScoresBack(updatedScoresBack);
    setCurrentPlayerIndex(playerIndex);

    try {
      const playerId = selectedPlayers[playerIndex].toLowerCase();
      const scoreKey = `hole${
        isFront ? holesFront[holeIndex] : holesBack[holeIndex]
      }`;
      const scoreValue = score !== '' ? parseInt(score) : null;

      const womenDocRef = doc(tournamentsCollectionRef, "Women's");

      // Update the Firestore document
      let updateObject = {};
      if (scoreValue !== null) {
        updateObject[`scores.${playerId}.${scoreKey}`] = scoreValue;
      } else {
        updateObject[`scores.${playerId}.${scoreKey}`] = deleteField();
      }
      await updateDoc(womenDocRef, updateObject);
    } catch (err) {
      console.error('Error updating scores:', err);
    }
  };

  const calculateTotal = (playerIndex) => {
    const scores = isFront
      ? playerScoresFront[playerIndex]
      : playerScoresBack[playerIndex];
    return scores.reduce((acc, score) => acc + (score || 0), 0);
  };

  const renderPlayerScores = () => {
    return Array.from({ length: selectedPlayers.length }).map(
      (_, playerIndex) => (
        <Text key={playerIndex} style={styles.player}>
          {calculateTotal(playerIndex)}
        </Text>
      )
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.holeParYards}>{item.hole}</Text>
      <Text style={styles.holeParYards}>{item.par}</Text>
      <Text style={styles.holeParYards}>{item.yards}</Text>
      <View style={styles.playerInputContainer}>
        {selectedPlayers.map((player, playerIndex) => {
          const scores = isFront
            ? playerScoresFront[playerIndex]
            : playerScoresBack[playerIndex];

          return (
            <TextInput
              key={playerIndex}
              keyboardType='numeric'
              style={styles.playerInput}
              value={scores[index] !== null ? scores[index].toString() : ''}
              onChangeText={(text) =>
                handleScoreChange(playerIndex, index, text)
              }
            />
          );
        })}
      </View>
    </View>
  );

  const calculateFrontAndBackTotal = (playerIndex) => {
    const frontTotal = playerScoresFront[playerIndex].reduce(
      (acc, score) => acc + (score || 0),
      0
    );
    const backTotal = playerScoresBack[playerIndex].reduce(
      (acc, score) => acc + (score || 0),
      0
    );
    return frontTotal + backTotal;
  };


  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>Hole</Text>
        <Text style={styles.holeParYardsHeader}>Par</Text>
        <Text style={styles.holeParYardsHeader}>Yards</Text>

        {selectedPlayers.map((player, playerIndex) => (
          <Text key={playerIndex} style={styles.player}>
            {player}
          </Text>
        ))}
      </View>

      <FlatList
        data={rowData}
        keyExtractor={(item) => item.hole.toString()}
        renderItem={renderItem}
      />

      <View style={[styles.tableHeader, (style = { marginBottom: -10 })]}>
        <Text style={[styles.holeParYardsHeader, { fontSize: 14 }]}>
          To Par
        </Text>
        <Text style={styles.holeParYardsHeader}></Text>
        <Text style={styles.holeParYardsHeader}></Text>
        {renderPlayerScores()}
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>
          {isFront ? 'Front' : 'Back'}
        </Text>
        <Text style={styles.holeParYardsHeader}>{isFront ? 36 : 35}</Text>
        <Text style={styles.holeParYardsHeader}>
          {isFront
            ? yardsFront.reduce((acc, yard) => acc + yard, 0)
            : yardsBack.reduce((acc, yard) => acc + yard, 0)}
        </Text>
        {renderPlayerScores()}
      </View>
      {!isFront && (
        <View style={styles.tableHeader}>
          <Text style={styles.holeParYardsHeader}>Total</Text>
          <Text style={styles.holeParYardsHeader}>71</Text>
          <Text style={styles.holeParYardsHeader}>
            {yardsFront.reduce((acc, yard) => acc + yard, 0) +
              yardsBack.reduce((acc, yard) => acc + yard, 0)}
          </Text>
          {selectedPlayers.map((player, playerIndex) => (
            <Text key={playerIndex} style={styles.player}>
              {calculateFrontAndBackTotal(playerIndex)}
            </Text>
          ))}
        </View>
      )}
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
    marginBottom: 7,
    borderRadius: 7,
  },
  holeParYardsHeader: {
    width: '12%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  player: {
    width: '17%',
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
    paddingVertical: 5,
    marginVertical: 3,
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
  },
  holeParYards: {
    width: '12%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
  playerInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    width: '15%',
  },
  playerInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    textAlign: 'center',
    marginHorizontal: 2,
  },
});
