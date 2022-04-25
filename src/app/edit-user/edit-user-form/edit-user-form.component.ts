import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styles: [
  ]
})
export class EditUserFormComponent implements OnInit {

  constructor(public service:UserService, 
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  updateUser(form:NgForm){
    this.service.putUser().subscribe(
      res => {
        this.resetForm(form);
        this.service.listUsers();
        this.toastr.info('Users info changed!')

      },
      err => {console.log(err);}
    );
  }
  
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new User();
  }

}