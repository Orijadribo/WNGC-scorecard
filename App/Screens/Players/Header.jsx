import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddPlayer from './AddPlayer';

export default function Header() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [addPlayer, setAddPlayer] = useState(false);


   useEffect(() => {
     
   }, [addPlayer]);

  return (
    <View style={styles.container}>
      <Text>Players</Text>
      <View style={styles.navBarIcons}>
        <TouchableOpacity onPress={() => setAddPlayer(!addPlayer)}>
          <FontAwesome6 name='plus' size={24} color='black' />
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Entypo name='dots-three-vertical' size={24} color='black' />
          </TouchableOpacity>
          <View style={[styles.options, !isOpen && styles.open]}>
            <TouchableOpacity>
              <Text style={styles.optionsText}>Edit Player</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionsText}>Edit Player</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionsText}>Edit Player</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionsText}>Delete Player</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={addPlayer}
        animationType='slide'
        onRequestClose={() => setAddPlayer(false)}
      >
        <AddPlayer hideModal={() => setAddPlayer(false)} />
      </Modal>
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
  navBarIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    // marginTop: 10,
    // borderWidth: 1,
  },
  optionsContainer: {
    position: 'relative',
  },
  options: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    width: 150,
    right: 0,
    top: 40,
  },
  optionsText: {
    paddingVertical: 5,
  },
  open: {
    display: 'none',
  },
});
