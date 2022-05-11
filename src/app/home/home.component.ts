import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/movie.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  
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
    private http: HttpClient,
    private handler: HttpBackend,) {
      this.httpClient = new HttpClient(handler);
    } 

    
    

  ngOnInit() {
    this.service.userInfo();
    this.serviceM.getViewedMovie();
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
    this.router.navigate(['home']);
    this.movies$ = this.serviceM.searchMovie(this.query);
  }

  refresh(){
    this.router.navigate(['home'])
    .then(() => {
      window.location.reload();
    });
  }

  saveToBase(data: any) {
    this.serviceM.postMovie(data).subscribe(
      res => {
        this.toastr.success('Success!')
      },
      err => { console.log(err); }
    );
  }

  saveViewedToBase(data: any) {
    this.serviceM.postViewedMovie(data).subscribe(
      res => {
        this.toastr.success('Success!')
      },
      err => { console.log(err); }
    );
  }
  
}
