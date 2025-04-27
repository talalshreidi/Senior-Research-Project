import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TaskFormComponent} from './components/task-form/task-form.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {FiltersComponent} from './components/filters/filters.component';
import {TaskService} from './services/task.service';
import {Task} from './models/task';

// Main app component that orchestrates the todo list functionality
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        TaskFormComponent,
        TaskListComponent,
        FiltersComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'Senior Research To-Do List';
    tasks: Task[] = []; // Holds the list of tasks
    filter = 'all'; // Current filter state (all/active/completed)

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        // Listen for changes in tasks and filter selection
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
        });

        this.taskService.getFilter().subscribe(filter => {
            this.filter = filter;
        });
    }

    // Handles adding a new task
    onAddTask(task: Omit<Task, 'id'>): void {
        this.taskService.addTask(task);
    }

    // Updates existing task details
    onUpdateTask(id: string, updatedTask: Partial<Task>): void {
        this.taskService.updateTask(id, updatedTask);
    }

    // Removes a task from the list
    onDeleteTask(id: string): void {
        this.taskService.deleteTask(id);
    }

    // Toggles the completion status of a task
    onToggleTaskCompletion(id: string): void {
        this.taskService.toggleTaskCompletion(id);
    }

    // Updates the current filter selection
    onFilterChange(filter: string): void {
        this.taskService.setFilter(filter);
    }

    // Gets filtered tasks based on current filter
    getFilteredTasks(): Task[] {
        return this.taskService.getFilteredTasks();
    }

    // Helper method to display current year in footer
    getCurrentYear(): number {
        return new Date().getFullYear();
    }
}
