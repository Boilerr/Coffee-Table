import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Task} from '../dto/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Log} from '../dto/log';

/** This is DAO for Log endpoints */
@Injectable({
  providedIn: 'root'
})
export class LogDaoService {
  // This is place If you want change Source: DB, in memory DB, File, Public API, etc
  private logUrl = 'http://localhost:8080/log';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  /** Create */

  addLog(log: Log): Observable<Log> {
    return this.http.post<Log>(this.logUrl, log, this.httpOptions)
      .pipe(
        tap((newLog: Log) => console.log(`added log w/ id=${newLog.id}`)),
        catchError(this.handleError<Log>('addLog'))
      );

  }

  /*addTaskByLogId(task: Task, logId: number): Observable<Task> {
    const url = `${this.logUrl}/${logId}/tasks`;
    return this.http.post<Task>(url, task, this.httpOptions)
      .pipe(
        tap((newLog: Task) => console.log(`added task w/ id=${newLog.id}`)),
        catchError(this.handleError<Task>('addTaskByLogId'))
      );
  }*/

  /** Read */

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.logUrl)
      .pipe(
        tap(_ => console.log('fetched getLogs')),
        catchError(this.handleError<Log[]>('getLogs', []))
      );
  }

  getLog(logId: number): Observable<Log> {
    const url = `${this.logUrl}/${logId}`;
    return this.http.get<Log>(url)
      .pipe(
        tap(_ => console.log(`fetched log id=${logId}`)),
        catchError(this.handleError<Log>(`getLog id=${logId}`))
      );
  }

  /*getTasksByLogId(id: number): Observable<Task[]> {
    const url = `${this.logUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log(`fetched Task by Log id=${id}`)),
        catchError(this.handleError<Task>(`getTasksByLogId id=${id}`))
      );
  }*/

  /** Update */

  updateLog(log: Log): Observable<any> {
    const url = `${this.logUrl}/${log.id}`;
    return this.http.put(url, log, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated task id=${log.id}`)),
        catchError(this.handleError<Log>('updateLog'))
      );
  }

  /** Delete */

  deleteLog(log: Log): Observable<Log> {
    const url = `${this.logUrl}/${log.id}`;
    return this.http.delete<Log>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted log id=${log.id}`)),
        catchError(this.handleError<Log>('deleteLog'))
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
