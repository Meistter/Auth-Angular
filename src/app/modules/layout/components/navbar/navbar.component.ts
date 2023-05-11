import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@models/user.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  //? user: User | null = null
  user$ = this.userService.user$
  //! Para poder usar este observable en el HTML debemos suscribirnos de forma asincrona en el html, ver ejemplo
  // ! Existe otro metodo y es suscribirnos al observable desde el typescript y llenar la variable user, podemos verlo en users/pages/data-source
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  // ?Aqui un ejemplo de la otra forma de trabajar (MEJOR) sin hacer cambios al HTML
  // ngOnInit(){
  //   this.userService.user$.subscribe(rsp=>{this.user = rsp})
  // }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
