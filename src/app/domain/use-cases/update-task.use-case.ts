import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: Task): Observable<Task> {
    return this.taskRepository.updateTask(task);
  }
}