import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TaskContext } from "../../context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import Orientation from "react-native-orientation";

const AddTaskScreen = ({ navigation }) => {
  const { dispatch } = useContext(TaskContext);
  const [taskText, setTaskText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const addTask = () => {
    if (taskText.trim() === "") {
      setErrorMessage("Task cannot be empty");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: taskText,
      completed: false,
      category: selectedCategory,
      dueDate: dueDate,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });

    setTaskText("");
    setDueDate(null);
    setErrorMessage("");
  };

  useEffect(() => {
    Orientation.addOrientationListener((orientation) => {
      if (orientation === "LANDSCAPE") {
        console.log("Landscape mode");
      } else {
        console.log("Portrait mode");
      }
    });

    return () => {
      Orientation.removeOrientationListener();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Task Manager</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.pickerItem}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
          }}
        >
          <Picker.Item label="Select Category" value="Select Category" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Sport" value="Sport" />
        </Picker>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your task ......"
            value={taskText}
            onChangeText={(text) => {
              setTaskText(text);
            }}
            style={styles.inputText}
          />
        </View>

        <CalendarPicker onDateChange={(date) => setDueDate(date)} />

        <Button
          title="Add Task"
          color="#212121"
          onPress={() => {
            addTask();
            navigation.navigate("Back");
          }}
        />
        {errorMessage !== "" && (
          <Text style={styles.textError}>{errorMessage}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pickerItem: {
    width: "50%",
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 20,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
    textAlign: "left",
  },
  textError: {
    color: "red",
    marginTop: 10,
  },
});

export default AddTaskScreen;
