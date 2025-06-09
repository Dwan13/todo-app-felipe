import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract getTasks(): Observable<Task[]>;
  abstract addTask(task: Omit<Task, 'id' | 'completed'>): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(id: string): Observable<void>;
}