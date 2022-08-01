import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Article } from "../model/article.model";
import { Favorite } from "../model/favorite.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class ArticlesService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    GetArticles(): Observable<Article[]> {
        return this.SendRequest<Article[]>("GET", `${this.url}/article`);
    }

    GetArticle(articleId: number): Observable<Article> {
        return this.SendRequest<Article>("GET", `${this.url}/article/${articleId}`);
    }

    AddArticleToFavorites(favorite: Favorite): Observable<Favorite | string> {
        return this.SendRequest<Favorite | string>("POST", `$`)
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
    }

}