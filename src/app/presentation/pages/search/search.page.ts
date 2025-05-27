import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../../domain/entities/todo.entity';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { AlertController } from '@ionic/angular';
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  providers: [ModalController],

  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel, CommonModule, TaskListComponent],
})
export class SearchPage implements OnInit {
  searchResults: Todo[] = [];
  allTodos: Todo[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.allTodos = await this.todoService.getAllTodos();
  }

  async onSearchChange(event: any) {
    this.searchTerm = event.detail.value.toLowerCase();
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.searchResults = this.allTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(this.searchTerm) ||
          (todo.description && todo.description.toLowerCase().includes(this.searchTerm))
      );
    } else {
      this.searchResults = [];
    }
  }

  async toggleTodoCompletion(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await this.todoService.updateTodo(updatedTodo);
    this.allTodos = await this.todoService.getAllTodos(); // Refresh all todos
    this.onSearchChange({ detail: { value: this.searchTerm } }); // Re-filter search results
  }

  async deleteTodo(id: string) {
    await this.todoService.deleteTodo(id);
    this.allTodos = await this.todoService.getAllTodos(); // Refresh all todos
    this.onSearchChange({ detail: { value: this.searchTerm } }); // Re-filter search results
  }

  async updateTodo(todo: Todo) {
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

  async loadTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      this.allTodos = todos;
      console.log('Loaded todos:', todos);

    } catch (error) {
      console.error('Error loading todos:', error);

    }
  }
}
