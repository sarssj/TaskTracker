import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TaskContext } from "../../context/TaskContext";

const TaskListScreen = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listWidth, setListWidth] = useState(Dimensions.get("window").width);

  const markTaskAsCompleted = (taskId) => {
    dispatch({ type: "MARK_TASK_COMPLETED", payload: taskId });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  useEffect(() => {
    const updateListWidth = () => {
      setListWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateListWidth);

    return () => {
      Dimensions.removeEventListener("change", updateListWidth);
    };
  }, []);

  const filteredTasks =
    selectedCategory === "All"
      ? state.tasks
      : state.tasks.filter((task) => task.category === selectedCategory);

  filteredTasks.sort((a, b) => {
    const dueDateA = a.dueDate ? new Date(a.dueDate) : null;
    const dueDateB = b.dueDate ? new Date(b.dueDate) : null;

    if (!dueDateA && dueDateB) return 1;
    if (dueDateA && !dueDateB) return -1;
    if (!dueDateA && !dueDateB) return 0;

    return dueDateA - dueDateB;
  });

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Task List Screen</Text>

      <View style={styles.categoryItems}>
        <Button
          title="All"
          color="#212121"
          onPress={() => setSelectedCategory("All")}
        />
        <Button
          title="Work"
          color="#212121"
          onPress={() => setSelectedCategory("Work")}
        />
        <Button
          title="Sport"
          color="#212121"
          onPress={() => setSelectedCategory("Sport")}
        />
        <Button
          title="Personal"
          color="#212121"
          onPress={() => setSelectedCategory("Personal")}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => `${item.id}_${item.title}_${index}`}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { width: listWidth }]}>
            {!item.completed ? (
              <Button
                title="Mark as Completed"
                onPress={() => markTaskAsCompleted(item.id)}
                color="#212121"
              />
            ) : (
              <View style={styles.itemButton}>
                <Button
                  title={!item.completed ? "Mark as Completed" : "✓ Done"}
                  onPress={() => markTaskAsCompleted(item.id)}
                  color={!item.completed ? "#212121" : "#7CB342"}
                />
                <Text style={styles.taskTitle}>{item.title}</Text>
              </View>
            )}

            {!item.completed && (
              <React.Fragment>
                <Text style={styles.taskTitle}>{item.title}</Text>
              </React.Fragment>
            )}

            <Text style={styles.dueDate}>
              {item.dueDate
                ? new Date(item.dueDate).toDateString()
                : "No Due Date"}
            </Text>

            <View>
              <Button
                title="Delete"
                onPress={() => deleteTask(item.id)}
                color="#C62828"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  taskTitle: {
    flex: 1,
    marginHorizontal: 5,
  },
  dueDate: {
    marginHorizontal: 5,
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
    marginBottom: 50,
  },
});

export default TaskListScreen;
