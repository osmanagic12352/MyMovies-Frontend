import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styles: [
  ]
})
export class FavoriteListComponent implements OnInit {

  constructor(public service: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getFavorite1();
  }

  getDetails(imdbId: any){
    this.service.getMovieDetails(imdbId).subscribe(
      res => {
        res = imdbId;
        console.log(imdbId);
      },
      err => {
        console.log(err);
      }
    );
  }

  removeFavMovie(imdbId: any){
    this.service.deleteFavMovie(imdbId).subscribe(
      res => {
        res = imdbId;
        console.log(imdbId);
        this.toastr.success('Movie Removed');
      },
      err => {
        console.log(err);
        this.toastr.error('Movie not Removed');
      }
    )
  }
}
