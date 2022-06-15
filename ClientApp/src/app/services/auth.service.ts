import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { registrationResponse } from "../model/registrationResponse.model";
import { UserRegistration } from "../model/userRegistration.model";
import { REST_URL } from "./articles.service";

@Injectable()
export class AuthService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient) {
    }
    Register(user: UserRegistration): Observable<registrationResponse> {
        return this.SendRequest<registrationResponse>("POST", `${this.url}/auth/register`, user);
    }

    SendRequest<T>(method: string, url: string, body?: any): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(
                catchError((error: Response) =>
                    throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }
}