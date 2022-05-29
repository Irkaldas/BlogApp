import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Comment } from "./comment.model";
import { REST_URL } from "./articles.repository.model";

@Injectable()
export class CommentsRepository {
    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    public refreshComments$ = new Subject<void>();

    AddComment(comment: Comment): Observable<Comment> {
        return this.SendRequest<Comment>("POST", `${this.url}/comments`, comment)
            .pipe(
                tap(() => {
                    this.refreshComments$.next();
                })
            );
    }

    GetComments(articleId: number) {
        return this.SendRequest<Comment[]>("GET", `${this.url}/comments?articleId=${articleId}`);
    }

    GetComment(CommentId: number): Observable<Comment> {
        return this.SendRequest<Comment>("GET", `${this.url}/posts/${CommentId}`);
    }

    UpdateComment(Comment: Comment) {
        return this.SendRequest<Comment>("PUT", `${this.url}/${Comment.id}`);
    }

    DeleteComment(CommentId: number) {
        return this.SendRequest<Comment>("DELETE", `${this.url}/${CommentId}`)
    }

    SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(catchError((error: Response) =>
                throwError(`Error: ${error.statusText} ${error.status}`)));
    }
}