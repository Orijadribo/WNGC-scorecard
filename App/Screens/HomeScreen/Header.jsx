import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Header({navigation}) {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/WNGC_logo.png")}
          style={styles.logo}
        />
        <Text style={{ fontSize: 30, padding: 10 }}>WNGC</Text>
      </View>
      <View style={styles.navBar}>
        <Text>ScoreCards</Text>
        <View style={styles.navBarIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("addCard")}>
            <FontAwesome6 name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: 100, height: 100, marginTop: 50, objectFit:'contain' },
  navBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    // borderWidth: 1,
    paddingVertical:10
  },
  navBarIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    // marginTop: 10,
    // borderWidth: 1,
  },
});
