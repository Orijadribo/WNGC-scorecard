import { View, Text, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import TournamentSignIn from './TournamentSignIn';

export default function Competiton({ setCompetitonSelected, setTournamentName }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedValue === 'option2') {
      setShowModal(true);
      setCompetitonSelected(selectedValue);
    } else {
      setShowModal(false);
    }
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.picker}
          itemStyle={{
            fontSize: 16,
          }}
        >
          <Picker.Item label='Casual Round' value='option1' />
          <Picker.Item label='Tournament' value='option2' />
        </Picker>
        <Modal
          visible={showModal}
          animationType='slide'
          onRequestClose={() => setShowModal(false)}
        >
          <TournamentSignIn
            hideModal={() => setShowModal(false)}
            setTournamentName={setTournamentName}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
  },
  picker: {
    // fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    marginHorizontal: 24,
  },
});
