import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Inbox} from '../dto/inbox';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InboxService} from './inbox.service';

/**
 * This is main DAO, including Commands Log
 */
@Injectable({
  providedIn: 'root'
})
export class DaoService {

  private inboxUrl = 'api/inbox';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private inboxService: InboxService) {
  }

  /**
   * Send Http GET to server, for get inbox messages
   */
  getInbox(): Observable<Inbox[]> {
    return this.http.get<Inbox[]>(this.inboxUrl)
      .pipe(
        tap(_ => console.log('fetched inbox')),
        catchError(this.handleError<Inbox[]>('getInbox', []))
      );
  }

  /**
   * Send Http DELETE to server, for delete inbox message
   */
  deleteInbox(msg: Inbox | number): Observable<Inbox> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.inboxUrl}/${id}`;

    return this.http.delete<Inbox>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted inbox message id=${id}`)),
      catchError(this.handleError<Inbox>('deleteInbox'))
    );
  }

  /**
   * Send Http POST to server, for new inbox message
   */
  addInbox(msg: Inbox): Observable<Inbox> {
    return this.http.post<Inbox>(this.inboxUrl, msg, this.httpOptions).pipe(
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
}
