import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const PlayerInput = ({ player, optional }) => {
  const [inputValue, setInputValue] = useState("");

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
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder={`${player} ${optional}`}
          style={{
            // fontFamily: FONT.regular,
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
};

export default PlayerInput;
