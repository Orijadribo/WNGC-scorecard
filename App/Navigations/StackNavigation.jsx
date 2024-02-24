import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CardSetUp from "../Screens/NewCard/CardSetUp";
import { Text, View } from "react-native";
import React from 'react'

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="addCard" component={CardSetUp} />
    </Stack.Navigator>
  );
}