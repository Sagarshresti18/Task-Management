import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  title = '';
  description = '';
  priority: TaskPriority = TaskPriority.MEDIUM;
  dueDate = '';

  TaskPriority = TaskPriority;

  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (this.title.trim()) {
      const dueDateObj = this.dueDate ? new Date(this.dueDate) : undefined;
      
      this.taskService.addTask(
        this.title,
        this.description,
        this.priority,
        dueDateObj
      );

      // Reset form
      this.title = '';
      this.description = '';
      this.priority = TaskPriority.MEDIUM;
      this.dueDate = '';
    }
  }
}
