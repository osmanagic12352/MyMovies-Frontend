import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserMovie } from '../shared/models/UserMovie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styles: [
  ]
})
export class MyMoviesComponent implements OnInit {

  constructor(public service: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getUsersMoviesDB();
  }

  populateForm(selectedRecord:UserMovie){
    this.service.uMovie = Object.assign({},selectedRecord);
}

  onDeleteMovie(imdbId:string){
    if(confirm('Are you sure, that you want to delete your movie?')){
        this.service.deleteUsersMovie(imdbId)
            .subscribe(
               res =>{
                    this.toastr.success('Movie deleted!')
        },
        err => {console.log(err)}
    )
  }
  
}

deleteMovies(imdbId:string){
  if(confirm('Are you sure, that you want to delete your movie?')){
      this.service.deleteMovie(imdbId)
          .subscribe(
             res =>{
                  this.toastr.success('Movie deleted!')
      },
      err => {console.log(err)}
  )
}

}

}
