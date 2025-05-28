import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Todo } from '../../../domain/entities/todo.entity'; import { TodoService } from '../../services/todo.service'; import { RemoteConfigService } from '../../services/remote-config.service';

@Injectable({
    providedIn: 'root'
})
export class SearchViewModel {
    private _allTodos = new BehaviorSubject<Todo[]>([]);
    private _searchTerm = new BehaviorSubject<string>('');
    private _sortBy = new BehaviorSubject<string>('createdAt'); private _showCompletedFilter = new BehaviorSubject<boolean>(false);

    private _showFeature = new BehaviorSubject<boolean>(false);
    readonly showFeature$ = this._showFeature.asObservable();

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
        private todoService: TodoService,
        private remoteConfigService: RemoteConfigService
    ) {
        this.loadRemoteConfigFeatureFlag();
        this.loadAllTodos();
    }

    private async loadRemoteConfigFeatureFlag() {
        try {
            const showFeature = await this.remoteConfigService.fetchAndActivateConfig();
            this._showFeature.next(showFeature);
        } catch (error) {
            console.error('Error loading Remote Config feature flag:', error);
        }
    }


    loadAllTodos(): void {
        from(this.todoService.getAllTodos()).pipe(
            catchError(error => {
                console.error('Error loading all todos:', error);
                return of([]);
            })
        ).subscribe((todos: Todo[]) => this._allTodos.next(todos));
    }

    setSearchTerm(term: string): void {
        this._searchTerm.next(term);
    }

    setSortBy(criteria: string): void {
        this._sortBy.next(criteria);
    }

    setShowCompletedFilter(value: boolean): void {
        this._showCompletedFilter.next(value);
    }

    async toggleTodoCompletion(todo: Todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await this.todoService.updateTodo(updatedTodo);
        this.loadAllTodos();
    }

    async deleteTodo(id: string) {
        await this.todoService.deleteTodo(id);
        this.loadAllTodos();
    }

    async updateTodo(todo: Todo) {
        await this.todoService.updateTodo(todo);
        this.loadAllTodos();
    }
}