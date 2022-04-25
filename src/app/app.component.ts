import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { Movie } from './shared/models/movie.model';
import { MovieService } from './shared/movie.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'MyMovies-Frontend';
  opened = false;
  movieSrc: any;
  private httpClient: HttpClient;
  
  current: string= '';
  baseForString = "http://www.omdbapi.com/?s=";
  keyy = "&apikey=a4b678cd";
  searcTerm: string= '';
 
  query: string='';
  movies$!: Observable<Array<Movie>>;

  hideElement = false;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
 


  constructor(
    public router: Router, 
    private jwtHelper: JwtHelperService, 
    public service: UserService,
    public serviceM: MovieService,
    private toastr:ToastrService, 
    private http:HttpClient,
    private handler: HttpBackend,) {
      this.httpClient = new HttpClient(handler);
    } 

    
    

  ngOnInit() {
    this.service.userInfo();
    this.serviceM.getMovie();
   }

  
  onLogout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }

  get logedUser() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  getSearchResults() {
    this.movies$ = this.serviceM.searchMovie(this.query);
  }

  refresh(){
    this.router.navigate(['/'])
    .then(() => {
      window.location.reload();
    });
  }

  
  
}