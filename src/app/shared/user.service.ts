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
  readonly BaseURL = "http://localhost:5002/api/User/registerUser"
  
  
  postUser(){
    return this.http.post(this.BaseURL, this.formData);
  }

  putUser(){
    return this.http.put(`${'http://localhost:5002/api/User/editUser_ById'}/${this.formData.id}`, this.formData);
  }

  listUsers(){
    this.http.get('http://localhost:5002/api/User/getAllUsers').subscribe(
      (res) => {
        this.list = res as User[];
      },
      (err) => {
        console.log(err);
      });
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:5002/api/User/deleteUser_ById/' + id);
  }

  put1User(){
    return this.http.put(`${'http://localhost:5001/api/ApplicationUser/UpdateUser?password='}${this.formData.password}`, this.formData);
  }

  userInfo(){
    return this.http.get('http://localhost:5002/api/User/getLogedUser').subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  delete1User(id:string){
    return this.http.delete('http://localhost:5001/api/ApplicationUser/DeleteUser');
  }
}