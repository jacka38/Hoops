import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
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
    // Create a new game object
    const newGame = {
      gameid: Date.now(), // Unique ID based on timestamp
      sport,
      neededPlayers: parseInt(neededPlayers),
      location,
      description,
      time: date.toISOString(),
    };

    try {
      const data = await require("../assets/sampleData.json");
      data.push(newGame);
      // Assuming you have some way to write to the JSON file in your environment
      // writeFile function should be implemented to handle this
      await writeFile(
        "../assets/sampleData.json",
        JSON.stringify(data, null, 2)
      );
      navigation.goBack();
    } catch (error) {
      console.error(error);
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
