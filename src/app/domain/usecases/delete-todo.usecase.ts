import { Observable } from 'rxjs';
import { TodoRepository } from '../repositories/todo.repository';

export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    await this.todoRepository.deleteTodo(id);
  }
}