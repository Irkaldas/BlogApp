import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comment } from "./comment.model";
import { REST_URL } from "./articles.repository.model";

@Injectable()
export class CommentsRepository {
    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddComment(comment: Comment): Observable<Comment> {
        return this.SendRequest<Comment>("POST", `${this.url}/comments`, comment);
    }

    GetComments(articleId: number) {
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