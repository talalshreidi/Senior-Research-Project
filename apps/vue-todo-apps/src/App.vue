<script setup lang="ts">
import { computed } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import Filters from './components/Filters.vue';
import styles from './styles/App.module.css';

// Helper method to display current year in footer
const getCurrentYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<template>
  <div :class="styles.appContainer">
    <h1 :class="styles.appTitle">Senior Research To-Do List</h1>
    <h2 :class="styles.appTitle" style="color: green; text-decoration: underline">Vue.js Version</h2>
    <h3 :class="styles.appTitle">By Talal Shreidi</h3>

    <!-- Component for adding new tasks through a form interface -->
    <TaskForm />

    <!-- Component for filtering tasks -->
    <Filters />

    <!-- Component for displaying tasks -->
    <TaskList />

    <!-- Footer -->
    <footer style="text-align: center; padding: 1rem; background: #f1f1f1; margin-top: 1rem;">
      © {{ getCurrentYear }} <span style="font-weight: bold;">CSC 450 Senior Research</span>. All Rights Reserved.
    </footer>
  </div>
</template>

