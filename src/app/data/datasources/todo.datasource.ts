import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';

/**
 * Clase abstracta que define la interfaz para una fuente de datos de tareas.
 * Cualquier implementación de fuente de datos de tareas debe adherirse a esta interfaz.
 */
export abstract class TodoDataSource {
  /**
   * Obtiene todas las tareas.
   * @returns Un Observable que emite un array de objetos TodoModel.
   */
  abstract getAllTodos(): Observable<TodoModel[]>;

  /**
   * Agrega una nueva tarea.
   * @param todo El objeto TodoModel a agregar.
   * @returns Un Observable que emite el objeto TodoModel agregado.
   */
  abstract addTodo(todo: TodoModel): Observable<TodoModel>;

  /**
   * Actualiza una tarea existente.
   * @param todo El objeto TodoModel a actualizar.
   * @returns Un Observable que emite el objeto TodoModel actualizado.
   */
  abstract updateTodo(todo: TodoModel): Observable<TodoModel>;

  /**
   * Elimina una tarea por su ID.
   * @param id El ID de la tarea a eliminar.
   * @returns Un Observable que emite `void` cuando la tarea es eliminada.
   */
  abstract deleteTodo(id: string): Observable<void>;
}