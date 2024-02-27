import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { casualRounds } from '../../Data/casualRounds';
import { useNavigation } from '@react-navigation/native';

export default function Scores({ isCasual }) {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={isCasual ? casualRounds : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: scoreCard }) => (
          <TouchableOpacity
            onPress={() => navigation.push('viewCard')}
            style={styles.cardContainer}
          >
            <Text>Casual Round</Text>
            <Text>Date: {scoreCard.date}</Text>
            <Text>{scoreCard.scores.daniel.hole1}</Text>
            <Text>{scoreCard.scores.daniel.hole2}</Text>
            <Text>{scoreCard.scores.daniel.hole3}</Text>
            <Text>{scoreCard.scores.daniel.hole4}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
  },
});
