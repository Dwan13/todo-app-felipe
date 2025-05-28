// Importaciones necesarias de Angular y Ionic.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importación de iconos específicos de Ionic.
import { createOutline, trashOutline, checkmarkOutline, add } from 'ionicons/icons';
// Importación de componentes UI de Ionic.
import { IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
// Importación de servicios y view models personalizados.
import { TodoService } from '../../services/todo.service';
// Utilidad para añadir iconos de Ionic.
import { addIcons } from 'ionicons';
// Controlador de modales de Ionic.
import { ModalController } from '@ionic/angular';
// Componentes personalizados para la edición y lista de tareas.
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { Todo } from 'src/app/domain/entities/todo.entity';


// Añade los iconos importados para que estén disponibles en la aplicación.
addIcons({ createOutline, trashOutline, checkmarkOutline, add });

// Decorador @Component que define los metadatos del componente.
@Component({
    selector: 'app-todo', // Selector CSS para usar este componente.
    templateUrl: './todo.page.html', // Ruta al archivo de plantilla HTML.
    styleUrls: ['./todo.page.scss'], // Ruta a los archivos de estilos CSS/SCSS.
    standalone: true, // Indica que este es un componente autónomo.
    providers: [ModalController], // Provee ModalController a este componente.
    imports: [ // Módulos y componentes que este componente utiliza.
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonIcon,
        IonFab, IonFabButton,
        TaskListComponent
    ]
})
// Clase principal del componente TodoPage.
export class TodoPage implements OnInit {
    // Propiedades para el título y descripción de una nueva tarea.
    newTodoTitle: string = '';
    newTodoDescription: string = '';
    // Array para almacenar las tareas, utilizando el Todo.
    todos: Todo[] = [];

    // Constructor del componente, inyecta TodoService y ModalController.
    constructor(
        private todoService: TodoService,
        private modalController: ModalController
    ) { }

    // Método del ciclo de vida de Angular, se ejecuta al inicializar el componente.
    ngOnInit() {
        this.loadTodos(); // Carga las tareas al iniciar.
    }

    // Método asíncrono para cargar todas las tareas desde el servicio.
    async loadTodos() {
        try {
            const todos = await this.todoService.getAllTodos(); // Obtiene todas las tareas.
            this.todos = todos; // Asigna las tareas a la propiedad 'todos'.
            console.log('Loaded todos:', todos); // Muestra las tareas cargadas en consola.

        } catch (error) {
            console.error('Error loading todos:', error); // Manejo de errores al cargar tareas.

        }
    }

    // Método asíncrono para añadir una nueva tarea.
    async addTodo() {
        // Crea un modal para la página de edición de tareas.
        const modal = await this.modalController.create({
            component: EditTaskPage,

        });
        // Maneja el evento de cierre del modal.
        modal.onDidDismiss().then(async (result) => {
            // Si se devuelve data y una tarea, la añade y recarga la lista.
            if (result.data && result.data.task) {

                await this.todoService.addTodo(result.data.task);
                this.loadTodos();
            }
        });
        return await modal.present(); // Presenta el modal.
    }

    // Método asíncrono para actualizar una tarea existente.
    async updateTodo(todo: Todo) {
        // Crea un modal para la página de edición de tareas, pasando la tarea a editar.
        const modal = await this.modalController.create({
            component: EditTaskPage,
            componentProps: {
                task: todo
            },
        });
        // Maneja el evento de cierre del modal.
        modal.onDidDismiss().then(async (result) => {
            // Si se devuelve data y una tarea, la actualiza y recarga la lista.
            if (result.data && result.data.task) {

                await this.todoService.updateTodo(result.data.task);
                this.loadTodos();
            }
        });
        return await modal.present(); // Presenta el modal.
    }

    // Método asíncrono para eliminar una tarea por su ID.
    async deleteTodo(id: string) {
        try {
            await this.todoService.deleteTodo(id); // Elimina la tarea usando el servicio.
            this.loadTodos(); // Recarga la lista de tareas.
        } catch (error) {
            console.error('Error deleting todo:', error); // Manejo de errores al eliminar.

        }
    }

    // Método asíncrono para alternar el estado de completado de una tarea.
    async toggleTodoCompletion(todo: Todo) {
        todo.completed = !todo.completed; // Cambia el estado de completado.
        try {
            await this.todoService.updateTodo(todo); // Actualiza la tarea en el servicio.
            this.loadTodos(); // Recarga la lista de tareas.
        } catch (error) {
            console.error('Error updating todo:', error); // Manejo de errores al actualizar.
        }

    }

    
}