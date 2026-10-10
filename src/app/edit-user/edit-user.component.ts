/**
 * The UserEditComponent is used to render information about the user and edit it.
 * @module UserEditComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService, User } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  private original: User | null = null;

  /**
   *  Binding input values to the userProfile object
   */
  userProfile = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchApiData.getUser().subscribe((user) => {
      this.original = user;
      this.userProfile = {
        Username: user.Username,
        Password: '',
        Email: user.Email,
        Birthday: user.Birthday || '',
      };
    });
  }

  /**
   * updates user information in API, sending only the fields that changed
   * @function editUser
   */
  editUser(): void {
    const changes: Record<string, string> = {};
    const { Username, Password, Email, Birthday } = this.userProfile;
    if (Username.trim() && Username.trim() !== this.original?.Username) changes['Username'] = Username.trim();
    if (Email.trim() && Email.trim() !== this.original?.Email) changes['Email'] = Email.trim();
    if (Birthday !== (this.original?.Birthday || '')) changes['Birthday'] = Birthday;
    if (Password) changes['Password'] = Password;

    if (!Object.keys(changes).length) {
      this.dialogRef.close(false);
      return;
    }

    this.fetchApiData.editUser(changes).subscribe(
      (user) => {
        localStorage.setItem('user', user.Username);
        if (user.token) localStorage.setItem('token', user.token);
        this.dialogRef.close(true);
        this.snackBar.open('Your profile was updated.', 'OK', { duration: 4000 });
      },
      (message: string) => {
        this.snackBar.open(message, 'OK', { duration: 4000 });
      }
    );
  }
}
