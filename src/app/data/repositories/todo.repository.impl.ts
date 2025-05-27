import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoDataSource } from '../datasources/todo.datasource';
import { TodoMapper } from '../mappers/todo.mapper';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoRepositoryImpl implements TodoRepository {
  constructor(private todoDataSource: TodoDataSource) {}

  getAllTodos(): Observable<Todo[]> {
    return this.todoDataSource.getAllTodos().pipe(
      map((models: TodoModel[]) => models.map(TodoMapper.toEntity))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    const todoModel = TodoMapper.fromEntity(todo);
    return this.todoDataSource.addTodo(todoModel).pipe(
      map(TodoMapper.toEntity)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const todoModel = TodoMapper.fromEntity(todo);
    return this.todoDataSource.updateTodo(todoModel).pipe(
      map(TodoMapper.toEntity)
    );
  }

  deleteTodo(id: string): Observable<void> {
    return this.todoDataSource.deleteTodo(id);
  }
}