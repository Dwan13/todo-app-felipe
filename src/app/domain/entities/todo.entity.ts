/**
 * Define la estructura de datos para la entidad de dominio de una tarea.
 * Esta entidad representa el concepto central de una tarea en el dominio de la aplicación.
 */
export interface Todo {
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