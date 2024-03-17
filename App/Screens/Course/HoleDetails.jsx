import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
            <Image source={hole.img} style={styles.image} />
            {/* <Text>{hole.img}</Text> */}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {},
  image: { width: 100, height: 100, objectFit: 'contain' },
});
