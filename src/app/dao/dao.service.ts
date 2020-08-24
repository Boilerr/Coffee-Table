import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Inbox} from '../dto/inbox';
import {Task} from '../dto/task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  // This is place If you want change Source: DB, in memory DB, File, Public API, etc
  private dailylogUrl = 'http://localhost:8080/dailylog';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  getDailylog(): Observable<Dailylog[]> {
    return this.http.get<Dailylog[]>(this.dailylogUrl)
      .pipe(
        tap(_ => console.log('fetched Dailylog')),
        catchError(this.handleError<Inbox[]>('getDailylog', []))
      );
  }// need more simplified return of date from DB


  addDailylog(msg: Dailylog): Observable<Dailylog> {
    return this.http.post<Dailylog>(this.dailylogUrl, msg, this.httpOptions)
      .pipe(
        tap((newDailylog: Dailylog) => console.log(`added dailylog w/ id=${newDailylog.timestamp}`)),
        catchError(this.handleError<Inbox>('addDailylog'))
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
}
