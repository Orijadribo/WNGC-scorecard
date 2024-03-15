import React, { useState } from "react";
import { View,StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ScoreCards = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

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
          <Picker.Item label="WNGC 18 Holes" value="option1" />
          <Picker.Item label="WNGC Front 9" value="option2" />
          <Picker.Item label="WNGC Back 9" value="option3" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
  },
  pickerContainer: {
    flex: 1,
    // backgroundColor: '#F0FDF4',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
  },
  picker: {
    // fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    marginHorizontal: 24,
  },
});

export default ScoreCards;
