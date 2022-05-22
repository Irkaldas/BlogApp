import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comment } from "./comment.model";
import { REST_URL } from "./articles.repository.model";

@Injectable()
export class CommentsRepository {
    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddComment(Comment: Comment): Observable<Comment> {
        return this.SendRequest<Comment>("PUT", `${this.url}/${Comment.id}`);
    }

    GetComments(articleId: number) {
        return this.SendRequest<Comment[]>("GET", `${this.url}/comments?postId=${articleId}`);
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
                throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }

}