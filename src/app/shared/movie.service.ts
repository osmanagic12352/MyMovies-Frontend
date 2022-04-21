import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http"
import { map, Observable } from 'rxjs';
import { Movie, MovieDetail } from './models/movie.model';
import { UsersList } from './models/usersList.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private httpClient: HttpClient;

  constructor(private http: HttpClient,
    private handler: HttpBackend,) {
    this.httpClient = new HttpClient(handler);
  }
  favList: Movie[] = [];
  usersList: UsersList[] = [];
  formData: UsersList = new UsersList();

  
  searchMovie(searchQuery: string): Observable<Array<Movie>> {
    return this.httpClient.get(`https://omdbapi.com/?apikey=a0559ed4&s=${searchQuery}`)
      .pipe(
        map((response: any) => response.Search)
      );
  }

  postMovie(data: any[]): Observable<any>{
    return this.http.post("http://localhost:5002/api/Movies/addMovie", data);
  }

  movieList(): Observable<any> {
    return this.http.get("http://www.omdbapi.com/?i=tt0121765&apikey=a0559ed4")
  }

  getMovieDetails(imdbId: string): Observable<MovieDetail | any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=a0559ed4&i=${imdbId}&plot=full`);
  }

  addFavorite(imdbId: string): Observable<any>{
    return this.http.post(`http://localhost:5002/api/Favorite/addFavorite?id=${imdbId}`, {});
  }

  getFavorite(){
    this.http.get('http://localhost:5002/api/Favorite/getUsersFavorite').subscribe(
        (res) => {
          this.favList = res as Movie[];
          console.log(this.favList)
        },
        (err) => {
          console.log;
        } );
  }

  addUsersList(): Observable<any>{
    return this.http.post('http://localhost:5002/api/UsersLists/addUsersList', this.formData);
  }

  addUsersListMovie(id: any, imdbId: string): Observable<any>{
    return this.http.post(`http://localhost:5002/api/UsersListsMovies/addMovieInList?id=${id}&imdbId=${imdbId}`, {});
  }

  getUsersList(){
    this.http.get('http://localhost:5002/api/UsersLists/getUsersLists_User').subscribe(
        (res) => {
          this.usersList = res as UsersList[];
          console.log(this.usersList)
        },
        (err) => {
          console.log;
        } );
      }

  getUsersListMovie(id: any){
    this.http.get(`http://localhost:5002/api/UsersListsMovies/getMovieFromList?id=${id}`).subscribe(
        (res) => {
          this.favList = res as Movie[];
          console.log(this.favList)
        },
        (err) => {
          console.log;
        } );
  }

}