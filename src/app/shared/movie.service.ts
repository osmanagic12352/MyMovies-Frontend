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
    return this.http.post("http://localhost:5002/api/Movies/addMovie", data);
  }

  postMovie1() {
    return this.http.post("http://localhost:5002/api/Movies/addMovie", this.uMovie);
  }

  postUsersMovie() {
    return this.http.post("http://localhost:5002/api/UsersMovies/addUsersMovie", this.uMovie);
  }

  getMovie() {
    this.http.get('http://localhost:5002/api/Movies/getAllMovies').subscribe(
      (res) => {
        this.movie = res as MovieDB[];
        console.log(this.movie)
      },
      (err) => {
        console.log;
      });
  }

  getAllUsersMovies() {
    this.http.get('http://localhost:5002/api/UsersMovies/getAllUsersMovies').subscribe(
      (res) => {
        this.movies = res as MovieDB[];
        console.log(this.movies)
      },
      (err) => {
        console.log;
      });
  }

  getUsersMoviesDB() {
    this.http.get('http://localhost:5002/api/UsersMovies/getUsersMovies_User').subscribe(
      (res) => {
        this.uMovies = res as UserMovie[];
        console.log(this.uMovies)
      },
      (err) => {
        console.log;
      });
  }

  getAllUsersMoviesDB() {
    this.http.get('http://localhost:5002/api/UsersMovies/getAllUsersMovies').subscribe(
      (res) => {
        this.uMovies = res as UserMovie[];
        console.log(this.uMovies)
      },
      (err) => {
        console.log;
      });
  }

  putUserMovieDB(){
    return this.http.put(`${'http://localhost:5002/api/UsersMovies/editUsersMovie_ById'}/${this.uMovie.id}`, this.uMovie);
  }

  putMovie(){
    return this.http.put(`${'http://localhost:5002/api/Movies/editMovie_ById'}/${this.uMovie.imdbId}`, this.uMovie);
  }
  

  movieList(): Observable<any> {
    return this.http.get("http://www.omdbapi.com/?i=tt0121765&apikey=a0559ed4")
  }

  getMovieDetails(imdbId: string): Observable<MovieDetail | any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=a0559ed4&i=${imdbId}&plot=full`)
  }

  addFavorite(imdbId: string): Observable<any> {
    return this.http.post(`http://localhost:5002/api/Favorite/addFavorite?id=${imdbId}`, {});
  }

  getFavorite1() {
    return this.http.get('http://localhost:5002/api/Favorite/getUsersFavorite').subscribe(
      (res) => {
        this.requests = res as MovieDB;
        console.log(this.requests)
      },
      (err) => {
        console.log(err);
      });
  }



  addUsersList(): Observable<any> {
    return this.http.post('http://localhost:5002/api/UsersLists/addUsersList', this.formData);
  }

  addUsersListMovie(id: any, imdbId: string): Observable<any> {
    return this.http.post(`http://localhost:5002/api/UsersListsMovies/addMovieInList?id=${id}&imdbId=${imdbId}`, {});
  }

  getUsersList() {
    this.http.get('http://localhost:5002/api/UsersLists/getUsersLists_User').subscribe(
      (res) => {
        this.usersList = res as UsersList[];
        console.log(this.usersList)
      },
      (err) => {
        console.log(err);
      });
  }

  getUsersListMovie(id: any) {
    this.http.get(`http://localhost:5002/api/UsersListsMovies/getMovieFromList?id=${id}`).subscribe(
      (res) => {
        this.favList = res as Movie[];
        console.log(this.favList)
      },
      (err) => {
        console.log(err);
      });
  }

  deleteFavMovie(id: string) {
    return this.http.delete('http://localhost:5002/api/Favorite/deleteFavorite/' + id);
  }

  deleteMovieFromList(id: string) {
    return this.http.delete('http://localhost:5002/api/UsersListsMovies/deleteMovieFromList/' + id);
  }

  

  deleteUsersMovie(imdbId: string) {
    return this.http.delete('http://localhost:5002/api/UsersMovies/deleteUsersMovie_ById/' + imdbId);
  }

  deleteMovie(imdbId: string) {
    return this.http.delete('http://localhost:5002/api/Movies/deleteMovie_ById/' + imdbId);
  }
  
}