import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  private taskService = inject(TaskService);
  tasks = this.taskService.getTasks();
  
  todoTasks = computed(() => 
    this.tasks().filter(task => task.status === TaskStatus.TODO)
  );
  
  inProgressTasks = computed(() => 
    this.tasks().filter(task => task.status === TaskStatus.IN_PROGRESS)
  );
  
  completedTasks = computed(() => 
    this.tasks().filter(task => task.status === TaskStatus.COMPLETED)
  );

  TaskStatus = TaskStatus;

  onStatusChange(taskId: string, newStatus: TaskStatus) {
    this.taskService.updateTaskStatus(taskId, newStatus);
  }

  onDelete(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
