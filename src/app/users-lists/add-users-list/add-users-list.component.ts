import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersList } from 'src/app/shared/models/usersList.model';
import { MovieService } from 'src/app/shared/movie.service';

@Component({
  selector: 'app-add-users-list',
  templateUrl: './add-users-list.component.html',
  styles: [
  ]
})
export class AddUsersListComponent implements OnInit {

  constructor(public service: MovieService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.service.addUsersList().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Success');
      },
      err => {
        console.log(err);
        this.toastr.error('Error');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new UsersList();
  }

}
