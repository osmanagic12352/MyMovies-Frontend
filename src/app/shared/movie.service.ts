import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http"
import { map, Observable } from 'rxjs';
import { Movie, MovieDB, MovieDetail } from './models/movie.model';
import { UsersList } from './models/usersList.model';
import { UserMovie } from './models/UserMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private httpClient: HttpClient;

  constructor(private http: HttpClient,
    private handler: HttpBackend,) {
    this.httpClient = new HttpClient(handler);
  }
  requests: MovieDB;
  favList: Movie[];
  usersList: UsersList[] = [];
  mmovie:MovieDB[] = [];
  movie: MovieDB[] = [];
  movies: MovieDB[] = [];
  formData: UsersList = new UsersList();
  uMovie: UserMovie = new UserMovie();
  uMovies: UserMovie[] = [];
  userMovies: any;


  searchMovie(searchQuery: string): Observable<Array<Movie>> {
    return this.httpClient.get(`https://omdbapi.com/?apikey=a0559ed4&s=${searchQuery}`)
      .pipe(
        map((response: any) => response.Search)
      );
  }

  postMovie(data: any[]): Observable<any> {
    return this.http.post("http://localhost:5002/api/movies/addMovie", data);
  }

  postViewedMovie(data: any[]): Observable<any> {
    return this.http.post("http://localhost:5002/api/viewedMovies/addViewedMovie", data);
  }

  postMovie1() {
    return this.http.post("http://localhost:5002/api/movies/addMovie", this.uMovie);
  }

  postUsersMovie() {
    return this.http.post("http://localhost:5002/api/usersMovies/addUsersMovie", this.uMovie);
  }

  getMovie() {
    this.http.get('http://localhost:5002/api/movies/getAllMovies').subscribe(
      (res) => {
        this.movie = res as MovieDB[];
        console.log(this.movie)
      },
      (err) => {
        console.log;
      });
  }

  getViewedMovie() {
    this.http.get('http://localhost:5002/api/viewedMovies/getAllViewedMovies').subscribe(
      (res) => {
        this.movie = res as MovieDB[];
        console.log(this.movie)
      },
      (err) => {
        console.log;
      });
  }

  getAllUsersMovies() {
    this.http.get('http://localhost:5002/api/usersMovies/getAllUsersMovies').subscribe(
      (res) => {
        this.movies = res as MovieDB[];
        console.log(this.movies)
      },
      (err) => {
        console.log;
      });
  }

  getUsersMoviesDB() {
    this.http.get('http://localhost:5002/api/usersMovies/getUsersMoviesUser').subscribe(
      (res) => {
        this.uMovies = res as UserMovie[];
        console.log(this.uMovies)
      },
      (err) => {
        console.log;
      });
  }

  getAllUsersMoviesDB() {
    this.http.get('http://localhost:5002/api/usersMovies/getAllUsersMovies').subscribe(
      (res) => {
        this.uMovies = res as UserMovie[];
        console.log(this.uMovies)
      },
      (err) => {
        console.log;
      });
  }

  putUserMovieDB(){
    return this.http.put(`${'http://localhost:5002/api/usersMovies/editUsersMovieById'}/${this.uMovie.id}`, this.uMovie);
  }

  putMovie(){
    return this.http.put(`${'http://localhost:5002/api/movies/editMovieById'}/${this.uMovie.imdbId}`, this.uMovie);
  }
  

  movieList(): Observable<any> {
    return this.http.get("http://www.omdbapi.com/?i=tt0121765&apikey=a0559ed4")
  }

  getMovieDetails(imdbId: string): Observable<MovieDetail | any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=a0559ed4&i=${imdbId}&plot=full`)
  }

  addFavorite(imdbId: string): Observable<any> {
    return this.http.post(`http://localhost:5002/api/favorite/addFavorite?id=${imdbId}`, {});
  }

  getFavorite1() {
    return this.http.get('http://localhost:5002/api/favorite/getUsersFavorite').subscribe(
      (res) => {
        this.requests = res as MovieDB;
        console.log(this.requests)
      },
      (err) => {
        console.log(err);
      });
  }



  addUsersList(): Observable<any> {
    return this.http.post('http://localhost:5002/api/usersLists/addUsersList', this.formData);
  }

  addUsersListMovie(id: any, imdbId: string): Observable<any> {
    return this.http.post(`http://localhost:5002/api/usersListsMovies/addMovieInList?id=${id}&imdbId=${imdbId}`, {});
  }

  getUsersList() {
    this.http.get('http://localhost:5002/api/usersLists/getUsersListsUser').subscribe(
      (res) => {
        this.usersList = res as UsersList[];
        console.log(this.usersList)
      },
      (err) => {
        console.log(err);
      });
  }

  getUsersListMovie(id: any) {
    this.http.get(`http://localhost:5002/api/usersListsMovies/getMovieFromList?id=${id}`).subscribe(
      (res) => {
        this.favList = res as Movie[];
        console.log(this.favList)
      },
      (err) => {
        console.log(err);
      });
  }

  deleteFavMovie(id: string) {
    return this.http.delete('http://localhost:5002/api/favorite/deleteFavorite/' + id);
  }

  deleteMovieFromList(id: string) {
    return this.http.delete('http://localhost:5002/api/usersListsMovies/deleteMovieFromList/' + id);
  }

  

  deleteUsersMovie(id: number) {
    return this.http.delete('http://localhost:5002/api/usersMovies/deleteUsersMovieById/' + id);
  }

  deleteMovie(imdbId: string) {
    return this.http.delete('http://localhost:5002/api/movies/deleteMovieById/' + imdbId);
  }

  deleteMovieList(id: number) {
    return this.http.delete('http://localhost:5002/api/usersLists/deleteUsersListById/' + id);
  }

  
  
}