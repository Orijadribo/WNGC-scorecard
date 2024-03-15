import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showPlayerOptions, setShowPlayerOptions] = useState(false);

  const handleInputChange = (text) => {
    setInputValue(text);
    setShowPlayerOptions(true); // Show options when typing
    onInputChange(player, text);

    // Filter players based on input text
    const filtered = playersAvailable.filter(
      (player) =>
        player.firstName.toLowerCase().includes(text.toLowerCase()) ||
        player.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handlePlayerSelect = (selectedPlayer) => {
    setInputValue(
      `${selectedPlayer.firstName} ${selectedPlayer.lastName} (${selectedPlayer.handicapIndex})`
    );
    setShowPlayerOptions(false); // Hide options after selecting
    onPlayerSelect(player, `${selectedPlayer.firstName}`);
  };

  const handleInputBlur = () => {
    // Hide options when input loses focus
    setShowPlayerOptions(false);
  };

  const renderPlayerOptions = () => {
    if (!showPlayerOptions || filteredPlayers.length === 0) {
      return null; // Don't render options if showPlayerOptions is false or no filtered players
    }

    return filteredPlayers.map((player) => (
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
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        onBlur={handleInputBlur}
        placeholder={`${player} ${optional}`}
        style={styles.textInput}
      />
      <View style={styles.playerOptionsContainer}>{renderPlayerOptions()}</View>
    </View>
  );
};

export default PlayerInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 50,
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
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
