<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import styles from '../styles/TaskForm.module.css';

// Get the task store
const taskStore = useTaskStore();

// Form fields
const text = ref('');
const priority = ref<'High' | 'Medium' | 'Low'>('Medium');
const dueDate = ref('');
const error = ref('');

// Handles form submission
const handleSubmit = () => {
  // Validate task description
  if (text.value.trim() === '') {
    error.value = 'Task description is required.';
    return;
  }

  error.value = '';

  // Create new task object and add it to the store
  taskStore.addTask({
    text: text.value.trim(),
    priority: priority.value,
    dueDate: dueDate.value,
    completed: false
  });

  // Reset form
  resetForm();
};

// Reset form to initial state
const resetForm = () => {
  text.value = '';
  priority.value = 'Medium';
  dueDate.value = '';
};
</script>

<template>
  <!-- Task form with submission handler -->
  <form @submit.prevent="handleSubmit" :class="styles.taskForm">
    <!-- Error message displayed when validation fails -->
    <div v-if="error" :class="styles.errorMessage">{{ error }}</div>

    <!-- Task description input field -->
    <div :class="styles.formGroup">
      <label for="taskText" :class="styles.label">Task Description:</label>
      <input
        type="text"
        id="taskText"
        v-model="text"
        placeholder="Enter task description"
        :class="styles.inputField"
        required
      />
    </div>

    <!-- Priority selection dropdown -->
    <div :class="styles.formGroup">
      <label for="taskPriority" :class="styles.label">Priority:</label>
      <select
        id="taskPriority"
        v-model="priority"
        :class="styles.selectField"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    <!-- Due date input field -->
    <div :class="styles.formGroup">
      <label for="taskDueDate" :class="styles.label">Due Date:</label>
      <input
        type="date"
        id="taskDueDate"
        v-model="dueDate"
        :class="styles.dateField"
      />
    </div>

    <!-- Submit button to add the task -->
    <button type="submit" :class="styles.submitButton">
      Add Task
    </button>
  </form>
</template>

