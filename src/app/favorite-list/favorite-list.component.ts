import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styles: [
  ]
})
export class FavoriteListComponent implements OnInit {

  constructor(public service: MovieService) { }

  ngOnInit(): void {
    this.service.getFavorite();
  }

}
