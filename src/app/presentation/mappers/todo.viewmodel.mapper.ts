import { Todo } from '../../domain/entities/todo.entity';
import { TodoViewModel } from '../viewmodels/todo.viewmodel';

export class TodoViewModelMapper {
  static toViewModel(todo: Todo): TodoViewModel {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
  }

  static toEntity(todoViewModel: TodoViewModel): Todo {
    return {
      id: todoViewModel.id,
      title: todoViewModel.title,
      description: todoViewModel.description,
      completed: todoViewModel.completed,
    };
  }
}