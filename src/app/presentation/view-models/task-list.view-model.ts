import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../../domain/entities/task.entity';
import { GetTasksUseCase } from '../../domain/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../../domain/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../domain/use-cases/delete-task.use-case';

@Injectable({ providedIn: 'root' })
export class TaskListViewModel {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase
  ) {
    this.loadTasks();
  }

  loadTasks() {
    this.getTasksUseCase.execute().subscribe(tasks => {
      this._tasks.next(tasks);
    });
  }

  toggleTaskCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.updateTaskUseCase.execute(updatedTask).subscribe(() => {
      this.loadTasks(); // Recargar tareas para reflejar el cambio
    });
  }

  deleteTask(id: string) {
    this.deleteTaskUseCase.execute(id).subscribe(() => {
      this.loadTasks(); // Recargar tareas
    });
  }
}