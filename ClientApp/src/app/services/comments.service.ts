import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comment } from "../model/comment.model";
import { REST_URL } from "./articles.service";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddComment(comment: Comment): Observable<Comment> {
        return this.SendRequest<Comment>("POST", `${this.url}/comment`, comment);
    }

    GetComments(articleId: number): Observable<Comment[]> {
        return this.SendRequest<Comment[]>("GET", `${this.url}/comment/${articleId}`);
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
    }
}