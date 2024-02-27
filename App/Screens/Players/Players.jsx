import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Header from './Header';
import { players } from '../../Data/players';

export default function Players() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Header />
      <View>
        <Text style={{ marginVertical: 20 }}>List of Players Available</Text>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: player }) => (
            <TouchableOpacity
              onPress={() => navigation.push('viewCard')}
              style={styles.nameContainer}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.name}>
                  <Text>{player.firstName}</Text>
                  <Text>{player.lastName}</Text>
                </View>
                <Text>Handicap Index {player.handicapIndex}</Text>
              </View>
              <View style={styles.horizontalLine}></View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    marginVertical: 5,
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
    marginTop: 10,
  },
});
