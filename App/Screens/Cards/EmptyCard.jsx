import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './Header';
import Table from './Table';

export default function EmptyCard({ route }) {
  const [isFront, setIsFront] = useState(true);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const today = new Date();
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  const { selectedPlayers } = route.params;
  const { tournamentName } = route.params;

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Header />
      <View style={styles.titleContainer}>
        <View>
          <View>
            <Text>{tournamentName}</Text>
            <Text>{formattedDate}</Text>
          </View>
        </View>
        <View style={styles.frontBackContainer}>
          <TouchableOpacity onPress={() => setIsFront(true)}>
            <Text style={[styles.frontBack, isFront && styles.selectedText]}>
              Front
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFront(false)}>
            <Text style={[styles.frontBack, !isFront && styles.selectedText]}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Table isFront={isFront} selectedPlayers={selectedPlayers} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  frontBackContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  frontBack: {
    padding: 10,
    borderRadius: 5,
  },
  selectedText: {
    backgroundColor: 'blue',
  },
});
