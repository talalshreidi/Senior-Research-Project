import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Task} from '../../models/task';

// Task form component to add new tasks
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  // Event emitter to send new task to parent
  @Output() addTask = new EventEmitter<Omit<Task, 'id'>>();

  // Form fields
  text: string = '';
  priority: 'High' | 'Medium' | 'Low' = 'Medium';
  dueDate: string = '';
  error: string = '';

  // Handles form submission
  handleSubmit(): void {
    // Validate task description
    if (this.text.trim() === '') {
      this.error = 'Task description is required.';
      return;
    }

    this.error = '';

    // Create new task object
    const newTask: Omit<Task, 'id'> = {
      text: this.text.trim(),
      priority: this.priority,
      dueDate: this.dueDate,
      completed: false
    };

    // Emit new task and reset form
    this.addTask.emit(newTask);
    this.resetForm();
  }

  // Reset form to initial state
  resetForm(): void {
    this.text = '';
    this.priority = 'Medium';
    this.dueDate = '';
  }
}
