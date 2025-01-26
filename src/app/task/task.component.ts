import {Component, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('float', [
      state('start', style({ transform: 'translateY(0) translateX(0)' })),
      state('end', style({ transform: 'translateY(-20px) translateX(10px)' })),
      transition('start <=> end', animate('3s ease-in-out'))
    ])
  ]
})
export class TaskComponent implements OnInit{
  tasks: any[] = [];
  newTask = { title: '', description: '', deadline: '' };
  filter: string = 'all';
  floatState = 'start';
  showCalendar: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.startFloating();
    this.getTasks();
  }

  startFloating(): void {
    setInterval(() => {
      this.floatState = this.floatState === 'start' ? 'end' : 'start';
    }, 3000);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data.map(task => ({ ...task, isEditing: false }));
    });
  }

  createTask(form: NgForm): void {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.getTasks();
      this.newTask = { title: '', description: '', deadline: '' };
      form.resetForm();
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
    task.isEditing = true;
  }

  saveEdit(task: any): void {
    task.isEditing = false;
    this.updateTask(task);
  }

  cancelEdit(task: any): void {
    this.getTasks();
  }

  getDeadlineClass(deadline: string | null, complete: boolean): string {
    if (!deadline || complete) {
      return 'deadline-green';
    }

    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const diffInDays = Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 1) {
      return 'deadline-red';
    } else if (diffInDays > 7) {
      return 'deadline-green';
    } else {
      return 'deadline-yellow';
    }
  }
}
