import { Injectable } from '@angular/core';
import { AddTaskUseCase } from '../../domain/use-cases/add-task.use-case';
import { Observable } from 'rxjs';
import { Task } from '../../domain/entities/task.entity';

@Injectable({ providedIn: 'root' })
export class TaskFormViewModel {
  constructor(private addTaskUseCase: AddTaskUseCase) {}

  addTask(task: Task): Observable<Task> {
    return this.addTaskUseCase.execute(task);
  }
}