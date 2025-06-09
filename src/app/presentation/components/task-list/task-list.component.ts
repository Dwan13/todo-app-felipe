import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonCardContent,
  IonProgressBar,
  IonRow,
  IonButton,
  IonIcon,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, checkmarkOutline } from 'ionicons/icons';
import { Task } from '../../../domain/entities/task.entity';

addIcons({ createOutline, trashOutline, checkmarkOutline });

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonCardContent,
    IonProgressBar,
    IonRow,
    IonButton,
    IonIcon,
    IonList,
    
  ],
})
/**
 * @component TaskListComponent
 * @description Componente que muestra una lista de tareas (Todo).
 *              Permite visualizar el estado de las tareas, marcarlas como completadas,
 *              eliminarlas y actualizarlas.
 */
export class TaskListComponent {
  /**
   * @property todos
   * @description Propiedad de entrada que recibe un array de objetos `Todo` para mostrar en la lista.
   *              Se inicializa como un array vacío por defecto.
   */
  @Input() todos: Task[] = [];
  /**
   * @property todoCompletionToggled
   * @description Emite un evento cuando el estado de completitud de una tarea es cambiado.
   *              El evento lleva el objeto `Todo` que fue modificado.
   */
  @Output() todoCompletionToggled = new EventEmitter<Task>();
  /**
   * @property todoDeleted
   * @description Emite un evento cuando una tarea es eliminada.
   *              El evento lleva el `id` de la tarea eliminada.
   */
  @Output() todoDeleted = new EventEmitter<string>();
  /**
   * @property todoUpdated
   * @description Emite un evento cuando una tarea es solicitada para ser actualizada.
   *              El evento lleva el objeto `Todo` que se desea actualizar.
   */
  @Output() todoUpdated = new EventEmitter<Task>();

  /**
   * @constructor
   * @description Constructor del componente TaskListComponent.
   */
  constructor() {}

  /**
   * @method getTaskColor
   * @param todo El objeto `Todo` para el cual se determinará el color.
   * @returns Una cadena de texto que representa la clase CSS para el color de la tarea
   *          basado en su estado de completitud y antigüedad.
   * @description Determina una clase CSS para aplicar un color a la tarjeta de la tarea.
   *              Las tareas completadas tienen un color específico. Las tareas pendientes
   *              cambian de color según su antigüedad (más de 7 días, más de 3 días, o nuevas).
   */
 getTaskColor(todo: Task): string {
        if (!todo.createdAt) {
            return 'task-neutral';
        }
    
        const now = new Date();
        const createdDate = new Date(todo.createdAt);
        const ageInDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (todo.completed) {
            return 'task-completed';
        } else if (ageInDays > 7) {
            return 'task-old';
        } else if (ageInDays > 3) {
            return 'task-medium';
        } else {
            return 'task-new';
        }
    }

  /**
   * @method toggleTodoCompletion
   * @param todo El objeto `Todo` cuyo estado de completitud se va a alternar.
   * @description Emite el evento `todoCompletionToggled` con la tarea proporcionada.
   *              Esto permite que el componente padre maneje la lógica de actualización del estado.
   */
  toggleTodoCompletion(todo: Task) {
    this.todoCompletionToggled.emit(todo);
  }

  /**
   * @method deleteTodo
   * @param id El `id` de la tarea a eliminar.
   * @description Emite el evento `todoDeleted` con el `id` de la tarea proporcionada.
   *              Esto permite que el componente padre maneje la lógica de eliminación.
   */
  deleteTodo(id: string) {
    this.todoDeleted.emit(id);
  }

  /**
   * @method updateTodo
   * @param todo El objeto `Todo` que se desea actualizar.
   * @description Emite el evento `todoUpdated` con la tarea proporcionada.
   *              Esto permite que el componente padre maneje la lógica de actualización.
   */
  updateTodo(todo: Task) {
    this.todoUpdated.emit(todo);
  }
}
