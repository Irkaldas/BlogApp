import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { User } from "oidc-client";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { REST_URL } from "./articles.service";

@Injectable()
export class AuthService {
    constructor(@Inject(REST_URL) private url: string,
        private http: HttpClient) { }

    Register(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/register`, user);
    }

    Signup(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/signup`, user);
    }

    GetUsers(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/users`, user);
    }

    Login(user: string, password: string): Observable<any> {
        return this.SendRequest("POST", `${this.url}/login`, { user, password });
    }

    Signin(user: User): Observable<User> {
        return this.SendRequest("POST", `${this.url}/signin`, user);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(catchError((error: Response) =>
                throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }
}