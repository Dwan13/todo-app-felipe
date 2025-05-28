import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoDataSource } from './todo.datasource';
import { TodoModel } from '../models/todo.model';

/**
 * Fuente de datos local para manejar tareas usando el almacenamiento local del navegador.
 * Implementa la interfaz TodoDataSource para operaciones CRUD básicas.
 */
@Injectable({
  providedIn: 'root',
})
export class LocalTodoDataSource implements TodoDataSource {
  /**
   * Lista interna de tareas
   */
  private todos: TodoModel[] = [];

  /**
   * Contador para IDs autoincrementales
   */
  private nextId: number = 0;

  /**
   * Constructor que carga las tareas almacenadas al inicializar
   */
  constructor() {
    this.loadTodos();
  }

  /**
   * Carga las tareas desde localStorage
   */
  private loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.nextId = Math.max(...this.todos.map(todo => parseInt(todo.id)), 0) + 1;
    } else {
      this.todos = [];
      this.nextId = 0;
    }
  }

  /**
   * Guarda las tareas actuales en localStorage
   */
  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  /**
   * Obtiene todas las tareas almacenadas
   * @returns Observable con el array de tareas
   */
  getAllTodos(): Observable<TodoModel[]> {
    return of(this.todos);
  }

  /**
   * Agrega una nueva tarea
   * @param todo - Modelo de tarea a agregar (sin ID)
   * @returns Observable con la tarea creada (incluyendo ID)
   */
  addTodo(todo: TodoModel): Observable<TodoModel> {
    const newTodo = { ...todo, id: (this.nextId++).toString() };
    this.todos.push(newTodo);
    this.saveTodos();
    return of(newTodo);
  }

  /**
   * Actualiza una tarea existente
   * @param todo - Modelo de tarea con cambios
   * @returns Observable con la tarea actualizada
   */
  updateTodo(todo: TodoModel): Observable<TodoModel> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index > -1) {
      this.todos[index] = todo;
      this.saveTodos();
      return of(todo);
    }
    return of(null as any); // Or throw an error
  }

  /**
   * Elimina una tarea por su ID
   * @param id - ID de la tarea a eliminar
   * @returns Observable vacío
   */
  deleteTodo(id: string): Observable<void> {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
    return of(void 0);
  }
}