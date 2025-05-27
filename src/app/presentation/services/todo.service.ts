import { Injectable } from '@angular/core';
import { AddTodoUseCase } from '../../domain/usecases/add-todo.usecase';
import { DeleteTodoUseCase } from '../../domain/usecases/delete-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';
import { UpdateTodoUseCase } from '../../domain/usecases/update-todo.usecase';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private addTodoUseCase: AddTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase,
    private getAllTodosUseCase: GetAllTodosUseCase,
    private updateTodoUseCase: UpdateTodoUseCase
  ) { }

  addTodo(todo: Todo): Promise<void> {
    return this.addTodoUseCase.execute(todo);
  }

  deleteTodo(id: string): Promise<void> {
    return this.deleteTodoUseCase.execute(id);
  }

  getAllTodos(): Promise<Todo[]> {
    return this.getAllTodosUseCase.execute();
  }

  updateTodo(todo: Todo): Promise<Todo> {
    return this.updateTodoUseCase.execute(todo);
  }
}