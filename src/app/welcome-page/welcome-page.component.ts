import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styles: [
  ]
})
export class WelcomePageComponent implements OnInit {

  constructor(
    public router: Router, 
    private helper: JwtHelperService) {} 

  ngOnInit() {
    this.userAuth();
   }

  userAuth(){
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token) != null) {
      this.router.navigate(['home']);
    }
  }
}