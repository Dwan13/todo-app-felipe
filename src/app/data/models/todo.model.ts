/**
 * Define la estructura de datos para un modelo de tarea.
 * Este modelo representa cómo se almacenan y recuperan los datos de las tareas en la capa de datos.
 */
export interface TodoModel {
  /**
   * Identificador único de la tarea.
   */
  id: string;
  /**
   * Título de la tarea.
   */
  title: string;
  /**
   * Descripción detallada de la tarea.
   */
  description: string;
  /**
   * Estado de completitud de la tarea (true si está completada, false en caso contrario).
   */
  completed: boolean;
  /**
   * Fecha y hora de creación de la tarea (opcional).
   */
  createdAt?: Date;
  /**
   * Fecha y hora de la última actualización de la tarea (opcional).
   */
  updatedAt?: Date;
}