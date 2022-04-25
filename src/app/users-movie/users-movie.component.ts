import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserMovie } from '../shared/models/UserMovie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-users-movie',
  templateUrl: './users-movie.component.html',
  styles: [
  ]
})
export class UsersMovieComponent implements OnInit {

  constructor(public service: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.service.postUsersMovie().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Success');
      },
      err => {
        console.log(err);
        this.toastr.error('Error');
      }
    );
  }

  onSubmit1(form:NgForm){
    this.service.postMovie1().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Success');
      },
      err => {
        console.log(err);
        this.toastr.error('Error');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.uMovie = new UserMovie();
  }
}

