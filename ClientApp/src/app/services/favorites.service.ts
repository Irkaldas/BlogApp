import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favorite } from "../model/favorite.model";
import { REST_URL } from "./articles.service";

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    GetFavorites(userId: string): Observable<Favorite[]> {
        return this.http.request<Favorite[]>("GET", `${this.url}/favorite?userId=${userId}`);
    }

    AddArticleToFavorites(favorite: Favorite): Observable<Favorite> {
        return this.SendRequest<Favorite>("POST", `${this.url}/favorite/add`, favorite);
    }

    RemoveArticleFromFavorites(id: number): Observable<any> {
        return this.SendRequest<any>("POST", `${this.url}/favorite/remove/${id}`);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        });
    }

}