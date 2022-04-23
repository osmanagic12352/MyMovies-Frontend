import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { UsersList } from '../shared/models/usersList.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-users-lists',
  templateUrl: './users-lists.component.html',
  styles: [
  ]
})
export class UsersListsComponent implements OnInit {

  constructor(public service: MovieService, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.getUsersList();
  }

  getUsersListMovie(id: number){
    this.http.get(`http://localhost:5002/api/UsersListsMovies/getMovieFromList?id=${id}`).subscribe(
        (res) => {
          this.service.favList = res as Movie[];
          console.log(this.service.favList)
        },
        (err) => {
          console.log(err);
        } );
  }
}
