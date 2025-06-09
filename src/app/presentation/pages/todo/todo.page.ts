import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createOutline, trashOutline, checkmarkOutline, add } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonList, IonContent, IonItem, IonLabel, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { Task } from 'src/app/domain/entities/task.entity'; // Cambiado de Todo a Task
import { GetTasksUseCase } from 'src/app/domain/use-cases/get-tasks.use-case'; // Nuevo
import { AddTaskUseCase } from 'src/app/domain/use-cases/add-task.use-case'; // Nuevo
import { UpdateTaskUseCase } from 'src/app/domain/use-cases/update-task.use-case'; // Nuevo
import { DeleteTaskUseCase } from 'src/app/domain/use-cases/delete-task.use-case'; // Nuevo

addIcons({ createOutline, trashOutline, checkmarkOutline, add });

@Component({
    selector: 'app-todo',
    templateUrl: './todo.page.html',
    styleUrls: ['./todo.page.scss'],
    standalone: true,
    providers: [ModalController, GetTasksUseCase, AddTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase], // Añadidos los casos de uso
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonHeader, IonToolbar, IonContent, IonIcon, IonTitle, IonList,
        IonFab, IonFabButton,
        TaskListComponent
    ]
})
export class TodoPage implements OnInit {
    newTodoTitle: string = '';
    newTodoDescription: string = '';
    tasks: Task[] = []; // Cambiado de todos a tasks y de Todo[] a Task[]

    constructor(
        private getTasksUseCase: GetTasksUseCase, // Inyectado
        private addTaskUseCase: AddTaskUseCase, // Inyectado
        private updateTaskUseCase: UpdateTaskUseCase, // Inyectado
        private deleteTaskUseCase: DeleteTaskUseCase, // Inyectado
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.loadTasks(); // Cambiado de loadTodos a loadTasks
    }

    async loadTasks() { // Cambiado de loadTodos a loadTasks
        try {
            this.getTasksUseCase.execute().subscribe(tasks => { // Usando GetTasksUseCase
                this.tasks = tasks; // Cambiado de todos a tasks
                console.log('Loaded tasks:', tasks); // Cambiado de todos a tasks
            });
        } catch (error) {
            console.error('Error loading tasks:', error); // Cambiado de todos a tasks
        }
    }

    async addTask() { // Cambiado de addTodo a addTask
        const modal = await this.modalController.create({
            component: EditTaskPage,
        });
        modal.onDidDismiss().then(async (result) => {
            if (result.data && result.data.task) {
                await this.addTaskUseCase.execute(result.data.task); // Usando AddTaskUseCase
                this.loadTasks(); // Cambiado de loadTodos a loadTasks
            }
        });
        return await modal.present();
    }

    async updateTask(task: Task) { // Cambiado de updateTodo a updateTask y de Todo a Task
        const modal = await this.modalController.create({
            component: EditTaskPage,
            componentProps: {
                task: task
            },
        });
        modal.onDidDismiss().then(async (result) => {
            if (result.data && result.data.task) {
                await this.updateTaskUseCase.execute(result.data.task); // Usando UpdateTaskUseCase
                this.loadTasks(); // Cambiado de loadTodos a loadTasks
            }
        });
        return await modal.present();
    }

    async deleteTask(id: string) { // Cambiado de deleteTodo a deleteTask
        try {
            await this.deleteTaskUseCase.execute(id); // Usando DeleteTaskUseCase
            this.loadTasks(); // Cambiado de loadTodos a loadTasks
        } catch (error) {
            console.error('Error deleting task:', error); // Cambiado de todo a task
        }
    }

    async toggleTaskCompletion(task: Task) { // Cambiado de toggleTodoCompletion a toggleTaskCompletion y de Todo a Task
        task.completed = !task.completed;
        try {
            await this.updateTaskUseCase.execute(task); // Usando UpdateTaskUseCase
            this.loadTasks(); // Cambiado de loadTodos a loadTasks
        } catch (error) {
            console.error('Error updating task:', error); // Cambiado de todo a task
        }
    }
}