import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie, MovieDB } from '../shared/models/movie.model';
import { UsersList } from '../shared/models/usersList.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-users-lists',
  templateUrl: './users-lists.component.html',
  styles: [
  ]
})
export class UsersListsComponent implements OnInit {

  constructor(public service: MovieService, private http: HttpClient, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getUsersList();
  }

  getUsersListMovie(id: number){
    this.http.get(`http://localhost:5002/api/UsersListsMovies/getMovieFromList?id=${id}`).subscribe(
        (res) => {
          this.service.requests = res as MovieDB;
          console.log(this.service.requests)
        },
        (err) => {
          console.log(err);
        } );
  }

  removeMovieList(id: number){
    this.service.deleteMovieList(id).subscribe(
      res => {
        res = id;
        console.log(id);
        this.toastr.success('Movie list Removed');
      },
      err => {
        console.log(err);
        this.toastr.error('Movie list not Removed');
      }
    )
  }

  removeMovieFromList(imdbId: any){
    this.service.deleteMovieFromList(imdbId).subscribe(
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
