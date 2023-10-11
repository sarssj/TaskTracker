import React from "react";
import { TaskProvider } from "../../context/TaskContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskScreen from "../screens/AddTaskScreen";
import TaskListScreen from "../screens/TaskListScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={AddTaskScreen} />
          <Stack.Screen name="Back" component={TaskListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default Navigation;
