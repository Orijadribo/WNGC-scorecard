import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firebase } from '../../api/firebaseConfig';

export default function Header({ selectedPlayers,tournamentName }) {
  const navigation = useNavigation();

  const tournamentsCollectionRef = collection(
    firebase.firestore(),
    'tournaments'
  );

  const handleNextPress = async () => {
    if (selectedPlayers.length >= 2) {
      try {
        // Map over selected players and perform an action for each
        await Promise.all(
          selectedPlayers.map(async (playerName) => {
            const playerId = playerName.toLowerCase();
            const tournamentDocRef = doc(tournamentsCollectionRef, tournamentName);

            // Update the specific field in the 'tournament document
               await setDoc(
                 tournamentDocRef,
                 {
                   scores: {
                     [playerId]: {
                       // Add any additional player data or properties here
                     },
                   },
                 },
                 { merge: true }
               );

            console.log(`Player ${playerName} scores updated successfully!`);
          })
        );
        navigation.push('emptyCard', { selectedPlayers, tournamentName });
      } catch (err) {
        console.error('Error updating scores:', err);
      }

    } else {
      console.log('Please select Player 1 and Player 2.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name='chevron-back-outline' size={24} color='black' />
        <Text style={{ fontSize: 16 }}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextPress}>
        <Text style={{ fontSize: 16 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
});
