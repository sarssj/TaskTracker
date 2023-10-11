import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state for tasks
const initialState = {
  tasks: [],
  categories: ["Work", "Personal","sport"],
};

// Create the context
const TaskContext = createContext();

// Define the action types
const ADD_TASK = "ADD_TASK";
const MARK_TASK_COMPLETED = "MARK_TASK_COMPLETED";
const DELETE_TASK = "DELETE_TASK";

// Reducer function to handle state changes
const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      const { title, category, dueDate } = action.payload;
      const newTask = {
        id: Math.random().toString(),
        title,
        completed: false,
        category,
        dueDate,
      };
      return { ...state, tasks: [...state.tasks, newTask] };

    case MARK_TASK_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: true } : task
        ),
      };
    case DELETE_TASK:
      console.log("Deleting task with ID:", action.payload);
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create a provider component
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    AsyncStorage.getItem("tasks").then((tasksJSON) => {
      if (tasksJSON) {
        dispatch({ type: "LOAD_TASKS", payload: JSON.parse(tasksJSON) });
      }
    });
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
