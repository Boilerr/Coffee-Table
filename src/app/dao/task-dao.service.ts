import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Task} from '../dto/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../dto/project';

/** This is DAO for Task endpoints */
@Injectable({
  providedIn: 'root'
})
export class TaskDaoService {
  // This is place If you want change Source: DB, in memory DB, File, Public API, etc
  private taskUrl = 'http://localhost:8080/tasks';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  /** Create
   * see project-dao.service.ts
   */

  /** Read */

  getTask(taskId: number): Observable<Task> {
    const url = `${this.taskUrl}/${taskId}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => console.log(`fetched task id=${taskId}`)),
        catchError(this.handleError<Task>(`getTask id=${taskId}`))
      );
  }

  getTasksByTag(tag: string): Observable<Task[]> {
    const data = {tag};
    return this.http.get<Task[]>(this.taskUrl, {params: data})
      .pipe(
        tap(_ => console.log(`fetched tasks by tag id=${data.tag}`)),
        catchError(this.handleError<Task>(`getTasksByTag id=${data.tag}`))
      );
  }

  /** Update */

  updateTask(task: Task): Observable<any> {
    const url = `${this.taskUrl}/${task.id}`;
    return this.http.put(url, task, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task id=${task.id}`)),
        catchError(this.handleError<any>('updateTask'))
      );
  }

  /** Delete */

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.taskUrl}/${task.id}`;
    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted task id=${task.id}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  /** End of CRUD */

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
