import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Players</Text>
      <View style={styles.navBarIcons}>
        <TouchableOpacity>
          <FontAwesome6 name='plus' size={24} color='black' />
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Entypo name='dots-three-vertical' size={24} color='black' />
          </TouchableOpacity>
          <View style={[styles.options, isOpen && styles.open]}>
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
  optionsContainer: { position: 'relative' },
  options: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    width: 150,
    right: 0,
    top: 40,
  },
  optionsText: {
    paddingTop: 10,
  },
  open: {
    display: 'none',
  },
});
