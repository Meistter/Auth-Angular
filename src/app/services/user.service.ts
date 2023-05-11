import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.models';
import { BehaviorSubject, tap } from 'rxjs';
import { checkToken} from '@interceptors/token.interceptor'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = environment.API_URL
  user$ = new BehaviorSubject<User | null>(null)

  // ! Estamos poniendo al usuario como un observable para mantener el estado en toda la aplicacion!  de forma que cualquier componente en cualquier momento tenga a su disposicion los datos del usuario
// ! Este estado lo estamos llenando la primera vez que carga la aplicacion, en el layaout ya que carga 1 vez cuando se inicia sesion!
// ! Si no estuvieramos iniciando sesion seria buena opcion cargarlo en el appComponent
  constructor(private http:HttpClient, private tokenService: TokenService) { }

  // En este endpoint donde se consultan los usuarios es necesario enviar el token junto a la peticion por temas de seguridad
  // lo que estamos haciendo es implementar el envio de token en el header para poder acceder al endpoint
  getUsers(){
    
    return this.http.get<User[]>(`${this.API}/api/v1/users`, {context: checkToken()})
    // el token ahora lo envia el interceptor
  }

  getProfile(){
    
    return this.http.get<User>(`${this.API}/api/v1/auth/profile`, {context: checkToken()})
    .pipe(
      tap(response => {
        this.user$.next(response)
      }) //Aqui le estamos indicando que una vez se obtenga el perfil por primera vez llene el observable del usuario para asi mantener el estado en la aplicación
    )
  }



}
