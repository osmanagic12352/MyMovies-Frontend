import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styles: [
  ]
})
export class MovieSearchComponent implements OnInit {

  @Input()
  movie!: Movie;
  src = true;

  constructor(public serviceM: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  saveToBase(data: any) {
    this.serviceM.postMovie(data).subscribe(
      res => {
        this.toastr.success('Success!')
      },
      err => { console.log(err); }
    );
  }
}
