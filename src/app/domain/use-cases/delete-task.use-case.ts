import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(id: string): Observable<void> {
    return this.taskRepository.deleteTask(id);
  }
}