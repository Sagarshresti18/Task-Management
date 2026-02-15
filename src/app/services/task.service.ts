import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus, TaskPriority } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([]);
  
  constructor() {
    this.loadTasksFromStorage();
  }

  getTasks() {
    return this.tasks.asReadonly();
  }

  addTask(title: string, description: string, priority: TaskPriority, dueDate?: Date) {
    const newTask: Task = {
      id: this.generateId(),
      title,
      description,
      status: TaskStatus.TODO,
      priority,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasksToStorage();
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.tasks.update(tasks => 
      tasks.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
    this.saveTasksToStorage();
  }

  deleteTask(id: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasksToStorage();
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.updateTask(id, { status });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private saveTasksToStorage() {
    localStorage.setItem('worksphere-tasks', JSON.stringify(this.tasks()));
  }

  private loadTasksFromStorage() {
    const stored = localStorage.getItem('worksphere-tasks');
    if (stored) {
      try {
        const tasks = JSON.parse(stored);
        this.tasks.set(tasks);
      } catch (e) {
        console.error('Failed to load tasks from storage', e);
      }
    }
  }
}
