import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {

  constructor(private router: Router, private helper: JwtHelperService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token)) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

