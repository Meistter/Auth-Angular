import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  API = environment.API_URL

  login(email: string, password: string){
    return this.http.post(`${this.API}/api/v1/auth/login`,{email,password}) 
  }

  register(name:string, email: string, password: string){
    return this.http.post(`${this.API}/api/v1/auth/register`,{name,email,password})
  }
  registerAndLogin(name:string, email: string, password: string){
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
    )
  }
  isAvailable(email: string){
    return this.http.post<{isAvailable : boolean}>(`${this.API}/api/v1/auth/is-available`,{email})
  }
  // Aqui estamos usando tipado para recibir ayuda al usar el metodo en otro componente
}
