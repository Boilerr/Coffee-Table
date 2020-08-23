import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Task} from '../dto/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../dto/project';

/** This is DAO for Project endpoints
 * This is place If you want change Source: DB, in memory DB, File, Public API, etc
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectDaoService {

  private projectsUrl = 'http://localhost:8080/projects';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  /** Create */

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions)
      .pipe(
        tap((newProject: Project) => console.log(`added project w/ id=${newProject.id}`)),
        catchError(this.handleError<Project>('addProject'))
      );

  }

  addTaskByProjectId(task: Task, projectId: number): Observable<Task> {
    const url = `${this.projectsUrl}/${projectId}/tasks`;
    return this.http.post<Task>(url, task, this.httpOptions)
      .pipe(
        tap((newProject: Task) => console.log(`added task w/ id=${newProject.id}`)),
        catchError(this.handleError<Task>('addTaskByProjectId'))
      );
  }

  /** Read */

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(_ => console.log('fetched getProjects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getProject(projectId: number): Observable<Project> {
    const url = `${this.projectsUrl}/${projectId}`;
    return this.http.get<Project>(url)
      .pipe(
        tap(_ => console.log(`fetched project id=${projectId}`)),
        catchError(this.handleError<Project>(`getProject id=${projectId}`))
      );
  }

  getTasksByProjectId(id: number): Observable<Task[]> {
    const url = `${this.projectsUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log(`fetched Task by Project id=${id}`)),
        catchError(this.handleError<Task>(`getTasksByProjectId id=${id}`))
      );
  }

  /** Update */

  updateProject(project: Project): Observable<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, project, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task id=${project.id}`)),
        catchError(this.handleError<Project>('updateProject'))
      );
  }

  /** Delete */

  deleteProject(project: Project): Observable<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete<Project>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted project id=${project.id}`)),
        catchError(this.handleError<Project>('deleteProject'))
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
