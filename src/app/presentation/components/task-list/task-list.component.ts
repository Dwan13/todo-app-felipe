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
import { Todo } from 'src/app/domain/entities/todo.entity';

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
export class TaskListComponent {
  @Input() todos: Todo[] = [];
  @Output() todoCompletionToggled = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<string>();
  @Output() todoUpdated = new EventEmitter<Todo>();

  constructor() {}

 getTaskColor(todo: Todo): string {
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

  toggleTodoCompletion(todo: Todo) {
    this.todoCompletionToggled.emit(todo);
  }

  deleteTodo(id: string) {
    this.todoDeleted.emit(id);
  }

  updateTodo(todo: Todo) {
    this.todoUpdated.emit(todo);
  }
}
