import { lastValueFrom } from 'rxjs';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';
import { Injectable } from '@angular/core';

/**
 * @description Caso de uso para añadir una nueva entidad Todo.
 * Permite la interacción con el repositorio de tareas para persistir una nueva tarea.
 */
@Injectable({
  providedIn: 'root'
})
export class AddTodoUseCase {
  /**
   * @description Constructor de la clase AddTodoUseCase.
   * @param todoRepository El repositorio de tareas que proporciona los métodos para interactuar con los datos de las tareas.
   */
  constructor(private todoRepository: TodoRepository) {}

  /**
   * @description Ejecuta el caso de uso para añadir una nueva tarea.
   * @param todo La entidad Todo a añadir.
   * @returns Una promesa que se resuelve cuando la tarea ha sido añadida.
   */
  async execute(todo: Todo): Promise<void> {
    await lastValueFrom(this.todoRepository.addTodo(todo));
  }
}