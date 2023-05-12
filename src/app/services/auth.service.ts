import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  API = environment.API_URL

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.API}/api/v1/auth/login`,{email,password}) 
    .pipe(
      tap(response=>{
        this.tokenService.saveToken(response.access_token)
        this.tokenService.saveRefreshToken(response.refresh_token)
      })
    )
  }

  register(name:string, email: string, password: string){
    return this.http.post(`${this.API}/api/v1/auth/register`,{name,email,password})
  }
  registerAndLogin(name:string, email: string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
      // usamos el switchMap para llamar otro metodo asincrono dentro de otro
    )
  }
  isAvailable(email: string){
    return this.http.post<{isAvailable : boolean}>(`${this.API}/api/v1/auth/is-available`,{email})
  }
  // Aqui estamos usando tipado para recibir ayuda al usar el metodo en otro componente

  recovery(email: string){
    return this.http.post(`${this.API}/api/v1/auth/recovery`,{email})
  }
  changePassword(newPassword: string, token: string){
    return this.http.post(`${this.API}/api/v1/auth/change-password`,{token, newPassword})
  }

  logout(){
    this.tokenService.removeToken();
  }

  
}
