import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { Task } from '../../../domain/entities/task.entity'; // Cambiado de Todo a Task
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { ModalController } from '@ionic/angular';
import { SearchViewModel } from '../../view-models/search.viewmodel'; // Ruta actualizada

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  providers: [ModalController, SearchViewModel],
  imports: [IonToggle,  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonItem, IonLabel, CommonModule, TaskListComponent, IonSegment, IonSegmentButton],
})
/**
 * Componente de página para la funcionalidad de búsqueda de tareas.
 * Permite a los usuarios buscar, filtrar y ordenar tareas, así como interactuar con ellas
 * (marcar como completadas, eliminar, actualizar).
 */
export class SearchPage implements OnInit {
  /**
   * Indica si la sección de filtros y ordenación debe mostrarse.
   * @type {boolean}
   */
  showFeature: boolean = false;

  /**
   * Constructor de la clase SearchPage.
   * @param {ModalController} modalController - Servicio para controlar modales de Ionic.
   * @param {SearchViewModel} searchViewModel - ViewModel que maneja la lógica de negocio de la búsqueda.
   */
  constructor(
    private modalController: ModalController,
    public searchViewModel: SearchViewModel) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en `showFeature$` del ViewModel para actualizar la visibilidad de los filtros.
   */
  ngOnInit() {
    this.searchViewModel.showFeature$.subscribe(value => {
      this.showFeature = value;
    });
  }

  /**
   * Maneja el evento de cambio en la barra de búsqueda.
   * Actualiza el término de búsqueda en el ViewModel.
   * @param {any} event - El evento de entrada de la barra de búsqueda.
   */
  onSearchChange(event: any) {
    this.searchViewModel.setSearchTerm(event.detail.value);
  }


  /**
   * Maneja el evento de cambio en la opción de ordenación.
   * Actualiza el criterio de ordenación en el ViewModel.
   * @param {any} event - El evento de cambio del segmento de ordenación.
   */
  onSortChange(event: any) {
    this.searchViewModel.setSortBy(event.detail.value);
  }

  /**
   * Maneja el evento de cambio en el toggle para mostrar tareas completadas.
   * Actualiza el filtro de tareas completadas en el ViewModel.
   * @param {any} event - El evento de cambio del toggle.
   */
  onShowCompletedChange(event: any) {
    this.searchViewModel.setShowCompletedFilter(event.detail.checked);
  }

  /**
   * Alterna el estado de completado de una tarea.
   * @param {Task} task - La tarea a la que se le alternará el estado de completado.
   */
  async toggleTaskCompletion(task: Task) { // Cambiado de Todo a Task
    await this.searchViewModel.toggleTaskCompletion(task);
  }

  /**
   * Elimina una tarea por su ID.
   * @param {string} id - El ID de la tarea a eliminar.
   */
  async deleteTask(id: string) {
    await this.searchViewModel.deleteTask(id);
  }

  /**
   * Abre un modal para editar una tarea y actualiza la tarea si se guarda algún cambio.
   * @param {Task} task - La tarea a editar. // Cambiado de Todo a Task
   */
  async updateTask(task: Task) { // Cambiado de Todo a Task
    const modal = await this.modalController.create({
      component: EditTaskPage,
      componentProps: {
        task: task
      },
    });
    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.task) {
        await this.searchViewModel.updateTask(result.data.task);
      }
    });
    return await modal.present();
  }

}
