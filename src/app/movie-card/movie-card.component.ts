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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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

  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name,
        description,
      },
      width: '450px',
    });
  }

  openDirectorCard(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birthdate },
      width: '450px',
    });
  }

  openMovieView(name: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { name, description },
      width: '450px',
    });
  }
}