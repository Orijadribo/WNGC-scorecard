import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Scores from './Scores';

export default function History() {
  const [isCasual, setIsCasual] = useState(true);
  return (
    <View>
      <View style={styles.heading}>
        <TouchableOpacity
          style={isCasual && styles.selectedText}
          onPress={() => setIsCasual(true)}
        >
          <Text style={styles.text}>Causal Rounds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!isCasual && styles.selectedText}
          onPress={() => setIsCasual(false)}
        >
          <Text style={styles.text}>Tournaments</Text>
        </TouchableOpacity>
      </View>
      <Scores isCasual={isCasual} />
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    // borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  text: {
    // borderWidth: 2,
    borderRadius: 7,
    padding: 10,
  },
  selectedText: {
    borderRadius: 7,
    backgroundColor: 'green',
  },
});
