/**
 * UserRegistrationFormComponent is used to register a new user.
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * get input data of user and stores in userCredentials
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

  /**
   * call API endpoint to register a new user
   * @function userRegistration
   * @param userCredentials {object}
   * @return new users data in json format
   */

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(() => {
      this.dialogRef.close(true);
      this.snackBar.open('Account created — sign in to continue.', 'OK', {
        duration: 4000
      });
    }, (message: string) => {
      this.snackBar.open(message, 'OK', {
        duration: 4000
      });
    });
  }

  }