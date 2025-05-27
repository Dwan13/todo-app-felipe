import { Observable, lastValueFrom } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todo: Todo): Promise<void> {
    await lastValueFrom(this.todoRepository.addTodo(todo));
  }
}