import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const PlayerInput = ({
  player,
  optional,
  playersAvailable,
  onInputChange,
  onPlayerSelect,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showPlayerOptions, setShowPlayerOptions] = useState(false);

  const handleInputChange = (text) => {
    setInputValue(text);
    setShowPlayerOptions(true); // Show options when typing
    onInputChange(player, text);
  };

  const handlePlayerSelect = (selectedPlayer) => {
    setInputValue(
      `${selectedPlayer.firstName} ${selectedPlayer.lastName} (${selectedPlayer.handicapIndex})`
    );
    setShowPlayerOptions(false); // Hide options after selecting
    onPlayerSelect(
      player,
      `${selectedPlayer.firstName} ${selectedPlayer.lastName}`
    );
  };

  const renderPlayerOptions = () => {
    if (!showPlayerOptions) {
      return null; // Don't render options if showPlayerOptions is false
    }

    return playersAvailable.map((player) => (
      <TouchableOpacity
        key={player.id}
        onPress={() => handlePlayerSelect(player)}
        style={styles.playerOption}
      >
        <Text>
          {player.firstName} {player.lastName} ({player.handicapIndex})
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={`${player} ${optional}`}
          style={styles.textInput}
        />
        <View style={styles.playerOptionsContainer}>
          {renderPlayerOptions()}
        </View>
      </View>
    </View>
  );
};

export default PlayerInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  playerOptionsContainer: {
    position: 'absolute',
    top: 50, // Adjust this based on your design
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    elevation: 5, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 10,
  },
  playerOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
