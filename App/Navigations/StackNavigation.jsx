import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CardSetUp from "../Screens/NewCard/CardSetUp";
import { Text, View } from "react-native";
import React from 'react'
import TabNavigation from "./TabNavigation";
import EmptyCard from "../Screens/Cards/EmptyCard";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={TabNavigation} />
      <Stack.Screen name="addCard" component={CardSetUp} />
      <Stack.Screen name="emptyCard" component={EmptyCard} />
    </Stack.Navigator>
  );
}