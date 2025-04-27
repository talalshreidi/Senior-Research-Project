/**
 * TaskService manages the core task management functionality for the application.
 * It handles:
 * - Task CRUD operations (Create, Read, Update, Delete)
 * - Task filtering and state management
 * - Task persistence using local storage
 * - Reactive updates via Observables
 */
import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../models/task';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterSubject = new BehaviorSubject<string>('all');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTasks();
  }

  // Get tasks as an observable for reactive updates
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Get current filter as an observable
  getFilter(): Observable<string> {
    return this.filterSubject.asObservable();
  }

  // Set current filter
  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  // Add a new task
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID()
    };

    this.tasks = [...this.tasks, newTask];
    this.updateTasks();
  }

  // Update an existing task
  updateTask(id: string, updatedTask: Partial<Task>): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? {...task, ...updatedTask} : task
    );
    this.updateTasks();
  }

  // Delete a task
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateTasks();
  }

  // Toggle task completion status
  toggleTaskCompletion(id: string): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    );
    this.updateTasks();
  }

  // Get filtered tasks based on current filter
  getFilteredTasks(): Task[] {
    const filter = this.filterSubject.value;
    let filteredTasks = this.tasks;

    switch (filter) {
      case 'active':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case 'highPriority':
        filteredTasks = filteredTasks.filter(task => task.priority === 'High');
        break;
      case 'mediumPriority':
        filteredTasks = filteredTasks.filter(task => task.priority === 'Medium');
        break;
      case 'lowPriority':
        filteredTasks = filteredTasks.filter(task => task.priority === 'Low');
        break;
      case 'overdue':
        filteredTasks = filteredTasks.filter(task => {
          const dueDate = new Date(task.dueDate);
          return dueDate < new Date() && task.dueDate !== '';
        });
        break;
      default:
        filteredTasks = this.tasks;
    }

    return filteredTasks;
  }

  // Private methods
  private updateTasks(): void {
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  private loadTasks(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
        this.tasksSubject.next(this.tasks);
      }
    }
  }

  private saveTasks(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
