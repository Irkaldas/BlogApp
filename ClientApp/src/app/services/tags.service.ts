import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Tag } from "../model/tag.model";
import { REST_URL } from './articles.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    @Inject(REST_URL) private url: string,
    private http: HttpClient) { }

  GetTags(): Observable<Tag[]> {
    return this.SendRequest<Tag[]>("GET", `${this.url}/tag`);
  }

  private SendRequest<T>(method: string, url: string, body?: T): Observable<T> {
    return this.http.request<T>(method, url, {
      body: body
    });
  }
}
