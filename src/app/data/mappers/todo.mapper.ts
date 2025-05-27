import { Todo } from '../../domain/entities/todo.entity';
import { TodoModel } from '../models/todo.model';

export class TodoMapper {
  static fromEntity(todo: Todo): TodoModel {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
  }

  static toEntity(todoModel: TodoModel): Todo {
    return {
      id: todoModel.id,
      title: todoModel.title,
      description: todoModel.description,
      completed: todoModel.completed,
    };
  }
}