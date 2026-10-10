import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8080/'
    : 'https://myflix-api-luke.onrender.com/';

export interface User {
  _id: string;
  FavouriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: string | null;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) };
  }

  private username(): string {
    return encodeURIComponent(localStorage.getItem('user') || '');
  }

  /**
   * Non-typed response extraction
   * @param res {any}
   * @returns response || empty object
   */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  /**
   * Turns an HTTP error into a message the UI can show.
   * The free Render instance sleeps when idle, so a network failure (status 0)
   * usually means it is still waking up.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Something went wrong; please try again later.';
    if (error.status === 0) {
      message = 'Can’t reach the server — it may be waking up. Try again in a few seconds.';
    } else if (error.error && typeof error.error.message === 'string') {
      message = error.error.message;
    }
    return throwError(() => message);
  }

  /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError));
  }

  /**
   * Calls the /login endpoint
   * @function userLogin
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError));
  }

  /**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to get user information
   * @returns users information in json format
   */
  getUser(): Observable<User> {
    return this.http.get(apiUrl + `users/${this.username()}`, this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to edit user data
   * @param userData only the fields that should change
   * @returns updated user data in json format, plus a fresh token
   */
  editUser(userData: object): Observable<User> {
    return this.http.put(apiUrl + `users/${this.username()}`, userData, this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to delete the current user
   * @returns delete user profile
   */
  public removeUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + `users/${this.username()}`, this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to add a movie to the favorite movielist of user
   * @param MovieID
   * @returns the updated user in json format
   */
  addFavouriteMovies(id: string): Observable<User> {
    return this.http.post(apiUrl + `users/${this.username()}/movies/${id}`, null, this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to delete a favorite movie from the users favorite list
   * @param MovieID {any}
   * @returns the updated user in json format
   */
  deleteFavouriteMovies(id: string): Observable<User> {
    return this.http.delete(apiUrl + `users/${this.username()}/movies/${id}`, this.authHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }
}
