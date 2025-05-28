import { Observable } from 'rxjs';
import { Todo } from '../entities/todo.entity';

/**
 * @interface TodoRepository
 * @description Clase abstracta que define el contrato para la gestión de tareas (Todos).
 * Proporciona métodos abstractos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas.
 */
export abstract class TodoRepository {
  /**
   * @method getAllTodos
   * @description Obtiene todas las tareas existentes.
   * @returns {Observable<Todo[]>} Un Observable que emite un array de objetos Todo.
   */
  abstract getAllTodos(): Observable<Todo[]>;

  /**
   * @method addTodo
   * @description Añade una nueva tarea.
   * @param {Todo} todo El objeto Todo a añadir.
   * @returns {Observable<Todo>} Un Observable que emite la tarea añadida.
   */
  abstract addTodo(todo: Todo): Observable<Todo>;

  /**
   * @method updateTodo
   * @description Actualiza una tarea existente.
   * @param {Todo} todo El objeto Todo a actualizar.
   * @returns {Observable<Todo>} Un Observable que emite la tarea actualizada.
   */
  abstract updateTodo(todo: Todo): Observable<Todo>;

  /**
   * @method deleteTodo
   * @description Elimina una tarea por su ID.
   * @param {string} id El ID de la tarea a eliminar.
   * @returns {Observable<void>} Un Observable que se completa cuando la tarea ha sido eliminada.
   */
  abstract deleteTodo(id: string): Observable<void>;
}