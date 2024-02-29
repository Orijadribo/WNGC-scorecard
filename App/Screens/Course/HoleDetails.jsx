import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { courseDetails } from '../../Data/course';

export default function HoleDetails() {
  return (
    <View style={{ marginBottom: 70 }}>
      <FlatList
        data={courseDetails}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.hole.toString()}
        renderItem={({ item: hole }) => (
          <TouchableOpacity
            // onPress={() => navigation.push('viewCard')}
            style={styles.cardContainer}
          >
            <View style={styles.text}>
              <Text>Hole {hole.hole}</Text>
              <Text>Par {hole.par}</Text>
              <Text>Yards {hole.yards}</Text>
            </View>
            <Text>{hole.img}</Text>
            {/* <Text>{hole.hole}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  text: {},
});
