import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { players } from '../../Data/players';

export default function AddPlayer({ hideModal }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('option 1');
  const [handicapIndex, sethandicapIndex] = useState('');

  const savePlayer = () => {
    // Create a new player object
    const newPlayer = {
      id: players.length + 1, // Generate a unique ID (You may use a better method for this)
      firstName,
      lastName,
      gender,
      handicapIndex: parseFloat(handicapIndex), // Convert to a float if needed
    };

    // Update the players array with the new player
    players.push(newPlayer);

    // Close the modal
    hideModal();
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => hideModal()}
        >
          <Ionicons name='chevron-back-outline' size={24} color='black' />
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Add Player</Text>
        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder={'First Name'}
          style={styles.input}
        />
        <TextInput
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder={'Last Name'}
          style={styles.input}
        />
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          style={styles.input}
          itemStyle={{
            fontSize: 16,
          }}
        >
          <Picker.Item label='Male' value='option1' />
          <Picker.Item label='Female' value='option2' />
        </Picker>
        <TextInput
          value={handicapIndex}
          onChangeText={(text) => sethandicapIndex(text)}
          placeholder={'Handicap Index'}
          keyboardType='numeric'
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={() => savePlayer()} style={styles.saveBtn}>
        <Text>Save Player</Text>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
