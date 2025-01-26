import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

/**
 * Service for managing tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the list of tasks.
   *
   * @return an observable of the list of tasks
   */
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Creates a new task.
   *
   * @param task the task to create
   * @return an observable of the created task
   */
  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  /**
   * Updates an existing task.
   *
   * @param task the task to update
   * @return an observable of the updated task
   */
  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task);
  }

  /**
   * Deletes a task by ID.
   *
   * @param id the ID of the task to delete
   * @return an observable of the deletion result
   */
  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
