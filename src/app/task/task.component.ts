import {Component, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {NgForm} from "@angular/forms";

/**
 * Component for managing tasks.
 */
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

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.startFloating();
    this.getTasks();
  }

  /**
   * Starts the floating animation.
   */
  startFloating(): void {
    setInterval(() => {
      this.floatState = this.floatState === 'start' ? 'end' : 'start';
    }, 3000);
  }

  /**
   * Retrieves the list of tasks.
   */
  getTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data.map(task => ({ ...task, isEditing: false }));
    });
  }

  /**
   * Creates a new task.
   *
   * @param form the form containing the task details
   */
  createTask(form: NgForm): void {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.getTasks();
      this.newTask = { title: '', description: '', deadline: '' };
      form.resetForm();
    });
  }

  /**
   * Updates an existing task.
   *
   * @param task the task to update
   */
  updateTask(task: any): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  /**
   * Deletes a task by ID.
   *
   * @param id the ID of the task to delete
   */
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  /**
   * Marks a task as completed.
   *
   * @param task the task to mark as completed
   */
  completeTask(task: any): void {
    task.completed = true;
    this.updateTask(task);
  }

  /**
   * Filters the tasks based on the selected filter.
   *
   * @return the filtered list of tasks
   */
  filterTasks(): any[] {
    if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    } else if (this.filter === 'complete') {
      return this.tasks.filter(task => task.completed);
    } else {
      return this.tasks;
    }
  }

  /**
   * Enables editing mode for a task.
   *
   * @param task the task to edit
   */
  enableEdit(task: any): void {
    task.isEditing = true;
  }

  /**
   * Saves the edited task.
   *
   * @param task the task to save
   */
  saveEdit(task: any): void {
    task.isEditing = false;
    this.updateTask(task);
  }

  /**
   * Cancels the editing mode for a task.
   *
   * @param task the task to cancel editing
   */
  cancelEdit(task: any): void {
    this.getTasks();
  }

  /**
   * Gets the CSS class for the task deadline.
   *
   * @param deadline the deadline of the task
   * @param complete the completion status of the task
   * @return the CSS class for the deadline
   */
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
