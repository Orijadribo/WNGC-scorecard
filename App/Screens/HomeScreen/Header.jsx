import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Header({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/WNGC_logo.png')}
          style={styles.logo}
        />
        <Text style={{ fontSize: 30, padding: 10 }}>WNGC</Text>
      </View>
      <View style={styles.navBar}>
        <Text>ScoreCards</Text>
        <View style={styles.navBarIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('addCard')}>
            <FontAwesome6 name='plus' size={24} color='black' />
          </TouchableOpacity>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <Entypo name='dots-three-vertical' size={24} color='black' />
            </TouchableOpacity>
            <View style={[styles.options, !isOpen && styles.open]}>
              <TouchableOpacity>
                <Text style={styles.optionsText}>Edit Card</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.optionsText}>Delete Player</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 100, height: 100, marginTop: 50, objectFit: 'contain' },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
    // borderWidth: 1,
    paddingVertical: 10,
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
    zIndex: 10,
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
