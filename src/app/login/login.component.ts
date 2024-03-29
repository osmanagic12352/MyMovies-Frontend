import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/login.service';
import { Login } from 'src/app/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public service: LoginService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit(): void {     
    
  }
  
  onSubmit(form:NgForm){
    this.service.postLogin().subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        this.toastr.success('Login success')
        this.router.navigate(['home'])
        .then(() => {
          window.location.reload();
        });
      },
      err => {
        console.log(err);
        this.toastr.error('Wrong username, or password!');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Login();
  }

}
