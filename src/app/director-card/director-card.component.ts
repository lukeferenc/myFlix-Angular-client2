import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss'],
})
export class DirectorCardComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MatDialog)
    public data: {
      name: string;
      bio: string;
      birthdate: Date;
    }
  ) {}

  ngOnInit(): void {}
}
