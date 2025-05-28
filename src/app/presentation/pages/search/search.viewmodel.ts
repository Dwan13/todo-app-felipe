import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Todo } from '../../../domain/entities/todo.entity'; import { TodoService } from '../../services/todo.service'; import { RemoteConfigService } from '../../services/remote-config.service';

/**
 * ViewModel para la página de búsqueda de tareas.
 * Gestiona el estado de la búsqueda, filtrado y ordenación de tareas,
 * y se comunica con los servicios para obtener y modificar datos.
 */
@Injectable({
    providedIn: 'root'
})
export class SearchViewModel {
    private _allTodos = new BehaviorSubject<Todo[]>([]);
    private _searchTerm = new BehaviorSubject<string>('');
    private _sortBy = new BehaviorSubject<string>('createdAt'); private _showCompletedFilter = new BehaviorSubject<boolean>(false);

    private _showFeature = new BehaviorSubject<boolean>(false);
    readonly showFeature$ = this._showFeature.asObservable();

    /**
     * Observable que emite los resultados de la búsqueda filtrados y ordenados.
     * Combina los observables de todas las tareas, término de búsqueda, criterio de ordenación
     * y filtro de completado para producir una lista de tareas actualizada.
     */
    readonly searchResults$: Observable<Todo[]> = combineLatest([
        this._allTodos.asObservable(),
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

    /**
     * Constructor de la clase SearchViewModel.
     * @param {TodoService} todoService - Servicio para interactuar con los datos de las tareas.
     * @param {RemoteConfigService} remoteConfigService - Servicio para obtener configuración remota.
     */
    constructor(
        private todoService: TodoService,
        private remoteConfigService: RemoteConfigService
    ) {
        this.loadRemoteConfigFeatureFlag();
        this.loadAllTodos();
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

    /**
     * Carga todas las tareas utilizando el servicio de tareas y actualiza el BehaviorSubject `_allTodos`.
     */
    loadAllTodos(): void {
        from(this.todoService.getAllTodos()).pipe(
            catchError(error => {
                console.error('Error loading all todos:', error);
                return of([]);
            })
        ).subscribe((todos: Todo[]) => this._allTodos.next(todos));
    }

    /**
     * Establece el término de búsqueda actual.
     * @param {string} term - El término de búsqueda.
     */
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

    /**
     * Alterna el estado de completado de una tarea y recarga todas las tareas.
     * @param {Todo} todo - La tarea a actualizar.
     */
    async toggleTodoCompletion(todo: Todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await this.todoService.updateTodo(updatedTodo);
        this.loadAllTodos();
    }

    /**
     * Elimina una tarea por su ID y recarga todas las tareas.
     * @param {string} id - El ID de la tarea a eliminar.
     */
    async deleteTodo(id: string) {
        await this.todoService.deleteTodo(id);
        this.loadAllTodos();
    }

    /**
     * Actualiza una tarea y recarga todas las tareas.
     * @param {Todo} todo - La tarea actualizada.
     */
    async updateTodo(todo: Todo) {
        await this.todoService.updateTodo(todo);
        this.loadAllTodos();
    }
}