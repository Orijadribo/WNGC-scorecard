import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ScoreCards = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        height: 50,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#F3F4F8",
          marginRight: 12,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          height: "100%",
        }}
      >
        {/* Supposed to be a drop-down */}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={{
            // fontFamily: FONT.regular,
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: "#F3F4F8", // Set background color explicitly
            borderWidth: 0, // Set border width to 0 for no border
            borderRadius: 12,
            marginRight: 24,
          }}
          itemStyle={{
            fontSize: 16,
          }}
        >
          <Picker.Item label="WNGC 18 Holes Men's Tee" value="option1" />
          <Picker.Item label="WNGC Men's Tee Front 9" value="option2" />
          <Picker.Item label="WNGC Men's Tee Back 9" value="option3" />
          <Picker.Item label="WNGC 18 Holes Women's Tee" value="option4" />
          <Picker.Item label="WNGC Women's Tee Front 9" value="option5" />
          <Picker.Item label="WNGC Women's Tee Back 9" value="option6" />
        </Picker>
      </View>
    </View>
  );
};

export default ScoreCards;
