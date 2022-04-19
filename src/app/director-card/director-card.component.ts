/**
 * DirectorCardComponent renders information about the directors.
 * @module DirectorCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss'],
})
/**
 *
 * @param data
 */
export class DirectorCardComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
    }

  ) {}

  ngOnInit(): void {}

}
