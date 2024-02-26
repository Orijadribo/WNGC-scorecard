import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EmptyCard from '../Cards/EmptyCard';
import { casualRounds } from '../../Data/casualRounds';

export default function ViewCard() {
  return (
    <View style={{ flex: 1 }}>
      <EmptyCard />
    </View>
  );
}

const styles = StyleSheet.create({});
