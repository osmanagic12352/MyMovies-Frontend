import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserMovie } from 'src/app/shared/models/UserMovie.model';
import { MovieService } from 'src/app/shared/movie.service';

@Component({
  selector: 'app-my-movies-form',
  templateUrl: './my-movies-form.component.html',
  styles: [
  ]
})
export class MyMoviesFormComponent implements OnInit {

  constructor(
    public service:MovieService, 
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  updateUserMovie(form:NgForm){
    this.service.putUserMovieDB().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Movie info changed!')

      },
      err => {console.log(err);}
    );
  }

  updateMovie(form:NgForm){
    this.service.putMovie().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Movie info changed!')

      },
      err => {console.log(err);}
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.uMovie = new UserMovie();
  }

}
