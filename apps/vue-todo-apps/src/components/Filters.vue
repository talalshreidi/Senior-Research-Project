<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore';
import styles from '../styles/Filters.module.css';

// Get the task store
const taskStore = useTaskStore();

// Handles the clicks on the filter buttons
const onFilterClick = (filterValue: string) => {
  taskStore.setFilter(filterValue);
};

// Checks if the filter is active
const isActive = (filterValue: string) => {
  return taskStore.filter === filterValue;
};
</script>

<template>
  <div :class="styles.filters">
    <button
      @click="onFilterClick('all')"
      :class="{ [styles.active]: isActive('all') }"
    >
      All
    </button>
    <button
      @click="onFilterClick('active')"
      :class="{ [styles.active]: isActive('active') }"
    >
      Active
    </button>
    <button
      @click="onFilterClick('completed')"
      :class="{ [styles.active]: isActive('completed') }"
    >
      Completed
    </button>
    <button
      @click="onFilterClick('highPriority')"
      :class="{ [styles.active]: isActive('highPriority') }"
    >
      High Priority
    </button>
    <button
      @click="onFilterClick('mediumPriority')"
      :class="{ [styles.active]: isActive('mediumPriority') }"
    >
      Medium Priority
    </button>
    <button
      @click="onFilterClick('lowPriority')"
      :class="{ [styles.active]: isActive('lowPriority') }"
    >
      Low Priority
    </button>
    <button
      @click="onFilterClick('overdue')"
      :class="{ [styles.active]: isActive('overdue') }"
    >
      Overdue
    </button>
  </div>
</template>

