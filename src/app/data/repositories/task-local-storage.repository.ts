import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { v4 as uuidv4 } from 'uuid';
import { MOCK_TODOS } from '../mock-todos';

@Injectable({ providedIn: 'root' })
export class TaskLocalStorageRepository implements TaskRepository {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private readonly LOCAL_STORAGE_KEY = 'ionic_todo_tasks';

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
    } else {
      // Mock inicial de tareas
      const initialTasks: Task[] = MOCK_TODOS;
      this.tasksSubject.next(initialTasks);
      this.saveTasks(initialTasks);
    }
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(taskData: Omit<Task, 'id' | 'completed'>): Observable<Task> {
    const currentTasks = this.tasksSubject.getValue();
    const newTask = new Task(uuidv4(), taskData.title, false, taskData.description);
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
    return of(newTask);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
    return of(updatedTask);
  }

  deleteTask(id: string): Observable<void> {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
    return of(void 0);
  }
}