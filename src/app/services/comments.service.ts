import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comment } from "../model/comment.model";
import { REST_URL } from "../model/articles.repository.model";

@Injectable()
export class CommentsService {

    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddComment(comment: Comment): Observable<Comment> {
        return this.SendRequest<Comment>("POST", `${this.url}/comments`, comment);
    }

    GetComments(articleId: number): Observable<Comment[]> {
        return this.SendRequest<Comment[]>("GET", `${this.url}/comments?articleId=${articleId}`);
    }

    GetComment(commentId: number): Observable<Comment> {
        return this.SendRequest<Comment>("GET", `${this.url}/comments/${commentId}`);
    }

    UpdateComment(comment: Comment) {
        return this.SendRequest<Comment>("PUT", `${this.url}/${comment.id}`);
    }

    DeleteComment(commentId: number) {
        return this.SendRequest<Comment>("DELETE", `${this.url}/${commentId}`)
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(catchError((error: Response) =>
                throwError(`Error: ${error.statusText} ${error.status}`)));
    }
}