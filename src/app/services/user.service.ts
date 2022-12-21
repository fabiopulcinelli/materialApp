import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = 'http://localhost:8080/api/utente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listaUser: User[] = [
    { id: 1, nome: 'Alessio', cognome: 'Rossi', dataDiNascita: '10/06/1987' },
    { id: 2, nome: 'Mario', cognome: 'Gialli', dataDiNascita: '11/07/1990' }
  ];

  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]>{
    return this.http.get<User[]>(this.apiServer);
  }


  updateUser(user: User){
    return this.http.put<User>(this.apiServer, user, this.httpOptions).pipe(
      tap((upUser: User) => console.log(`updated User w/ id=${upUser.id}`)),
      catchError(this.handleError<User>('user'))
    );
  }

  deleteUser(idUser: number){
    const url = `${this.apiServer}/${idUser}`;
    return this.http.delete<User>(url).pipe(
      tap(_ => console.log(`fetched User id=${idUser}`)),
      catchError(this.handleError<User>(`user id=${idUser}`))
    );
  }

  aggiungiUser(user: User){
    return this.http.post<User>(this.apiServer, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }


  getUserById(idUser: number): Observable<User | null>{
    const url = `${this.apiServer}/${idUser}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched USer id=${idUser}`)),
      catchError(this.handleError<User>(`user id=${idUser}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
