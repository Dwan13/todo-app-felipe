import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createOutline, trashOutline, checkmarkOutline, add } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonProgressBar, IonContent, IonList, IonItem, IonCheckbox, IonLabel, IonInput, IonButton, IonIcon, IonTextarea, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonRow, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TodoService } from '../../services/todo.service';
import { TodoViewModel } from '../../viewmodels/todo.viewmodel';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { TaskListComponent } from '../../components/task-list/task-list.component';


addIcons({ createOutline, trashOutline, checkmarkOutline, add });

@Component({
    selector: 'app-todo',
    templateUrl: './todo.page.html',
    styleUrls: ['./todo.page.scss'],
    standalone: true,
    providers: [ModalController],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonIcon,
        IonFab, IonFabButton,
        TaskListComponent
    ]
})
export class TodoPage implements OnInit {
    newTodoTitle: string = '';
    newTodoDescription: string = '';
    todos: TodoViewModel[] = [];

    constructor(
        private todoService: TodoService,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.loadTodos();
    }

    async loadTodos() {
        try {
            const todos = await this.todoService.getAllTodos();
            this.todos = todos;
            console.log('Loaded todos:', todos);

        } catch (error) {
            console.error('Error loading todos:', error);

        }
    }

    async addTodo() {
        const modal = await this.modalController.create({
            component: EditTaskPage,

        });
        modal.onDidDismiss().then(async (result) => {
            if (result.data && result.data.task) {

                await this.todoService.addTodo(result.data.task);
                this.loadTodos();
            }
        });
        return await modal.present();
    }

    async updateTodo(todo: TodoViewModel) {
        const modal = await this.modalController.create({
            component: EditTaskPage,
            componentProps: {
                task: todo
            },
        });
        modal.onDidDismiss().then(async (result) => {
            if (result.data && result.data.task) {

                await this.todoService.updateTodo(result.data.task);
                this.loadTodos();
            }
        });
        return await modal.present();
    }

    async deleteTodo(id: string) {
        try {
            await this.todoService.deleteTodo(id);
            this.loadTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);

        }
    }

    async toggleTodoCompletion(todo: TodoViewModel) {
        todo.completed = !todo.completed;
        try {
            await this.todoService.updateTodo(todo);
            this.loadTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }

    }

    
}