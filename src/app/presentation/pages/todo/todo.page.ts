import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importa los componentes individuales de Ionic desde '@ionic/angular/standalone'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCheckbox, IonLabel, IonInput, IonButton, IonIcon, IonTextarea } from '@ionic/angular/standalone';
import { TodoService } from '../../services/todo.service';
import { TodoViewModel } from '../../viewmodels/todo.viewmodel';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: true,
  imports: [
    // Ya no necesitas IonicModule aquí si importas los componentes individualmente
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Lista los componentes de Ionic que usas en tu template
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCheckbox, IonLabel, IonInput, IonButton, IonIcon, IonTextarea
  ]
})
export class TodoPage implements OnInit {
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  todos: TodoViewModel[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      this.todos = todos;
    } catch (error) {
      console.error('Error loading todos:', error);
      // Implementar manejo de errores en la UI
    }
  }

  async addTodo() {
    if (this.newTodoTitle.trim().length === 0) {
      return;
    }
    const newTodo: TodoViewModel = {
      id: Date.now().toString(), // Generar un ID simple por ahora
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      completed: false,
    };
    try {
      await this.todoService.addTodo(newTodo);
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.loadTodos(); // Recargar la lista de todos
    } catch (error) {
      console.error('Error adding todo:', error);
      // Implementar manejo de errores en la UI
    }
  }

  async updateTodo(todo: TodoViewModel) {
    try {
      await this.todoService.updateTodo(todo);
      this.loadTodos(); // Recargar la lista de todos
    } catch (error) {
      console.error('Error updating todo:', error);
      // Implementar manejo de errores en la UI
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.todoService.deleteTodo(id);
      this.loadTodos(); // Recargar la lista de todos
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Implementar manejo de errores en la UI
    }
  }

  toggleTodoCompletion(todo: TodoViewModel) {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }
}