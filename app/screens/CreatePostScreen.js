import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color } from "../../GlobalStyles.js";

const CreatePostScreen = ({ navigation }) => {
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [neededPlayers, setNeededPlayers] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = async () => {
    try {
      // Fetch existing games to determine the highest gameid
      const response = await fetch(
        "https://hoops-7fecd-default-rtdb.europe-west1.firebasedatabase.app/.json"
      );
      const data = await response.json();

      // Find the highest gameid and determine the next gameid
      const existingGameIds = Object.keys(data || {});
      const highestGameId = existingGameIds.reduce((maxId, key) => {
        const gameId = parseInt(data[key].gameid, 10);
        return gameId > maxId ? gameId : maxId;
      }, 0);

      const newGameId = highestGameId + 1;

      // Create a new game object with the new gameid
      const newGame = {
        gameid: newGameId,
        sport,
        neededPlayers: parseInt(neededPlayers),
        location,
        description,
        time: date.toISOString(),
      };

      // Send a POST request to add the new game to the Firebase database
      const postResponse = await fetch(
        "https://hoops-7fecd-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGame),
        }
      );

      if (postResponse.ok) {
        // Go back to the previous screen if successful
        navigation.goBack();
      } else {
        console.error("Failed to save data:", postResponse.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sport</Text>
      <TextInput style={styles.input} value={sport} onChangeText={setSport} />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Needed Players</Text>
      <TextInput
        style={styles.input}
        value={neededPlayers}
        onChangeText={setNeededPlayers}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    padding: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Color.BLACK,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: Color.BLACK,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: Color.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: Color.BLACK,
  },
});

export default CreatePostScreen;
