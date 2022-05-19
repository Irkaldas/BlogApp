import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Post } from "./post.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class PostsRepository {
    constructor(
        @Inject(REST_URL) private url: string,
        private http: HttpClient
    ) { }

    AddPost(post: Post): Observable<Post> {
        return this.SendRequest<Post>("PUT", `${this.url}/${post.id}`);
    }

    GetPosts() {
        console.log(`${this.url}/posts`);
        return this.SendRequest<Post[]>("GET", `${this.url}/posts`);
    }

    GetPost(postId: number): Observable<Post> {
        console.log(`${this.url}/posts`);
        return this.SendRequest<Post>("GET", `${this.url}/posts/${postId}`);
    }

    UpdatePost(post: Post) {
        return this.SendRequest<Post>("PUT", `${this.url}/${post.id}`);
    }

    DeletePost(postId: number) {
        return this.SendRequest<Post>("DELETE", `${this.url}/${postId}`)
    }

    private SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
        return this.http.request<T>(method, url, {
            body: body
        })
            .pipe(catchError((error: Response) =>
                throwError(`Błąd sieci: ${error.statusText} ${error.status}`)));
    }

}