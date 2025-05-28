import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';

/**
 * @description Caso de uso para eliminar una entidad Todo por su ID.
 * Permite la interacción con el repositorio de tareas para eliminar una tarea específica.
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteTodoUseCase {
  /**
   * @description Constructor de la clase DeleteTodoUseCase.
   * @param todoRepository El repositorio de tareas que proporciona los métodos para interactuar con los datos de las tareas.
   */
  constructor(private todoRepository: TodoRepository) {}

  /**
   * @description Ejecuta el caso de uso para eliminar una tarea.
   * @param id El ID de la tarea a eliminar.
   * @returns Una promesa que se resuelve cuando la tarea ha sido eliminada.
   */
  async execute(id: string): Promise<void> {
    await this.todoRepository.deleteTodo(id);
  }
}