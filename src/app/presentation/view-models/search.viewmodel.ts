import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from '../../domain/entities/task.entity';
import { GetTasksUseCase } from '../../domain/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../../domain/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../domain/use-cases/delete-task.use-case';
import { RemoteConfigService } from 'src/app/services/remote-config.service';

@Injectable({
  providedIn: 'root'
})
export class SearchViewModel {
  private _allTasks = new BehaviorSubject<Task[]>([]);
  private _searchTerm = new BehaviorSubject<string>('');
  private _sortBy = new BehaviorSubject<string>('createdAt');
  private _showCompletedFilter = new BehaviorSubject<boolean>(false);

  private _showFeature = new BehaviorSubject<boolean>(false);
  readonly showFeature$ = this._showFeature.asObservable();

  readonly searchResults$: Observable<Task[]> = combineLatest([
    this._allTasks.asObservable(),
    this._searchTerm.asObservable(),
    this._sortBy.asObservable(),
    this._showCompletedFilter.asObservable()
  ]).pipe(
    map(([todos, searchTerm, sortBy, showCompletedFilter]) => {
      let filteredTodos = todos;

      if (searchTerm) {
        filteredTodos = filteredTodos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (showCompletedFilter) {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else {
        // Si el filtro de completado está desactivado, mostrar solo tareas no completadas
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      if (sortBy === 'createdAt') {
        filteredTodos = filteredTodos.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0; const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0; return dateB - dateA;
        });
      } else if (sortBy === 'title') {
        filteredTodos = filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
      }

      return filteredTodos;
    }),
    catchError(error => {
      console.error('Error processing search results:', error);
      return of([]);
    })
  );

  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private remoteConfigService: RemoteConfigService
  ) {
    this.loadRemoteConfigFeatureFlag();
    this.loadAllTasks();
  }
  /**
    * Carga el flag de característica desde la configuración remota.
    */
  private async loadRemoteConfigFeatureFlag() {
    try {
      const showFeature = await this.remoteConfigService.fetchAndActivateConfig();
      this._showFeature.next(showFeature);
    } catch (error) {
      console.error('Error loading Remote Config feature flag:', error);
    }
  }

  loadAllTasks(): void {
    this.getTasksUseCase.execute().pipe(
      catchError(error => {
        console.error('Error loading all tasks:', error);
        return of([]);
      })
    ).subscribe((tasks: Task[]) => this._allTasks.next(tasks));
  }

  setSearchTerm(term: string): void {
    this._searchTerm.next(term);
  }

  /**
     * Establece el criterio de ordenación actual.
     * @param {string} criteria - El criterio de ordenación ('createdAt' o 'title').
     */
  setSortBy(criteria: string): void {
    this._sortBy.next(criteria);
  }

  /**
   * Establece el valor del filtro para mostrar tareas completadas.
   * @param {boolean} value - `true` para mostrar solo tareas completadas, `false` para mostrar solo no completadas.
   */
  setShowCompletedFilter(value: boolean): void {
    this._showCompletedFilter.next(value);
  }

  async toggleTaskCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    await this.updateTaskUseCase.execute(updatedTask);
    this.loadAllTasks();
  }

  async deleteTask(id: string) {
    await this.deleteTaskUseCase.execute(id);
    this.loadAllTasks();
  }

  async updateTask(task: Task) {
    await this.updateTaskUseCase.execute(task);
    this.loadAllTasks();
  }
}