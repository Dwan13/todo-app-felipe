import { Observable } from 'rxjs';
import { Todo } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract getAllTodos(): Observable<Todo[]>;
  abstract addTodo(todo: Todo): Observable<Todo>;
  abstract updateTodo(todo: Todo): Observable<Todo>;
  abstract deleteTodo(id: string): Observable<void>;
}