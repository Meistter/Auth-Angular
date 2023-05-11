import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router){}


  canActivate()
  {

    const isValidToken =  this.tokenService.isRefreshTokenValid() //ya no validamos con accesstoken si no con refresh token ya que el api nos da un refresh token q nos permite extender la sesion por esto la duracion maxima de un usuario en la web viene dada por la duracion del refresh token
    if(isValidToken){
      return true
    }else{
      
      this.router.navigate(['/login'])
      return false
    }
    
  }
  
}
