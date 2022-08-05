import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favorite } from "../model/favorite.model";
import { REST_URL } from "./articles.service";

@Injectable()
export class FavoritesService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    GetFavorites(): Observable<Favorite[]> {
        return this.SendRequest<Favorite[]>("GET", `${this.url}/`)
    }

    AddArticleToFavorites(favorite: Favorite): Observable<Favorite> {
        return this.SendRequest<Favorite>("POST", `$`);
    }

    RemoveArticleFromFavorites(id: number): Observable<any> {
        return this.SendRequest<any>("POST", `$`);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        });
    }

}