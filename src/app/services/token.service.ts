import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie} from 'typescript-cookie'

// esto lo usaremos para el manejo del token en cookies

import  jwt_decode, {JwtPayload} from 'jwt-decode'
//  con esta libreria decodificaremos el token para obtener la fecha de expiracion


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
  saveRefreshToken(token: string){
    // localStorage.setItem('token', token)
    setCookie('refresh-token-trello', token, {expires: 365, path:'/'})
                                              // tiempo de expiracion en dias y el path es para que ruta estara disponible la cookie, en este caso para todas las rutas
  }

  getToken(){
    // const token = localStorage.getItem('token')
    const token = getCookie('token-trello')
    return token
  }

  getRefreshToken(){
    const token = getCookie('refresh-token-trello')
    return token
  }
  
  removeToken(){
    // localStorage.removeItem('token')
    removeCookie('token-trello')
  }

  removeRefreshToken(){
    // localStorage.removeItem('token')
    removeCookie('refresh-token-trello')
  }

  // esta funcion la estamos haciendo para que el guardian haga uso de ella, en vez de validar en el guardian si tiene token usamos esta funcion que valida si tiene token y si es valido
  isValidToken(){
    const token = this.getToken()
    if(!token){
      return false
    }else{
      // aqui decodificamos le token para obtener la fecha de expiracion, si esta expirado retornamos false lo que hara que el guardian no permita el ingreso
      const decodeToken = jwt_decode<JwtPayload>(token)
      if (decodeToken && decodeToken?.exp){
          const tokenDate = new Date(0)
          tokenDate.setUTCSeconds(decodeToken.exp)

          const actualDate = new Date()
          return tokenDate.getTime()  > actualDate.getTime()
      }
      return false
    }
  }

  isRefreshTokenValid(){
    const token = this.getRefreshToken()
    if(!token){
      return false
    }else{
      // aqui decodificamos le token para obtener la fecha de expiracion, si esta expirado retornamos false lo que hara que el guardian no permita el ingreso
      const decodeToken = jwt_decode<JwtPayload>(token)
      if (decodeToken && decodeToken?.exp){
          const tokenDate = new Date(0)
          tokenDate.setUTCSeconds(decodeToken.exp)

          const actualDate = new Date()
          return tokenDate.getTime()  > actualDate.getTime()
      }
      return false
    }
  }
}
