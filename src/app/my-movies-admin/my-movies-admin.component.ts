import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserMovie } from '../shared/models/UserMovie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-my-movies-admin',
  templateUrl: './my-movies-admin.component.html',
  styles: [
  ]
})
export class MyMoviesAdminComponent implements OnInit {

  constructor(public service: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getAllUsersMoviesDB();
  }

  populateForm(selectedRecord:UserMovie){
    this.service.uMovie = Object.assign({},selectedRecord);
}

  onDeleteMovie(id: number){
    if(confirm('Are you sure, that you want to delete your movie?')){
        this.service.deleteUsersMovie(id)
            .subscribe(
               res =>{
                    this.toastr.success('Movie deleted!')
        },
        err => {console.log(err)}
    )
  }
  
}

}
