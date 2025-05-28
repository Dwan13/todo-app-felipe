import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

/**
 * @class GetAllTodosUseCase
 * @description Caso de uso para obtener todas las tareas (Todos).
 * Utiliza el repositorio de tareas para recuperar la lista completa de tareas.
 */
@Injectable({
  providedIn: 'root'
})
export class GetAllTodosUseCase {
  /**
   * @private
   * @property {TodoRepository} todoRepository - El repositorio de tareas utilizado para interactuar con la capa de datos.
   */
  constructor(private todoRepository: TodoRepository) {}

  /**
   * @method execute
   * @description Ejecuta el caso de uso para obtener todas las tareas.
   * @returns {Promise<Todo[]>} Una promesa que se resuelve con un array de objetos Todo.
   */
  async execute(): Promise<Todo[]> {
    return await lastValueFrom(this.todoRepository.getAllTodos());
  }
}