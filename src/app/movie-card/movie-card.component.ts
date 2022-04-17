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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreCard(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name, Description },
      width: '450px',
    });
  }

  openDirectorCard(Name: string, Bio: string,): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio},
      width: '450px',
    });
  }

  openMovieView(Title: string, Description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { Title, Description },
      width: '450px',
    });
  }

  getFavouriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.Favourites = resp.FavouriteMovies;
      console.log(this.Favourites);
    });
  }

  addFavouriteMovies(id: string, title: string): void {
    this.fetchApiData.addFavouriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your Watchlist!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

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

  isFavorite(id: string): boolean {
    return this.Favourites.some((movie) => movie === id);
  }
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavouriteMovie(movie._id)
      : this.addFavouriteMovies(movie._id, movie.Title);
  }
  
}