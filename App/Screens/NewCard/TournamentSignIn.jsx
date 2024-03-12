import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {
  getDocs,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebase } from '../../api/firebaseConfig';

export default function TournamentSignIn({ hideModal }) {
  const [tournamentSignIn, setTournamentSignIn] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedTournament, setSelectedTournament] = useState(null);

  const tournamentsCollectionRef = collection(
    firebase.firestore(),
    'tournaments'
  );

  const getTournaments = async () => {
    try {
      const data = await getDocs(tournamentsCollectionRef);
      const tournamentData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTournamentSignIn(tournamentData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

  const tournament = () => {
    // Find the selected tournament details when the selectedValue changes
    const selectedTournamentDetails = tournamentSignIn.find(
      (tournament) => tournament.id === selectedValue
    );
    setSelectedTournament(selectedTournamentDetails);
  };

  useEffect(() => {
    tournament();
  }, [selectedTournament]);

  const signIn = () => {};

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => hideModal()}
        >
          <Ionicons name='chevron-back-outline' size={24} color='black' />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Heading  */}
      <Text style={{ fontSize: 24, marginTop: 10 }}>Tournament SignIn</Text>
      {/* Tournament data  */}
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={styles.picker}
        itemStyle={{
          fontSize: 16,
          borderWidth: 1,
        }}
      >
        <Picker.Item
          value='Choose an option'
          key='Choose an option'
          label='Choose an option'
        >
          -- Choose an option --
        </Picker.Item>
        {tournamentSignIn.map((tournament) => (
          <Picker.Item
            key={tournament.id}
            label={tournament.id}
            value={tournament.id}
          />
        ))}
      </Picker>
      {/* Display selected tournament details */}
      {selectedTournament && (
        <View style={styles.tournamentDetails}>
          <Text style={{ marginVertical: 10 }}>Tournament Selected</Text>
          <Text>{selectedTournament.id}</Text>
          <Text>Date: {selectedTournament.date}</Text>
          <Text>Details: {selectedTournament.details}</Text>
        </View>
      )}
      <View style={styles.signInButton}>
        <TouchableOpacity>
          <Text style={{ fontSize: 20, color: 'white' }} onPress={signIn}>
            SignIn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  signInButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 15,
  },
  picker: {
    marginTop: 10,
  },
  tournamentDetails: {
    marginVertical: 20,
  },
});
