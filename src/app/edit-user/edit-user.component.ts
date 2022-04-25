import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
  ]
})
export class EditUserComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.listUsers();
  }

  populateForm(selectedRecord: User) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: string) {
    if (confirm('Do you want to delete this user?')) {
      this.service.deleteUser(id)
        .subscribe(
          res => {
            this.service.listUsers();
            this.toastr.success('Delete successfuly');
          },
          err => { console.log(err) }
        )
    }
  }

}
