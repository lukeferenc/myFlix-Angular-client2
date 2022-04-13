import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}