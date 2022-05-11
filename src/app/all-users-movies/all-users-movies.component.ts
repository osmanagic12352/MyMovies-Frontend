import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { MovieDB } from '../shared/models/movie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-all-users-movies',
  templateUrl: './all-users-movies.component.html',
  styles: [
  ]
})
export class AllUsersMoviesComponent implements OnInit {

  isShow = true;

  constructor(
    public service: MovieService, 
    private http: HttpClient,
    private toastr:ToastrService, 
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.service.getAllUsersMovies();
  }

  getUsersMovies(id: any) {
    this.http.get('http://localhost:5002/api/movies/getMovieById/'+ id).subscribe(
      (res) => {
        this.service.requests = res as MovieDB;
        console.log(this.service.movie)
      },
      (err) => {
        console.log;
      });
  }

  addToFavorite(imdbId: any) {
    this.service.addFavorite(imdbId).subscribe(
      res => {
        this.toastr.success('Success!');
      },
      err => {
         console.log(err);
         this.toastr.error('Error!') }
    );
  }

  addToUsersList(id: any, imdbId: any) {
    this.service.addUsersListMovie(id, imdbId).subscribe(
      res => {
        this.toastr.success('Success!')
      },
      err => { console.log(err); }
    );
  }

  get logedUser() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
