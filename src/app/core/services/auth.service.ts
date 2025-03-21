import { environment } from './../../../environments/environment.prod';
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { of, tap } from "rxjs";
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';
import { User } from './../models/user.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: "root",
})

export class AuthService {

    constructor(
        private router: Router,
        private location: Location,
        private http: HttpClient
    ) { }

    login(email: string, password: string): Observable<string> {
        const data = {
          email,password
        }
        return this.http.post<{ user: string }>(
          environment.api.url + environment.api['login'],
          data
        ).pipe(
          map((response: any) => response)
        );
    }
    
    public async logout() {
        AuthService.clearLocalStorage();

        this.router.navigate(['/login'], { replaceUrl: true });
    }

    static clearLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static getAuthToken(): string | null{
        return localStorage.getItem('token');
    }

    static getAuthRol(): string | null{
        return localStorage.getItem('rol');
    }
}
