import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@models/user.models';
import { DataSourceUser } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(private userService: UserService) {
    this.dataSource.init([
      {
        id: 1,
        name: 'User 1',
        email: 'mail@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: 2,
        name: 'User 2',
        email: 'mail2@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      },
      {
        id: 3,
        name: 'User 3',
        email: 'mail3@mail.com',
        avatar: 'https://api.lorem.space/image/face?w=150&h=150'
      }
    ]);
  }

  ngOnInit(): void{
    this.userService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users)
    })
  }

}
