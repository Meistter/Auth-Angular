import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { HttpContextToken } from '@angular/common/http';
import { HttpContext } from '@angular/common/http';

// ! Con el check_token lo que estamos es creandole un contexto de forma que la validacion de que si hay o no token no se ejecute en cada request al servidor si no que desde el request le digamos que valide para usar el interceptor o si no le decimos el no usa interceptor por lo q tampoco mandara token

const CHECK_TOKEN = new HttpContextToken<boolean>(()=> false)

export function checkToken(){
  return new HttpContext().set(CHECK_TOKEN, true)
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Explicacion, lo que hacemos aqui es en las solicitudes donde el contexto este activado
    // vamos a validar si el token de acceso es valido, (recordemos que la sesion sigue abierta aun si no es valido ya que la sesion depende del refreshToken aqui)
    // si no es valido entonces ejecutamos el refrescamiento guardando los nuevos tokens, si es valido procedemos normal
   if (request.context.get(CHECK_TOKEN)){
   const isValidToken = this.tokenService.isValidToken()
   if(isValidToken){
    return this.addToken(request, next)
   }else{
    return this.updateAcessTokenAndRefreshToken(request,next)
   }
  }
   return next.handle(request)
    
  }
// añadir token
  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const token = this.tokenService.getToken()
    if(token){
      const authRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
      return next.handle(authRequest)  
    }else{ return next.handle(request)}
    // si no hay token manda la solicitud normal
  }

  private updateAcessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler){
    const refreshToken = this.tokenService.getRefreshToken()
    const isRefreshTokenValid = this.tokenService.isRefreshTokenValid()
    if(refreshToken && isRefreshTokenValid){
      return this.tokenService.refreshToken(refreshToken)
      .pipe(
        switchMap(()=> this.addToken(request,next))
      )
    } //Este metodo se trae el refreshToken, revisa que sea valido, si se cumplen ambas entonces manda el refreshToken a ejecutar, y guarda el access token y refreshToken con la funcion addToken
    return next.handle(request) //si no se cumple que sea valido el refreshToke o que no exista entonces manda la solicitud como venia originalmente
  }
}
