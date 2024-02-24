import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import TournamentSignIn from "./TournamentSignIn";

export default function Competiton() {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedValue === "option2") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        {/* Supposed to be a drop-down */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.picker}
          itemStyle={{
            fontSize: 16,
          }}
        >
          <Picker.Item label="Casual Round" value="option1" />
          <Picker.Item label="Tournament" value="option2" />
        </Picker>
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={() => showModal(false)}
        >
          <TournamentSignIn hideModal={() => setShowModal(false)} />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: "100%",
  },
  picker: {
    // fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F3F4F8", // Set background color explicitly
    borderWidth: 0, // Set border width to 0 for no border
    borderRadius: 12,
    marginRight: 24,
  },
});
