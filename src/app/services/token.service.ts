import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie} from 'typescript-cookie'
// esto lo usaremos para el manejo del token en cookies
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    // localStorage.setItem('token', token)
    setCookie('token-trello', token, {expires: 365, path:'/'})
                                              // tiempo de expiracion en dias y el path es para que ruta estara disponible la cookie, en este caso para todas las rutas
  }

  getToken(){
    // const token = localStorage.getItem('token')
    const token = getCookie('token-trello')
    return token
  }
  
  removeToken(){
    // localStorage.removeItem('token')
    removeCookie('token-trello')
  }
}
