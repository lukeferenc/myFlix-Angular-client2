/**
 * The UserEditComponent is used to render information about the user and edit it.
 * @module UserEditComponent
 */

import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  Username = localStorage.getItem('username');
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   *  Binding input values to the userProfile object
   */

  @Input() userProfile = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * get user info
   */

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
    });
  }

  /**
   * updates user information in API
   * @function editUser
   * @param Username {any}
   * @param userProfile {any}
   * @return an updated user in json format
   */

  editUser(): void {
    this.fetchApiData.editUser(this.userProfile).subscribe((resp) => {
      this.dialogRef.close();

      localStorage.setItem('user', this.userProfile.Username);

      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
}
