import { Todo } from '../../domain/entities/todo.entity';
import { TodoModel } from '../models/todo.model';

/**
 * Clase de mapeo para convertir entre la entidad de dominio `Todo` y el modelo de datos `TodoModel`.
 * Esto asegura una separación clara entre las capas de dominio y datos.
 */
export class TodoMapper {
  /**
   * Convierte un objeto `Todo` (entidad de dominio) a un `TodoModel` (modelo de datos).
   * @param todo - La entidad `Todo` a convertir.
   * @returns El `TodoModel` resultante.
   */
  static fromEntity(todo: Todo): TodoModel {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  /**
   * Convierte un objeto `TodoModel` (modelo de datos) a un `Todo` (entidad de dominio).
   * @param todoModel - El `TodoModel` a convertir.
   * @returns La entidad `Todo` resultante.
   */
  static toEntity(todoModel: TodoModel): Todo {
    return {
      id: todoModel.id,
      title: todoModel.title,
      description: todoModel.description,
      completed: todoModel.completed,
      createdAt: todoModel.createdAt,
      updatedAt: todoModel.updatedAt,
    };
  }
}