/**
 * MovieCardComponent renders the Movie Cards.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  Favourites: any[] = [];
  user: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

   /**
   * Retrieves all the movies from the database
   * @function getAllMovies
   * @return movies in json format
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

   /**
   * Opens a dialog containing info about the genre
   * @param name {string}
   * @param description {string}
   */

  openGenreCard(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name, Description },
      width: '450px',
    });
  }

  /**
   * Opens a dialog containing info about the director
   * @param Name {string}
   * @param Bio {string}
   */

  openDirectorCard(Name: string, Bio: string,): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio},
      width: '450px',
    });
  }

   /**
   * Opens a dialog containing info about the movie
   * @param Title {string}
   * @param Description {string}
   */

  openMovieView(Title: string, Description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { Title, Description },
      width: '450px',
    });
  }

   /**
   * Get the favourite movieslist of the user
   */

  getFavouriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.Favourites = resp.FavouriteMovies;
      console.log(this.Favourites);
    });
  }

  /**
   * use API endpoint to let user add favorite movie
   * @function addFavouriteMovies
   * @param id {string}
   * @returns an array of the movie object in json format
   */

  addFavouriteMovies(id: string, title: string): void {
    this.fetchApiData.addFavouriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your Watchlist!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  /**
   * use API endpoint to remove user favourite
   * @function removeFavouriteMovie
   * @param Id {string}
   * @returns favourite movies has been updated in json format
   */

  removeFavouriteMovie(id: string): void {
    this.fetchApiData.deleteFavouriteMovies(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${id} has been removed from your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }
  
  /**
   * is movie already in favouritelist of user
   * @param id {string}
   * @returns true or false
   */

  isFavorite(id: string): boolean {
    return this.Favourites.some((movie) => movie === id);
  }

  /**
   * add or remove favourite movie
   * if the movie is not on the favourite list, call
   * @function addFavouriteMovies
   * if the movie is already on the user favourite list, call
   * @function removeFavouriteMovie
   * @param movie {any}
   */

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavouriteMovie(movie._id)
      : this.addFavouriteMovies(movie._id, movie.Title);
  }
  
}