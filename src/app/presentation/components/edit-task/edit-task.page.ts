import { Component, OnInit, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone'; 
import { Task } from '../../../domain/entities/task.entity';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonList, IonItem, IonInput] 
})
/**
 * @component EditTaskPage
 * @description Componente de página para la edición de tareas. Permite a los usuarios ver y modificar
 *              los detalles de una tarea existente o crear una nueva.
 */
export class EditTaskPage implements OnInit {

  /**
   * @property task
   * @description Propiedad de entrada que recibe la tarea a editar. Puede ser `undefined` si se está creando una nueva tarea.
   */
  @Input() task: Task | undefined;
  /**
   * @property currentTask
   * @description Objeto `TodoModel` que representa la tarea actual que se está editando o creando.
   *              Se inicializa en `ngOnInit`.
   */
  currentTask!: Task;

  /**
   * @constructor
   * @param modalController Controlador para gestionar la presentación y el cierre de modales.
   */
  constructor(private modalController: ModalController) { }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida de Angular que se ejecuta después de que Angular inicializa las propiedades de datos del componente.
   *              Aquí se inicializa `currentTask` con los datos de la tarea de entrada o con valores predeterminados para una nueva tarea.
   */
  ngOnInit() {
    this.currentTask = this.task ? { ...this.task } : { id: '', title: '', description: '', completed: false, createdAt: new Date() };
  }

  /**
   * @method dismiss
   * @description Cierra el modal de edición sin guardar ningún cambio.
   */
  async dismiss() {
    await this.modalController.dismiss();
  }

  /**
   * @method saveTask
   * @description Cierra el modal de edición y pasa el objeto `currentTask` de vuelta al componente que lo abrió.
   *              Esto permite que los cambios realizados en la tarea sean procesados.
   */
  async saveTask() {
    await this.modalController.dismiss({ task: this.currentTask });
  }
}
