import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
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

  const [playerScores, setPlayerScores] = useState(
    Array.from({ length: selectedPlayers.length }, () => Array(9).fill(''))
  );

  const handleScoreChange = async (playerIndex, holeIndex, score) => {
    const updatedScores = [...playerScores];
    updatedScores[playerIndex][holeIndex] =
      score !== '' ? parseInt(score) : null;
    setPlayerScores(updatedScores);

    try {
      for (const playerName of selectedPlayers) {
        const playerId = playerName.toLowerCase();
        console.log('playerId:', playerId);
        console.log('playerName:', playerName);
        const womenDocRef = doc(tournamentsCollectionRef, "Women's");

        const scoreKey = `hole${holeIndex + 1}`;
        const scoreValue = score !== '' ? parseInt(score) : null;

        if (playerId === playerName) {
          await updateDoc(womenDocRef, {
            [`scores.${playerId}.${scoreKey}`]: scoreValue,
          });
        }

        console.log(`Player ${playerName} scores updated successfully!`);
      }
    } catch (err) {
      console.error('Error updating scores:', err);
    }
  };

  const calculateTotal = (playerIndex) => {
    const scores = playerScores[playerIndex] || [];
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
          // const playerScore = playerScores[playerIndex][index];
          // console.log(
          //   `Player ${player}: Hole ${item.hole} - Score: ${playerScore}`
          // );

          return (
            <TextInput
              key={playerIndex}
              keyboardType='numeric'
              style={styles.playerInput}
              onChangeText={(text) =>
                handleScoreChange(playerIndex, index, text)
              }
            />
          );
        })}

        {/* {Array.from({ length: 4 }).map((_, playerIndex) =>
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
        )} */}
      </View>
    </View>
  );

  console.log('Selected Players:', selectedPlayers);

  return (
    <View>
      {/* Table Header  */}
      <View style={styles.tableHeader}>
        <Text style={styles.holeParYardsHeader}>Hole</Text>
        <Text style={styles.holeParYardsHeader}>Par</Text>
        <Text style={styles.holeParYardsHeader}>Yards</Text>

        {selectedPlayers.map((player, playerIndex) => (
          <Text key={playerIndex} style={styles.player}>
            {player}
          </Text>
        ))}

        {/* {Array.from({ length: 4 }).map((_, playerIndex) =>
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
              {selectedPlayers.map((player, playerIndex) => (
                <Text key={playerIndex} style={styles.player}>
                  {player}
                </Text>
              ))}
            </Text>
          )
        )} */}
      </View>

      {/* Data Row  */}
      <FlatList
        data={rowData}
        keyExtractor={(item) => item.hole.toString()}
        renderItem={renderItem}
      />

      {/* To par */}
      <View style={[styles.tableHeader, (style = { marginBottom: -10 })]}>
        <Text style={styles.holeParYardsHeader}>To Par</Text>
        <Text style={styles.holeParYardsHeader}></Text>
        <Text style={styles.holeParYardsHeader}></Text>
        {renderPlayerScores()}
      </View>
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
    marginVertical: 3,
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
  score: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
});
