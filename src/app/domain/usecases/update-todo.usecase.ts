import { Observable, lastValueFrom } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';

export class UpdateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todo: Todo): Promise<Todo> {
    return await lastValueFrom(this.todoRepository.updateTodo(todo));
  }
}