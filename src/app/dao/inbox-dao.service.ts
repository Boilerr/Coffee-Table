import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inbox} from '../dto/inbox';

/** This is DAO for Inbox endpoints */
@Injectable({
  providedIn: 'root'
})
export class InboxDaoService {
  // This is place If you want change Source: DB, in memory DB, File, Public API, etc
  private inboxUrl = 'http://localhost:8080/inbox';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }


  /** Create */

  addInbox(msg: Inbox): Observable<Inbox> {
    return this.http.post<Inbox>(this.inboxUrl, msg, this.httpOptions)
      .pipe(
        tap((newInbox: Inbox) => console.log(`added inbox w/ id=${newInbox.id}`)),
        catchError(this.handleError<Inbox>('addInbox'))
      );

  }

  /** Read */

  getInboxes(): Observable<Inbox[]> {
    return this.http.get<Inbox[]>(this.inboxUrl)
      .pipe(
        tap(_ => console.log('fetched inboxes')),
        catchError(this.handleError<Inbox[]>('getInboxes', []))
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

  /** Update */

  updateInbox(inbox: Inbox): Observable<any> {
    return this.http.put(this.inboxUrl, inbox, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated inbox id=${inbox.id}`)),
        catchError(this.handleError<any>('updateInbox'))
      );
  }

  /** Delete */

  deleteInbox(msg: Inbox | number): Observable<Inbox> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.inboxUrl}/${id}`;

    return this.http.delete<Inbox>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted inbox id=${id}`)),
        catchError(this.handleError<Inbox>('deleteInbox'))
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
