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

export class UserService {

    constructor(
        private router: Router,
        private location: Location,
        private http: HttpClient
    ) { }

    getUsers( page : number = 1) {
        return this.http.get( environment.api.url + environment.api.users + '?page='+page);
    }

    updateUser(user: User) {
        return this.http.put(environment.api.url + environment.api.updateUser, user);
    }

    deleteUser(id: number) {
        return this.http.delete(environment.api.url + environment.api.deleteUser + id);
    }
}