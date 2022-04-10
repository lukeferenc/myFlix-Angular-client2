import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss'],
})
export class GenreCardComponent implements OnInit {
  genre: any = this.data.name;

  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MatDialog)
    public data: {
      name: string;
      description: string;
    }
  ) {}

  ngOnInit(): void {}
}