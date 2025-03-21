import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService {
  constructor(
  ) { }

  public login(token : string) {
    let tokenKey = localStorage.setItem("token", token);
    return tokenKey;
  }

  public logout() {
    const user = localStorage.getItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');    
  }

}
