/**
 * MovieCardComponent renders the Movie Cards.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService, User } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  filteredMovies: any[] = [];
  genres: string[] = [];
  Favourites: string[] = [];
  loading = true;

  search = '';
  activeGenre: string | null = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  /**
   * Retrieves all the movies from the database
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any[]) => {
        this.movies = resp;
        this.genres = Array.from(new Set(resp.map((m) => m.Genre.Name))).sort();
        this.loading = false;
        this.applyFilters();
      },
      (message: string) => {
        this.loading = false;
        this.snackBar.open(message, 'OK', { duration: 5000 });
      }
    );
  }

  /**
   * Narrows the grid by the search text (title or director) and the selected genre.
   * @function applyFilters
   */
  applyFilters(): void {
    const q = this.search.trim().toLowerCase();
    this.filteredMovies = this.movies.filter((movie) => {
      if (this.activeGenre && movie.Genre.Name !== this.activeGenre) return false;
      if (!q) return true;
      return (
        movie.Title.toLowerCase().includes(q) ||
        movie.Director.Name.toLowerCase().includes(q)
      );
    });
  }

  /**
   * Selects a genre chip; clicking the active chip clears it.
   * @param genre {string | null}
   */
  setGenre(genre: string | null): void {
    this.activeGenre = this.activeGenre === genre ? null : genre;
    this.applyFilters();
  }

  clearFilters(): void {
    this.search = '';
    this.activeGenre = null;
    this.applyFilters();
  }

  /**
   * Opens a dialog containing info about the genre
   * @param Name {string}
   * @param Description {string}
   */
  openGenreCard(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '450px',
    });
  }

  /**
   * Opens a dialog containing info about the director
   * @param Name {string}
   * @param Bio {string}
   */
  openDirectorCard(Name: string, Bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio },
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
   * Get the favourite movies list of the user
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((user: User) => {
      this.Favourites = user.FavouriteMovies || [];
    });
  }

  /**
   * is movie already in favouritelist of user
   * @param id {string}
   * @returns true or false
   */
  isFavorite(id: string): boolean {
    return this.Favourites.includes(id);
  }

  /**
   * Adds or removes a favourite, then syncs the list from the API response.
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    const removing = this.isFavorite(movie._id);
    const request = removing
      ? this.fetchApiData.deleteFavouriteMovies(movie._id)
      : this.fetchApiData.addFavouriteMovies(movie._id);

    request.subscribe(
      (user: User) => {
        this.Favourites = user.FavouriteMovies || [];
        const text = removing
          ? `${movie.Title} was removed from your favourites.`
          : `${movie.Title} was added to your favourites.`;
        this.snackBar.open(text, 'OK', { duration: 3000 });
      },
      (message: string) => {
        this.snackBar.open(message, 'OK', { duration: 4000 });
      }
    );
  }
}
