import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit{
  constructor(private userService: UserService) {}



  ngOnInit(){
    this.userService.getProfile().subscribe()
    // !Esto carga el estado del usuario logueado en el observable
    }

}

