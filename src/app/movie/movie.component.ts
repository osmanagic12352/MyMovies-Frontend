import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Movie, MovieDetail } from '../shared/models/movie.model';
import { UsersList } from '../shared/models/usersList.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: [
  ]
})
export class MovieComponent implements OnInit {
  movieDetils$!: Observable<MovieDetail>;

  constructor(
    private readonly route: ActivatedRoute,
    public serviceM: MovieService, 
    private toastr:ToastrService, 
    private jwtHelper: JwtHelperService) { }
  

  ngOnInit() {
    this.serviceM.getUsersList();

    this.showDetails();
  }

  showDetails(){
    this.movieDetils$ = this.route.queryParams.pipe(
      map(queryParams => queryParams["movieId"]),
      switchMap(imdbId => this.serviceM.getMovieDetails(imdbId))
    );
  }

  addToFavorite(imdbId: any) {
    this.serviceM.addFavorite(imdbId).subscribe(
      res => {
        this.toastr.success('Success!')
      },
      err => { console.log(err); }
    );
  }

  addToUsersList(id: any, imdbId: any) {
    this.serviceM.addUsersListMovie(id, imdbId).subscribe(
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
}
