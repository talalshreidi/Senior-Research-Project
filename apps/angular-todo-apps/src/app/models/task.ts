// Task model interface
export interface Task {
  id: string;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
}
