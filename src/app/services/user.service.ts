import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = environment.API_URL
  constructor(private http:HttpClient, private tokenService: TokenService) { }

  // En este endpoint donde se consultan los usuarios es necesario enviar el token junto a la peticion por temas de seguridad
  // lo que estamos haciendo es implementar el envio de token en el header para poder acceder al endpoint
  getUsers(){
    const token = this.tokenService.getToken()
    return this.http.get<User[]>(`${this.API}/api/v1/users`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
