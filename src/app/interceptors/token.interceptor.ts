import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
   if (request.context.get(CHECK_TOKEN)){
    return this.addToken(request, next)
   }
   else {return next.handle(request)}
    
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const token = this.tokenService.getToken()
    if(token){
      const authRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
      return next.handle(authRequest)  
    }else{ return next.handle(request)}
    // si no hay token manda la solicitud normal
  }
}
