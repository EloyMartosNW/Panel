
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthInterceptorService } from './auth.interceptor';
import { AuthService } from '../core/services/auth.service';

export const InterceptorService : HttpInterceptorFn = (req, next) => {

    const authToken = AuthService.getAuthToken();
    console.log(authToken);
    console.log(localStorage.getItem('user'));
    if (authToken) {
        const authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
  
        return next(authReq).pipe(
          catchError((error) => {
            if (error.status === 401) {
                AuthService.clearLocalStorage();
            }
            return throwError(error);
          })
        );
    }
  
    return next(req);
  
}
