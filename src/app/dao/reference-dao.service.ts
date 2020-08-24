import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inbox} from '../dto/inbox';
import {Reference} from '../dto/reference';

/** This is DAO for Reference endpoints */
@Injectable({
  providedIn: 'root'
})
export class ReferenceDaoService {
  // This is place If you want change Source: DB, in memory DB, File, Public API, etc
  private referenceUrl = 'http://localhost:8080/reference';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  /** Create */

  addReference(msg: Reference): Observable<Reference> {
    return this.http.post<Reference>(this.referenceUrl, msg, this.httpOptions)
      .pipe(
        tap((newReference: Reference) => console.log(`added reference w/ id=${newReference.id}`)),
        catchError(this.handleError<Reference>('addReference'))
      );

  }

  /** Read */

  getReferences(): Observable<Reference[]> {
    return this.http.get<Reference[]>(this.referenceUrl)
      .pipe(
        tap(_ => console.log('fetched references')),
        catchError(this.handleError<Inbox[]>('getReferences', []))
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

  /** Update */

  updateReference(reference: Reference): Observable<any> {
    return this.http.put(this.referenceUrl, reference, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated reference id=${reference.id}`)),
        catchError(this.handleError<any>('updateReference'))
      );
  }

  /** Delete */

  deleteReference(msg: Reference | number): Observable<Reference> {
    const id = typeof msg === 'number' ? msg : msg.id;
    const url = `${this.referenceUrl}/${id}`;

    return this.http.delete<Reference>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted reference message id=${id}`)),
        catchError(this.handleError<Inbox>('deleteReference'))
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
