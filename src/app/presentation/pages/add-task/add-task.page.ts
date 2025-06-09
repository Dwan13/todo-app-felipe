import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskFormViewModel } from '../../view-models/task-form.view-model';
import { Router } from '@angular/router';
import { Task } from '../../../domain/entities/task.entity';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddTaskPage implements OnInit {
  currentTask: Task = {
    id: '',
    title: '',
    description: '',
    createdAt: new Date(),
    completed: false
  };

  constructor(private todoService: TaskFormViewModel, private router: Router) { }

  ngOnInit() {
    // Initialize a new task for the form
    this.currentTask = {
      id: '',
      title: '',
      description: '',
      createdAt: new Date(),
      completed: false
    };
  }

  async saveTask() {
    if (this.currentTask.title && this.currentTask.description) {
      await this.todoService.addTask(this.currentTask);
      this.router.navigate(['/tabs/home']); // Navigate back to the todo list after saving
    } else {
      // Optionally, add some user feedback for incomplete fields
      console.log('Please fill in all fields.');
    }
  }
}
