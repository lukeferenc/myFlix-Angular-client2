import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


const apiUrl = 'https://lukesmovies.herokuapp.com/';
export interface User {
  _id: string;
  FavouriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
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

  /**
   * Non-typed response extraction
   * @param res {any}
   * @returns response || empty object
   */

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

  /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
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
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError));
  }

  /**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to get a specific movie by title
   * @function geteMovie
   * @param Title
   * @returns a movie object in json format
   */

  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to get a director data by directors name
   * @function getDirector
   * @param Name
   * @returns directors data in json format
   */

  getDirector(directorName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + directorName, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  /**
   * call api endpoint to get genre data
   * @param Name
   * @returns genre data in json format
   */

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to get user information
   * @param username
   * @returns users information in json format
   */

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to edit user data
   * @param username
   * @param userCredentials
   * @returns updated user data in json format
   */

  editUser(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  public removeUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to get users list of favorite movies
   * @param username
   * @returns a list of the favorite movies of the user in json format
   */

  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * call api endpoint to add a movie to the favorite mobvielist of user
   * @param MovieID
   * @returns the favorite movielist of user in json format
   */

  addFavouriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${id}`, null, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  /**
   * call api endpoint to delete a favorite movie from the users favorite list
   * @param MovieID {any}
   * @returns updated user's information after removed a movie from the list in json format
   */

  deleteFavouriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * call api endpoint to delete the current user
   * @param username
   * @returns delete user profile
   */

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({Authorization: 'Bearer ' + token,}),
      }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }
}