import React, { useEffect, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import PlayerInput from './PlayerInput';
import ScoreCards from './ScoreCards';
import Competiton from './Competiton';
import Header from './Header';
import { getDocs, collection } from 'firebase/firestore';
import { firebase } from '../../api/firebaseConfig';

export default function CardSetUp() {
  const [competitonSelected, setCompetitonSelected] = useState('');
  const [playersAvailable, setPlayersAvailable] = useState([]);
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playerThree, setPlayerThree] = useState('');
  const [playerFour, setPlayerFour] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [tournamentName, setTournamentName] = useState('');

  const playersCollectionRef = collection(firebase.firestore(), 'players');

  const getPlayers = async () => {
    try {
      const data = await getDocs(playersCollectionRef);
      const players = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayersAvailable(players);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (competitonSelected === 'option2') {
      getPlayers();
    }
  }, [competitonSelected]);

  return (
    // <KeyboardAvoidingView
    //   enabled
    //   behavior={Platform.OS === 'ios' ? 'padding' : null}
    // >
      // <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor:'white' }}>
          <Header
            selectedPlayers={selectedPlayers}
            tournamentName={tournamentName}
          />

          {/* Competition  */}
          <View style={styles.heading}>
            <Text style={{ fontSize: 24 }}>Competition</Text>
            <Competiton
              setCompetitonSelected={setCompetitonSelected}
              setTournamentName={setTournamentName}
            />
          </View>

          {/* Add players  */}
          <View style={styles.heading}>
            {/* Each player field to have a leading icon */}
            <Text style={{ fontSize: 24 }}>Add Players</Text>

            <PlayerInput
              player={'Player 1'}
              optional={''}
              playersAvailable={playersAvailable}
              onInputChange={(player, inputValue) => setPlayerOne(inputValue)}
              onPlayerSelect={(player, playerName) =>
                setSelectedPlayers([...selectedPlayers, playerName])
              }
            />
            <PlayerInput
              player={'Player 2'}
              optional={''}
              playersAvailable={playersAvailable}
              onInputChange={(player, inputValue) => setPlayerTwo(inputValue)}
              onPlayerSelect={(player, playerName) =>
                setSelectedPlayers([...selectedPlayers, playerName])
              }
            />
            <PlayerInput
              player={'Player 3'}
              optional={' (Optional)'}
              playersAvailable={playersAvailable}
              onInputChange={(player, inputValue) => setPlayerThree(inputValue)}
              onPlayerSelect={(player, playerName) =>
                setSelectedPlayers([...selectedPlayers, playerName])
              }
            />
            <PlayerInput
              player={'Player 4'}
              optional={' (Optional)'}
              playersAvailable={playersAvailable}
              onInputChange={(player, inputValue) => setPlayerFour(inputValue)}
              onPlayerSelect={(player, playerName) =>
                setSelectedPlayers([...selectedPlayers, playerName])
              }
            />
          </View>

          {/* Add scorecard  */}
          <View style={styles.heading}>
            <Text style={{ fontSize: 24 }}>Select a ScoreCard</Text>
            <ScoreCards />
          </View>
        </View>
      // {/* </ScrollView> */}
    // {/* // </KeyboardAvoidingView> */}
  );
}

const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
