import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Task} from '../../models/task';

// Main task list component that displays and manages tasks
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Improves performance by reducing change detection
})
export class TaskListComponent {
  // Input and output properties for task management
  @Input() tasks: Task[] = [];
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleTaskCompletion = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<{ id: string, updatedTask: Partial<Task> }>();

  // Properties for managing task editing state
  editTaskId: string | null = null;
  editTaskText: string = '';
  hoveredTaskId: string | null = null;

  // Sets up task editing mode
  handleEditClick(task: Task): void {
    this.editTaskId = task.id;
    this.editTaskText = task.text;
  }

  // Saves edited task if valid text is provided
  handleEditSave(id: string): void {
    if (this.editTaskText.trim()) {
      this.updateTask.emit({
        id: id,
        updatedTask: {text: this.editTaskText.trim()}
      });
      this.editTaskId = null;
    }
  }

  // Cancels task editing mode
  handleCancelEdit(): void {
    this.editTaskId = null;
    this.editTaskText = '';
  }

  // Generates CSS classes for tasks based on completion and priority
  getTaskClassName(task: Task): string {
    let className = 'taskItem';

    if (task.completed) {
      className += ' completed';
    }

    if (task.priority === 'High') {
      className += ' high-priority';
    } else if (task.priority === 'Medium') {
      className += ' medium-priority';
    } else if (task.priority === 'Low') {
      className += ' low-priority';
    }

    return className;
  }

  // Formats the date and checks if task is overdue
  formatDate(dateString: string): { formattedDate: string, isOverdue: boolean } {
    if (!dateString) {
      return {formattedDate: '', isOverdue: false};
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

    return {formattedDate, isOverdue};
  }
}
