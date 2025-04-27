<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskStore, Task } from '../stores/taskStore';
import styles from '../styles/TaskList.module.css';

// Get the task store
const taskStore = useTaskStore();

// Properties for managing task editing state
const editTaskId = ref<string | null>(null);
const editTaskText = ref('');

// Sets up task editing mode
const handleEditClick = (task: Task) => {
  editTaskId.value = task.id;
  editTaskText.value = task.text;
};

// Saves edited task if valid text is provided
const handleEditSave = (id: string) => {
  if (editTaskText.value.trim()) {
    taskStore.updateTask(id, { text: editTaskText.value.trim() });
    editTaskId.value = null;
  }
};

// Cancels task editing mode
const handleCancelEdit = () => {
  editTaskId.value = null;
  editTaskText.value = '';
};

// Generates CSS classes for tasks based on completion and priority
const getTaskClassName = (task: Task) => {
  let className = styles.taskItem;

  if (task.completed) {
    className += ' ' + styles.completed;
  }

  if (task.priority === 'High') {
    className += ' ' + styles['high-priority'];
  } else if (task.priority === 'Medium') {
    className += ' ' + styles['medium-priority'];
  } else if (task.priority === 'Low') {
    className += ' ' + styles['low-priority'];
  }

  return className;
};

// Formats the date and checks if task is overdue
const formatDate = (dateString: string) => {
  if (!dateString) {
    return { formattedDate: '', isOverdue: false };
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const formattedDate = date.toLocaleDateString(undefined, options);

  const currentDate = new Date();
  const isOverdue = date < currentDate;

  return { formattedDate, isOverdue };
};
</script>

<template>
  <!-- Task list container -->
  <ul :class="styles.taskList">
    <!-- Iterates through each task -->
    <li
      v-for="task in taskStore.filteredTasks"
      :key="task.id"
      :class="getTaskClassName(task)"
    >
      <!-- Task content wrapper with checkbox and text -->
      <div :class="styles.taskContent">
        <!-- Checkbox for marking task complete -->
        <input
          type="checkbox"
          :checked="task.completed"
          @change="taskStore.toggleTaskCompletion(task.id)"
          :class="styles.taskCheckbox"
        />

        <!-- Edit mode container with input field and action buttons -->
        <template v-if="editTaskId === task.id">
          <div :class="styles.editInputWrapper">
            <!-- Input field for editing task text -->
            <input
              type="text"
              v-model="editTaskText"
              @blur="handleEditSave(task.id)"
              @keyup.enter="handleEditSave(task.id)"
              @keyup.escape="handleCancelEdit()"
              :class="styles.taskInput"
              ref="editInput"
              autofocus
            />
            <!-- Save button for edit mode -->
            <button
              @click="handleEditSave(task.id)"
              :class="styles.saveButton"
            >
              Save
            </button>
            <!-- Cancel button for edit mode -->
            <button
              @click="handleCancelEdit()"
              :class="styles.cancelButton"
            >
              Cancel
            </button>
          </div>
        </template>

        <!-- Display mode showing task text -->
        <template v-else>
          <span
            @dblclick="handleEditClick(task)"
            title="Double-click to edit"
            :class="styles.taskText"
          >
            {{ task.text }}
          </span>
        </template>

        <!-- Due date display with overdue highlighting -->
        <span v-if="task.dueDate" :class="styles.dueDate">
          Due: <strong :style="{ color: formatDate(task.dueDate).isOverdue ? 'red' : 'inherit' }">
            {{ formatDate(task.dueDate).formattedDate }}
          </strong>
        </span>
      </div>

      <!-- Action buttons -->
      <div
        :class="styles.taskActions"
      >
        <!-- Edit task button -->
        <button
          @click="handleEditClick(task)"
          :class="styles.editButton"
        >
          Edit
        </button>
        <!-- Delete task button -->
        <button
          @click="taskStore.deleteTask(task.id)"
          :class="styles.deleteButton"
        >
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>
