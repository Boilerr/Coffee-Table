import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Inbox} from '../dto/inbox';
import {Task} from '../dto/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InboxService} from './inbox.service';
import {Reference} from '../dto/reference';
import {Dailylog} from '../dto/dailylog';
import {Project} from '../dto/project';

/** This is DAO
 * Place where created internal public api for access to external sources
 * This methods is point of access
 * This is place If you want change Source: DB, in memory DB, File, Public API, etc
 * Maybe divide one big DAO in small domain DAO
 */
@Injectable({
  providedIn: 'root'
})
export class DaoService {

  // URLs to web api
  // private inboxUrl = 'api/inbox';
  private inboxUrl = 'http://localhost:8080/inbox';
  private referenceUrl = 'http://localhost:8080/reference';
  private dailylogUrl = 'http://localhost:8080/dailylog';
  private taskUrl = 'http://localhost:8080/tasks';
  private projectsUrl = 'http://localhost:8080/projects';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private inboxService: InboxService) {
  }

  getProject(projectId: number): Observable<Project> {
    const url = `${this.projectsUrl}/${projectId}`;
    return this.http.get<Project>(url)
      .pipe(
      tap(_ => console.log(`fetched project id=${projectId}`)),
      catchError(this.handleError<Project>(`getProject id=${projectId}`))
    );
  }

  updateTask(task: Task): Observable<any> {
    const url = `${this.taskUrl}/${task.id}`;
    console.log('updateTask' + url);
    return this.http.put(url, task, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task id=${task.id}`)),
        catchError(this.handleError<any>('updateTask'))
      );
  }

  updateProject(project: Project): Observable<any> {
    const url = `${this.projectsUrl}/${project.id}`;
    console.log('updateProject' + url);
    return this.http.put(url, project, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task id=${project.id}`)),
        catchError(this.handleError<any>('updateProject'))
      );
  }

  /**
   * Send Http POST to server, for new Project
   */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions)
      .pipe(
        tap((newProject: Project) => console.log(`added project w/ id=${newProject.id}`)),
        catchError(this.handleError<Project>('addProject'))
      );

  }

  /**
   * Send Http POST to server, for new Task
   * @PostMapping("/projects/{projectId}/tasks")
   */
  addTask(task: Task, projectId: number): Observable<Task> {
    const url = `${this.projectsUrl}/${projectId}/tasks`;
    return this.http.post<Task>(url, task, this.httpOptions)
      .pipe(
        tap((newProject: Task) => console.log(`added task w/ id=${newProject.id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  getProjects(): any {
    return this.http.get(this.projectsUrl);
  }

  getTasksByProjectId(id: number): Observable<Task[]> {
    const url = `${this.projectsUrl}/${id}/tasks`;
    console.log(url);
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log(`fetched Task by Project id=${id}`)),
        catchError(this.handleError<Task>(`getTasksByProjectId id=${id}`))
      );
  }

  getTask(taskId: number): Observable<Task> {
    const url = `${this.taskUrl}/${taskId}`;
    console.log(url);
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => console.log(`fetched task id=${taskId}`)),
        catchError(this.handleError<Task>(`getTask id=${taskId}`))
      );
  }

  /**
   * Send Http GET to server, for get inbox messages
   */
  getInboxes(): Observable<Inbox[]> {
    return this.http.get<Inbox[]>(this.inboxUrl)
      .pipe(
        tap(_ => console.log('fetched inbox')),
        catchError(this.handleError<Inbox[]>('getInbox', []))
      );
  }

  getInbox(id: number): Observable<Inbox> {
    const url = `${this.inboxUrl}/${id}`;
    return this.http.get<Inbox>(url)
      .pipe(
      tap(_ => console.log(`fetched inbox id=${id}`)),
      catchError(this.handleError<Inbox>(`getInbox id=${id}`))
    );
  }

  /**
   * Send Http DELETE to server, for delete inbox message
   */
  deleteInbox(msg: Inbox | number): Observable<Inbox> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.inboxUrl}/${id}`;

    return this.http.delete<Inbox>(url, this.httpOptions)
      .pipe(
      tap(_ => console.log(`deleted inbox message id=${id}`)),
      catchError(this.handleError<Inbox>('deleteInbox'))
    );
  }

  /**
   * Send Http POST to server, for new inbox message
   */
  addInbox(msg: Inbox): Observable<Inbox> {
    return this.http.post<Inbox>(this.inboxUrl, msg, this.httpOptions)
      .pipe(
      tap((newInbox: Inbox) => console.log(`added inbox w/ id=${newInbox.id}`)),
      catchError(this.handleError<Inbox>('addInbox'))
    );

  }

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

  /**
   * Send Http PUT to server, for update inbox message
   */
  updateInbox(inbox: Inbox): Observable<any> {
    return this.http.put(this.inboxUrl, inbox, this.httpOptions)
      .pipe(
      tap(_ => console.log(`updated inbox id=${inbox.id}`)),
      catchError(this.handleError<any>('updateInbox'))
    );
  }

  /////// References

  /**
   * Send Http GET to server, for get references messages
   */
  getReferences(): Observable<Reference[]> {
    return this.http.get<Reference[]>(this.referenceUrl)
      .pipe(
        tap(_ => console.log('fetched references')),
        catchError(this.handleError<Inbox[]>('getReferences', []))
      );
  }

  /**
   * Send Http POST to server, for new references message
   */
  addReference(msg: Reference): Observable<Reference> {
    return this.http.post<Reference>(this.referenceUrl, msg, this.httpOptions)
      .pipe(
      tap((newReference: Reference) => console.log(`added reference w/ id=${newReference.id}`)),
      catchError(this.handleError<Reference>('addReference'))
    );

  }

  /**
   * Send Http DELETE to server, for delete reference message
   */
  deleteReference(msg: Reference | number): Observable<Reference> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.referenceUrl}/${id}`;

    return this.http.delete<Reference>(url, this.httpOptions)
      .pipe(
      tap(_ => console.log(`deleted reference message id=${id}`)),
      catchError(this.handleError<Inbox>('deleteReference'))
    );
  }

  getReference(id: number): Observable<Reference> {
    const url = `${this.referenceUrl}/${id}`;
    return this.http.get<Reference>(url)
      .pipe(
      tap(_ => console.log(`fetched reference id=${id}`)),
      catchError(this.handleError<Inbox>(`getReference id=${id}`))
    );
  }

  updateReference(reference: Reference): Observable<any> {
    return this.http.put(this.referenceUrl, reference, this.httpOptions)
      .pipe(
      tap(_ => console.log(`updated reference id=${reference.id}`)),
      catchError(this.handleError<any>('updateReference'))
    );
  }

  /////// Daily log

  /**
   * Send Http GET to server, for get references messages
   */
  getDailylog(): Observable<Dailylog[]> {
    return this.http.get<Dailylog[]>(this.dailylogUrl)
      .pipe(
        tap(_ => console.log('fetched Dailylog')),
        catchError(this.handleError<Inbox[]>('getDailylog', []))
      );
  }// need more simplified return of date from DB

  /**
   * Send Http POST to server, for new inbox message
   */
  addDailylog(msg: Dailylog): Observable<Dailylog> {
    return this.http.post<Dailylog>(this.dailylogUrl, msg, this.httpOptions)
      .pipe(
      tap((newDailylog: Dailylog) => console.log(`added dailylog w/ id=${newDailylog.timestamp}`)),
      catchError(this.handleError<Inbox>('addDailylog'))
    );

  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.taskUrl}/${task.id}`;
    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted task message id=${task.id}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  deleteProject(project: Project): Observable<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.delete<Project>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted project id=${project.id}`)),
        catchError(this.handleError<Project>('deleteProject'))
      );
  }
}
