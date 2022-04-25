import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit1-user',
  templateUrl: './edit1-user.component.html',
  styles: [
  ]
})
export class Edit1UserComponent implements OnInit {

  constructor(
    public service: UserService, 
    private toastr: ToastrService, 
    private helper: JwtHelperService, 
    private router: Router, ) { }

  ngOnInit(): void {
  }

  populateForm(selectedRecord:User){
    this.service.formData = Object.assign({},selectedRecord);
}

  onDeleteUser(id:string){
    if(confirm('Da li siguran da želiš obrisati karticu korisnika?')){
        this.service.deleteUser(id)
            .subscribe(
                res =>{
                    this.service.userInfo()
                    this.toastr.success('Account deleted')
                    localStorage.removeItem('token')
                    this.router.navigate(['/'])
                    .then(() => {
                      window.location.reload();
                    });

        },
        err => {console.log(err)}
    )
    }
    
}

}
