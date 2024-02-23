import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import Players from "../Screens/Players/Players";
import Course from "../Screens/Course/Course";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import StackNavigation from "./StackNavigation";
import CardSetUp from "../Screens/NewCard/CardSetUp";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Players"
        component={Players}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 15, marginTop: -10 }}>
              Players
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="people-group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={StackNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 15, marginTop: -10 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 15, marginTop: -10 }}>
              Course
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="golf-course" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen name="Stack" component={StackNavigation} /> */}
    </Tab.Navigator>
  );
}
