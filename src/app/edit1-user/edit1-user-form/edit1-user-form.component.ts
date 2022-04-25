import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit1-user-form',
  templateUrl: './edit1-user-form.component.html',
  styles: [
  ]
})
export class Edit1UserFormComponent implements OnInit {

  constructor(public service:UserService, 
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  update1User(form:NgForm){
    this.service.put1User().subscribe(
      res => {
        this.resetForm(form);
        this.service.userInfo();
        this.toastr.info('Successfuly changed user info!')

      },
      err => {console.log(err);}
    );
  }
  
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new User();
  }

}