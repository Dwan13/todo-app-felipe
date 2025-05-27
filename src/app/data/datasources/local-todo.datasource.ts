import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoDataSource } from './todo.datasource';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class LocalTodoDataSource implements TodoDataSource {
  private todos: TodoModel[] = [];
  private nextId: number = 0;

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.nextId = Math.max(...this.todos.map(todo => parseInt(todo.id)), 0) + 1;
    } else {
      this.todos = [];
      this.nextId = 0;
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getAllTodos(): Observable<TodoModel[]> {
    return of(this.todos);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    const newTodo = { ...todo, id: (this.nextId++).toString() };
    this.todos.push(newTodo);
    this.saveTodos();
    return of(newTodo);
  }

  updateTodo(todo: TodoModel): Observable<TodoModel> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index > -1) {
      this.todos[index] = todo;
      this.saveTodos();
      return of(todo);
    }
    return of(null as any); // Or throw an error
  }

  deleteTodo(id: string): Observable<void> {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
    return of(void 0);
  }
}