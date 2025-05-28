import { lastValueFrom } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';

/**
 * @description Caso de uso para actualizar una entidad Todo existente.
 * Permite la interacción con el repositorio de tareas para modificar una tarea.
 */
@Injectable({
  providedIn: 'root'
})
export class UpdateTodoUseCase {
  /**
   * @description Constructor de la clase UpdateTodoUseCase.
   * @param todoRepository El repositorio de tareas que proporciona los métodos para interactuar con los datos de las tareas.
   */
  constructor(private todoRepository: TodoRepository) {}

  /**
   * @description Ejecuta el caso de uso para actualizar una tarea.
   * @param todo La entidad Todo con los datos actualizados.
   * @returns Una promesa que resuelve con la entidad Todo actualizada.
   */
  async execute(todo: Todo): Promise<Todo> {
    return await lastValueFrom(this.todoRepository.updateTodo(todo));
  }
}