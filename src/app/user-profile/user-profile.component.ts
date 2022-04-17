import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EditUserComponent } from '../edit-user/edit-user.component';
import { RemoveUserComponent } from '../delete-user/delete-user.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  FavouriteMovies: any[] = [];
  Username = localStorage.getItem('user');

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavs();
    // this.getFavouriteMovies();
  }

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  openEditUserDialog(): void {
    this.dialog.open(EditUserComponent, {
      width: '300px',
    });
  }

  openDeleteUserDialog(): void {
    console.log("delete")
    this.dialog.open(RemoveUserComponent, {
      width: '280px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '280px',
    });
  }

  openDirectorDialog(name: string, bio: string, birthdate: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio, birth: birthdate },
      width: '300px',
    });
  }

  openMovieViewDialog(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }

  removeUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  getFavs(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavouriteMovies.includes(movie._id)) {
          this.FavouriteMovies.push(movie);
        }
        });
    }); 
  }

  deleteFavouriteMovie(MovieID: string): void {
    this.fetchApiData.deleteFavouriteMovies(MovieID).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Movie has been removed from favourites', 'OK', {
        duration: 2000,
      });
      // this.ngOnInit();
      location.reload();
      return this.FavouriteMovies;
    });
  }
}