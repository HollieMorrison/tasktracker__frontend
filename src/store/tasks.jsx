import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  deleteTask: async (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: async (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),
}));

export default useTaskStore;
