import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class AddTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: Omit<Task, 'id' | 'completed'>): Observable<Task> {
    return this.taskRepository.addTask(task);
  }
}