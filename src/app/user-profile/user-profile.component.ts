/**
 * UserProfileComponent is used to view the user profile.
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService, User } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { EditUserComponent } from '../edit-user/edit-user.component';
import { RemoveUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: Partial<User> = {};
  FavouriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  /**
   * Loads the user first, then resolves their favourite ids against the catalog.
   * @function loadProfile
   */
  loadProfile(): void {
    this.fetchApiData
      .getUser()
      .pipe(
        switchMap((user) => {
          this.user = user;
          return this.fetchApiData.getAllMovies();
        })
      )
      .subscribe(
        (movies: any[]) => {
          const favIds = this.user.FavouriteMovies || [];
          this.FavouriteMovies = movies.filter((movie) => favIds.includes(movie._id));
        },
        (message: string) => {
          this.snackBar.open(message, 'OK', { duration: 4000 });
        }
      );
  }

  /**
   * open a dialog to edit the profile of the user
   */
  openEditUserDialog(): void {
    this.dialog
      .open(EditUserComponent, { width: '340px' })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) this.loadProfile();
      });
  }

  /**
   * open a dialog to confirm deleting the profile
   */
  openDeleteUserDialog(): void {
    this.dialog.open(RemoveUserComponent, {
      width: '320px',
    });
  }

  /**
   * use API end-point to remove user favourite
   * @function deleteFavouriteMovie
   * @param movie {any}
   */
  deleteFavouriteMovie(movie: any): void {
    this.fetchApiData.deleteFavouriteMovies(movie._id).subscribe(
      () => {
        this.FavouriteMovies = this.FavouriteMovies.filter((m) => m._id !== movie._id);
        this.snackBar.open(`${movie.Title} was removed from your favourites.`, 'OK', {
          duration: 3000,
        });
      },
      (message: string) => {
        this.snackBar.open(message, 'OK', { duration: 4000 });
      }
    );
  }
}
