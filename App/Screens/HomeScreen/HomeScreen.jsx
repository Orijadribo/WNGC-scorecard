import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Header from "./Header";
import History from "./History";

export default function HomeScreen({navigation}) {
  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      <Header navigation={navigation} />
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 100, height: 100, marginTop: 50 },
});
