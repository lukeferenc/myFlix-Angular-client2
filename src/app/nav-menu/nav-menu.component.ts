import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) {}

  ngOnInit(): void {}


  /**
   * Redirect to welcome screen.
   */

  moveToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Redirect to user profile.
   */

  moveToProfile(): void {
    this.router.navigate(['users']);
  }

  /**
   * log out user and clear localstorage. Then redirect to welcome screen.
   */
  
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}