import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-application-2021.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Extract data response
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  // Handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError));
  }

  // API Call Login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError));
  }

  // API Call get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API Call get single movie endpoint
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API Call get director endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  // API Call get genre endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API Call get user by username endpoint
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API Call get favourite movies list endpoint
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API Call add movie to favourite movies list endpoint
  addFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post(apiUrl + `users/${username}/movies/${id}`, null, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  // API Call delete movie from favourite movies list endpoint
  deleteFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }

  // API Call update user information endpoint
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  // API Call delete user information endpoint
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }
}