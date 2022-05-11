import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Login } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  formData: Login = new Login();
  readonly BaseURL = "http://localhost:5002/api/login/login"
  
  postLogin(){
    return this.http.post(this.BaseURL, this.formData);
  }
}
