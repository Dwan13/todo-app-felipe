import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';

export abstract class TodoDataSource {
  abstract getAllTodos(): Observable<TodoModel[]>;
  abstract addTodo(todo: TodoModel): Observable<TodoModel>;
  abstract updateTodo(todo: TodoModel): Observable<TodoModel>;
  abstract deleteTodo(id: string): Observable<void>;
}