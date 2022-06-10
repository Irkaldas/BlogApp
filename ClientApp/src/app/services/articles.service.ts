import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Article } from "../model/article.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class ArticlesService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddArticle(article: Article): Observable<Article> {
        return this.SendRequest<Article>("PUT", `${this.url}/${article.id}`);
    }

    GetArticles(): Observable<Article[]> {
        return this.SendRequest<Article[]>("GET", `${this.url}/articles`);
    }

    GetArticle(articleId: number): Observable<Article> {
        return this.SendRequest<Article>("GET", `${this.url}/articles/${articleId}`);
    }

    UpdateArticle(article: Article) {
        return this.SendRequest<Article>("PUT", `${this.url}/${article.id}`);
    }

    DeleteArticle(articleId: number) {
        return this.SendRequest<Article>("DELETE", `${this.url}/${articleId}`)
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(catchError((error: Response) =>
                throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }

}