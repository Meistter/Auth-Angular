import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
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
}
