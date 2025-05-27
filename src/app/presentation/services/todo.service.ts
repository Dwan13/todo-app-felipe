import { Injectable } from '@angular/core';
import { AddTodoUseCase } from '../../domain/usecases/add-todo.usecase';
import { DeleteTodoUseCase } from '../../domain/usecases/delete-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';
import { UpdateTodoUseCase } from '../../domain/usecases/update-todo.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { MOCK_TODOS } from '../../data/mock-todos'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private currentTodos: Todo[] = [];
  private readonly LOCAL_STORAGE_KEY = 'todos';

  constructor(
    private addTodoUseCase: AddTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase,
    private getAllTodosUseCase: GetAllTodosUseCase,
    private updateTodoUseCase: UpdateTodoUseCase
  ) {
    
    this.loadTodosFromLocalStorage();
  }

  private loadTodosFromLocalStorage(): void {
    const storedTodos = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedTodos) {
      
      this.currentTodos = JSON.parse(storedTodos).map((todo: Todo) => ({
        ...todo,
        createdAt: todo.createdAt ? new Date(todo.createdAt) : undefined,
        updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : undefined
      }));
    } else {
      
      this.currentTodos = [...MOCK_TODOS];
      
      this.saveTodosToLocalStorage(); 
    }
  }

  private saveTodosToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.currentTodos));
  }

  async addTodo(todo: Todo): Promise<void> {
    
    await this.addTodoUseCase.execute(todo);
    
    this.currentTodos.push(todo);
    this.saveTodosToLocalStorage();
  }

  async deleteTodo(id: string): Promise<void> {
    
    await this.deleteTodoUseCase.execute(id);
    
    this.currentTodos = this.currentTodos.filter(t => t.id !== id);
    this.saveTodosToLocalStorage();
  }

  getAllTodos(): Promise<Todo[]> {
    
    return Promise.resolve(this.currentTodos);
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    
    const updatedTodo = await this.updateTodoUseCase.execute(todo);
    
    const index = this.currentTodos.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      this.currentTodos[index] = updatedTodo;
    }
    this.saveTodosToLocalStorage();
    return updatedTodo;
  }
}