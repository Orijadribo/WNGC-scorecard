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

export default function TournamentSignIn({ hideModal, setTournamentName }) {
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

  const signIn = () => {
    hideModal();
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => {
            hideModal();
            setSelectedValue('');
            setSelectedTournament(null);
          }}
        >
          <Ionicons name='chevron-back-outline' size={24} color='black' />
          <Text style={{ fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Heading  */}
      <Text style={{ fontSize: 24, marginTop: 10 }}>Tournament SignIn</Text>
      {/* Tournament data  */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          itemStyle={{
            fontSize: 16,
            marginTop: 10,
          }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            const selectedTournamentDetails = tournamentSignIn.find(
              (tournament) => tournament.id === itemValue
            );
            setSelectedTournament(selectedTournamentDetails);
            if (selectedTournamentDetails) {
              setTournamentName(selectedTournamentDetails.id);
            }
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
      </View>
      {/* Display selected tournament details */}
      {selectedTournament && (
        <View style={styles.tournamentDetails}>
          {/* <Text style={{ fontSize: 20, marginVertical: 10 }}>
            {selectedTournament.id}
          </Text> */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date: </Text>
            <Text style={{ fontSize: 16 }}> {selectedTournament.date}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Details: </Text>
            <Text style={{ fontSize: 16 }}>{selectedTournament.details}</Text>
          </View>
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
  pickerContainer: {
    marginVertical: 20,
  },
  picker: {
    // fontFamily: FONT.regular,
    // width: '100%',a
    // height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    marginVertical: 20,
  },
  tournamentDetails: {
    marginBottom: 20,
  },
});
