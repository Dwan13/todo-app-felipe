// Importaciones necesarias de Angular y los casos de uso (use cases) del dominio.
import { Injectable } from '@angular/core';
import { AddTodoUseCase } from '../../domain/usecases/add-todo.usecase';
import { DeleteTodoUseCase } from '../../domain/usecases/delete-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';
import { UpdateTodoUseCase } from '../../domain/usecases/update-todo.usecase';
// Importación de la entidad Todo y los datos de prueba (mock).
import { Todo } from '../../domain/entities/todo.entity';
import { MOCK_TODOS } from '../../data/mock-todos'; 

// Decorador @Injectable que marca la clase como un servicio que puede ser inyectado.
@Injectable({
  providedIn: 'root' // Indica que el servicio se proporciona en el inyector raíz, haciéndolo disponible en toda la aplicación.
})
export class TodoService {

  // Array privado para almacenar las tareas actuales.
  private currentTodos: Todo[] = [];
  // Clave para almacenar y recuperar datos del almacenamiento local (localStorage).
  private readonly LOCAL_STORAGE_KEY = 'todos';

  // Constructor del servicio, inyecta los casos de uso necesarios.
  constructor(
    private addTodoUseCase: AddTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase,
    private getAllTodosUseCase: GetAllTodosUseCase,
    private updateTodoUseCase: UpdateTodoUseCase
  ) {
    // Carga las tareas desde el almacenamiento local al inicializar el servicio.
    this.loadTodosFromLocalStorage();
  }

  // Método privado para cargar las tareas desde el almacenamiento local.
  private loadTodosFromLocalStorage(): void {
    const storedTodos = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedTodos) {
      // Si hay tareas almacenadas, las parsea y las asigna a currentTodos.
      // También convierte las fechas de string a objetos Date.
      this.currentTodos = JSON.parse(storedTodos).map((todo: Todo) => ({
        ...todo,
        createdAt: todo.createdAt ? new Date(todo.createdAt) : undefined,
        updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : undefined
      }));
    } else {
      // Si no hay tareas en el almacenamiento local, carga las tareas de prueba (MOCK_TODOS).
      this.currentTodos = [...MOCK_TODOS];
      // Guarda las tareas de prueba en el almacenamiento local.
      this.saveTodosToLocalStorage(); 
    }
  }

  // Método privado para guardar las tareas actuales en el almacenamiento local.
  private saveTodosToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.currentTodos));
  }

  // Método asíncrono para añadir una nueva tarea.
  async addTodo(todo: Todo): Promise<void> {
    // Ejecuta el caso de uso para añadir la tarea.
    await this.addTodoUseCase.execute(todo);
    // Añade la tarea al array local y la guarda en el almacenamiento local.
    this.currentTodos.push(todo);
    this.saveTodosToLocalStorage();
  }

  // Método asíncrono para eliminar una tarea por su ID.
  async deleteTodo(id: string): Promise<void> {
    // Ejecuta el caso de uso para eliminar la tarea.
    await this.deleteTodoUseCase.execute(id);
    // Filtra la tarea eliminada del array local y guarda los cambios.
    this.currentTodos = this.currentTodos.filter(t => t.id !== id);
    this.saveTodosToLocalStorage();
  }

  // Método para obtener todas las tareas actuales.
  getAllTodos(): Promise<Todo[]> {
    // Retorna una promesa resuelta con el array de tareas actual.
    return Promise.resolve(this.currentTodos);
  }

  // Método asíncrono para actualizar una tarea existente.
  async updateTodo(todo: Todo): Promise<Todo> {
    // Ejecuta el caso de uso para actualizar la tarea.
    const updatedTodo = await this.updateTodoUseCase.execute(todo);
    // Encuentra el índice de la tarea actualizada en el array local.
    const index = this.currentTodos.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      // Si la tarea existe, la reemplaza con la versión actualizada.
      this.currentTodos[index] = updatedTodo;
    }
    // Guarda los cambios en el almacenamiento local.
    this.saveTodosToLocalStorage();
    return updatedTodo; // Retorna la tarea actualizada.
  }
}