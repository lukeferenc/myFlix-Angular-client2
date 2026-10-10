import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class RemoveUserComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  deleteUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.removeUserProfile().subscribe(
      () => {
        localStorage.clear();
        this.dialogRef.close();
        this.snackbar.open(`${user} has been deleted.`, 'OK', { duration: 4000 });
        this.router.navigate(['welcome']);
      },
      (message: string) => {
        this.snackbar.open(message, 'OK', { duration: 4000 });
      }
    );
  }
}
