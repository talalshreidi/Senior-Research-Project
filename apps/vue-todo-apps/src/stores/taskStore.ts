import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * TaskStore manages the core task management functionality for the application.
 * It handles:
 * - Task CRUD operations (Create, Read, Update, Delete)
 * - Task filtering and state management
 * - Task persistence using local storage
 * - Reactive updates via Vue's reactivity system
 */
export interface Task {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
}

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([]);
  const filter = ref<string>('all');

  // Load tasks from localStorage on store initialization
  if (typeof window !== 'undefined') {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks);
    }
  }

  // Getters (computed properties)
  const filteredTasks = computed(() => {
    let result = tasks.value;

    switch (filter.value) {
      case 'active':
        result = result.filter(task => !task.completed);
        break;
      case 'completed':
        result = result.filter(task => task.completed);
        break;
      case 'highPriority':
        result = result.filter(task => task.priority === 'High');
        break;
      case 'mediumPriority':
        result = result.filter(task => task.priority === 'Medium');
        break;
      case 'lowPriority':
        result = result.filter(task => task.priority === 'Low');
        break;
      case 'overdue':
        result = result.filter(task => {
          const dueDate = new Date(task.dueDate);
          return dueDate < new Date() && task.dueDate !== '';
        });
        break;
      default:
        result = tasks.value;
    }

    return result;
  });

  // Actions
  function addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID()
    };

    tasks.value = [...tasks.value, newTask];
    saveTasks();
  }

  function updateTask(id: string, updatedTask: Partial<Task>) {
    tasks.value = tasks.value.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    saveTasks();
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(task => task.id !== id);
    saveTasks();
  }

  function toggleTaskCompletion(id: string) {
    tasks.value = tasks.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
  }

  function setFilter(newFilter: string) {
    filter.value = newFilter;
  }

  // Helper function to save tasks to localStorage
  function saveTasks() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    }
  }

  return {
    tasks,
    filter,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setFilter
  };
});