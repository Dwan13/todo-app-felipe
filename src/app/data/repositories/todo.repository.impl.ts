import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoDataSource } from '../datasources/todo.datasource';
import { TodoMapper } from '../mappers/todo.mapper';
import { TodoModel } from '../models/todo.model';

/**
 * Implementación concreta del repositorio de tareas.
 * Actúa como un puente entre la capa de dominio y la capa de datos,
 * utilizando un `TodoDataSource` para interactuar con los datos
 * y un `TodoMapper` para convertir entre entidades de dominio y modelos de datos.
 */
@Injectable({
  providedIn: 'root',
})
export class TodoRepositoryImpl implements TodoRepository {
  /**
   * Constructor que inyecta la fuente de datos de tareas.
   * @param todoDataSource - La fuente de datos utilizada para las operaciones CRUD de tareas.
   */
  constructor(private todoDataSource: TodoDataSource) {}

  /**
   * Obtiene todas las tareas.
   * Mapea los modelos de datos a entidades de dominio.
   * @returns Un Observable que emite un array de entidades `Todo`.
   */
  getAllTodos(): Observable<Todo[]> {
    return this.todoDataSource.getAllTodos().pipe(
      map((models: TodoModel[]) => models.map(TodoMapper.toEntity))
    );
  }

  /**
   * Agrega una nueva tarea.
   * Convierte la entidad de dominio a un modelo de datos antes de agregarla
   * y luego mapea el resultado de vuelta a una entidad de dominio.
   * @param todo - La entidad `Todo` a agregar.
   * @returns Un Observable que emite la entidad `Todo` agregada.
   */
  addTodo(todo: Todo): Observable<Todo> {
    const todoModel = TodoMapper.fromEntity(todo);
    return this.todoDataSource.addTodo(todoModel).pipe(
      map(TodoMapper.toEntity)
    );
  }

  /**
   * Actualiza una tarea existente.
   * Convierte la entidad de dominio a un modelo de datos antes de actualizarla
   * y luego mapea el resultado de vuelta a una entidad de dominio.
   * @param todo - La entidad `Todo` a actualizar.
   * @returns Un Observable que emite la entidad `Todo` actualizada.
   */
  updateTodo(todo: Todo): Observable<Todo> {
    const todoModel = TodoMapper.fromEntity(todo);
    return this.todoDataSource.updateTodo(todoModel).pipe(
      map(TodoMapper.toEntity)
    );
  }

  /**
   * Elimina una tarea por su ID.
   * @param id - El ID de la tarea a eliminar.
   * @returns Un Observable que emite `void` cuando la tarea es eliminada.
   */
  deleteTodo(id: string): Observable<void> {
    return this.todoDataSource.deleteTodo(id);
  }
}