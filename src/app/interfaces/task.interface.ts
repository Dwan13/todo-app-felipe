export interface Task {
  id: string;
  title: string;
  description?: string;
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