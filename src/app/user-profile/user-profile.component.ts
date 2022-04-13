import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favMovies: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.fetchApiData.getUserProfile().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user;
    });
  }

  openEditUserDialog(): void {
    this.dialog.open(EditUserComponent, {
      width: '280px',
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '280px',
    });
  }

  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favMovies = res.filter((movie: any) => {
        return this.user.FavouriteMovies.includes(movie._id);
      });
      console.log(this.favMovies);
      return this.favMovies;
    });
  }

  deleteFavMovies(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open('Movie has been removed from favorite list', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favMovies;
    });
  }
}