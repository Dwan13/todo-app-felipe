import { Component, OnInit, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonList, IonItem, IonInput } from '@ionic/angular/standalone'; 
import { TodoModel } from 'src/app/data/models/todo.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonList, IonItem, IonInput] 
})
export class EditTaskPage implements OnInit {

  @Input() task: TodoModel | undefined; 
  currentTask!: TodoModel; 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.currentTask = this.task ? { ...this.task } : { id: '', title: '', description: '', completed: false, createdAt: new Date() };
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  async saveTask() {
    await this.modalController.dismiss({ task: this.currentTask }); 
  }
}
