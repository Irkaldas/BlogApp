import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../model/user.model";
import { REST_URL } from "./articles.service";

@Injectable()
export class AuthService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient) {
        let token = localStorage.getItem("accessToken");
        this.isLoggedIn$.next(!!token);
    }

    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    Register(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/register`, user);
    }

    Login(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/login`, { email: user.email, password: user.password });
    }

    GetUsers(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/users`, user);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(
                catchError((error: Response) =>
                    throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }
}