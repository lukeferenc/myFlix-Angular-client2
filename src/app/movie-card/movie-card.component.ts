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

  openGenreCard(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name,
        Description,
      },
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
}