import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export const selectCompletedTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.completed)
);

export const selectImportantTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.important)
);

export const selectToDoTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => !task.completed)
);

export default taskSlice.reducer;
