import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Article } from "../model/article.model";
import { Favorite } from "../model/favorite.model";
import { SortTypes } from "../model/pagination.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    GetArticles(page: number, sortType: SortTypes, search: String): Observable<Article[]> {
        return this.SendRequest<Article[]>("GET", `${this.url}/article/${page}?sortType=${sortType}&search=${search}`);
    }

    GetArticle(articleId: number): Observable<Article> {
        return this.SendRequest<Article>("GET", `${this.url}/article/${articleId}`);
    }

    PostArticle(article: Article): Observable<Article> {
        return this.SendRequest<Article>("POST", `${this.url}/article/`, article);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        });
    }

}