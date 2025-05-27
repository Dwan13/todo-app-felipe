import { Observable, lastValueFrom } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await lastValueFrom(this.todoRepository.getAllTodos());
  }
}