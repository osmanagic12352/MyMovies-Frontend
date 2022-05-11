import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userDetails: any;
  formData: User = new User();
  list: User[] = [];
  readonly BaseURL = "http://localhost:5002/api/user/registerUser"
  
  
  postUser(){
    return this.http.post(this.BaseURL, this.formData);
  }

  putUser(){
    return this.http.put(`${'http://localhost:5002/api/user/editUserById'}/${this.formData.id}`, this.formData);
  }

  listUsers(){
    this.http.get('http://localhost:5002/api/user/getAllUsers').subscribe(
      (res) => {
        this.list = res as User[];
      },
      (err) => {
        console.log(err);
      });
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:5002/api/user/deleteUserById/' + id);
  }

  put1User(){
    return this.http.put(`${'http://localhost:5002/api/user/updateUser?password='}${this.formData.password}`, this.formData);
  }

  userInfo(){
    return this.http.get('http://localhost:5002/api/user/getLogedUser').subscribe(
      (res) => {
        this.userDetails = res;
        console.log(res)
      },
      (err) =>{
        console.log(err);
      }
    );
  }
}