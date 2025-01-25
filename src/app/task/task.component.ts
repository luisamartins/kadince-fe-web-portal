import {Component, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks: any[] = [];
  newTask = { title: '', description: '' };
  filter: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.getTasks();
      this.newTask = { title: '', description: '' };
    });
  }

  updateTask(task: any): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  completeTask(task: any): void {
    task.completed = true;
    this.updateTask(task);
  }

  filterTasks(): any[] {
    if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    } else if (this.filter === 'complete') {
      return this.tasks.filter(task => task.completed);
    } else {
      return this.tasks;
    }
  }
}
