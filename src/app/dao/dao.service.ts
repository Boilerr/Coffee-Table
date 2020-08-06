import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Inbox} from '../dto/inbox';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InboxService} from './inbox.service';
import {Reference} from '../dto/reference';

/**
 * This is main DAO, including Commands Log
 */
@Injectable({
  providedIn: 'root'
})
export class DaoService {

  private inboxUrl = 'api/inbox';  // URL to web api
  private referenceUrl = 'api/reference';  // URL to web api

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
  getInboxes(): Observable<Inbox[]> {
    return this.http.get<Inbox[]>(this.inboxUrl)
      .pipe(
        tap(_ => console.log('fetched inbox')),
        catchError(this.handleError<Inbox[]>('getInbox', []))
      );
  }

  getInbox(id: number): Observable<Inbox> {
    const url = `${this.inboxUrl}/${id}`;
    return this.http.get<Inbox>(url).pipe(
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

  /**
   * Send Http PUT to server, for update inbox message
   */
  updateInbox(inbox: Inbox): Observable<any> {
    return this.http.put(this.inboxUrl, inbox, this.httpOptions).pipe(
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
    return this.http.post<Reference>(this.referenceUrl, msg, this.httpOptions).pipe(
      tap((newReference: Reference) => console.log(`added inbox w/ id=${newReference.id}`)),
      catchError(this.handleError<Inbox>('addInbox'))
    );

  }

  /**
   * Send Http DELETE to server, for delete reference message
   */
  deleteReference(msg: Reference | number): Observable<Reference> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.referenceUrl}/${id}`;

    return this.http.delete<Reference>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted reference message id=${id}`)),
      catchError(this.handleError<Inbox>('deleteReference'))
    );
  }

  getReference(id: number): Observable<Reference> {
    const url = `${this.referenceUrl}/${id}`;
    return this.http.get<Reference>(url).pipe(
      tap(_ => console.log(`fetched reference id=${id}`)),
      catchError(this.handleError<Inbox>(`getReference id=${id}`))
    );
  }
  updateReference(reference: Reference): Observable<any> {
    return this.http.put(this.referenceUrl, reference, this.httpOptions).pipe(
      tap(_ => console.log(`updated reference id=${reference.id}`)),
      catchError(this.handleError<any>('updateReference'))
    );
  }
}
