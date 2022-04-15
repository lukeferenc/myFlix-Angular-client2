import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class RemoveUserComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  deleteUser(): void {
    this.fetchApiData.removeUserProfile().subscribe(() => {
      this.snackbar.open(`${this.user} has been deleted`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }
}