import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { Todo } from '../../../domain/entities/todo.entity';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { EditTaskPage } from '../../components/edit-task/edit-task.page';
import { ModalController } from '@ionic/angular';
import { SearchViewModel } from './search.viewmodel';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  providers: [ModalController, SearchViewModel],
  imports: [IonToggle,  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonItem, IonLabel, CommonModule, TaskListComponent, IonSegment, IonSegmentButton],
})
export class SearchPage implements OnInit {
  showFeature: boolean = false;

  constructor(
    private modalController: ModalController,
    public searchViewModel: SearchViewModel) { }

  ngOnInit() {
    this.searchViewModel.showFeature$.subscribe(value => {
      this.showFeature = value;
    });
  }

  onSearchChange(event: any) {
    this.searchViewModel.setSearchTerm(event.detail.value);
  }

  onSortChange(event: any) {
    this.searchViewModel.setSortBy(event.detail.value);
  }

  onShowCompletedChange(event: any) {
    this.searchViewModel.setShowCompletedFilter(event.detail.checked);
  }

  async toggleTodoCompletion(todo: Todo) {
    await this.searchViewModel.toggleTodoCompletion(todo);
  }

  async deleteTodo(id: string) {
    await this.searchViewModel.deleteTodo(id);
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
        await this.searchViewModel.updateTodo(result.data.task);
      }
    });
    return await modal.present();
  }

}
