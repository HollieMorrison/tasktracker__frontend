import { create } from "zustand";
import { api } from "../api/client";

const normaliseTasks = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });

    try {
      const { data } = await api.get("/api/tasks/");
      set({ tasks: normaliseTasks(data) });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({ tasks: [] });
    } finally {
      set({ loading: false });
    }
  },

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  deleteTask: async (id) => {
    try {
      await api.delete(`/api/tasks/${id}/`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },

  updateTask: async (id, updatedTask) => {
    try {
      const { data } = await api.patch(`/api/tasks/${id}/`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? data : task)),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },
}));

export default useTaskStore;
