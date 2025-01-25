import {Component, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('float', [
      state('start', style({ transform: 'translateY(0) translateX(0)' })),
      state('end', style({ transform: 'translateY(-20px) translateX(10px)' })),
      transition('start <=> end', animate('3s ease-in-out')) // Sem "infinite"
    ])
  ]
})
export class TaskComponent implements OnInit{
  tasks: any[] = [];
  newTask = { title: '', description: '' };
  filter: string = 'all';
  floatState = 'start';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.startFloating();
    this.getTasks();
  }

  startFloating(): void {
    // Alterna entre os estados 'start' e 'end' para criar o efeito de loop
    setInterval(() => {
      this.floatState = this.floatState === 'start' ? 'end' : 'start';
    }, 3000); // Mesma duração do tempo de animação
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data.map(task => ({ ...task, isEditing: false }));
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

  enableEdit(task: any): void {
    task.isEditing = true; // Enable edit mode
  }

  saveEdit(task: any): void {
    task.isEditing = false; // Disable edit mode
    this.updateTask(task); // Save changes
  }

  cancelEdit(task: any): void {
    this.getTasks(); // Reload tasks to discard unsaved changes
  }
}
