import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Header from './Header';
import HoleDetails from './HoleDetails';

export default function Course() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Header />
      {/* <Text style={styles.heading}>Course Details</Text> */}
      <HoleDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  heading:{marginVertical:10}
})