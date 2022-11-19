import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BehaviorSubject, } from "rxjs";
import { take } from "rxjs/operators";
import * as ClassicEditor from '../ckeditor-classic-custom-build/build/ckeditor.js';
import { Article } from "../model/article.model";
import { Tag } from "../model/tag.model";
import { REST_URL } from '../services/articles.service';
import { AppFormControl, AppFormGroup } from "../shared/app-form/app-form";
import { MaxTagValidator, MinTagValidator } from "../shared/validators/tag.validator";
import { AppState } from "../store/app.state";
import { selectUserId } from "../store/user/user.selectors";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  //private url: string = "https://localhost:7095/api/image";

  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string,
    private store: Store<AppState>
  ) { }

  public articleFormGroup: AppFormGroup = new AppFormGroup({});
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Write your article here!',
    simpleUpload: {
      uploadUrl: this.url + `/image`
    },
    imageRemoveEvent: {
      callback: (imagesSrc: any, nodeObjects: any) => {
        this.http.request<any>("DELETE", `${imagesSrc[0]}`).subscribe(response => {
          console.log(response);
        });
      }
    }
  }

  public editorData: string = "";
  public tags$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  private userId$ = this.store.select(selectUserId);

  ngOnInit(): void {
    this.articleFormGroup = new AppFormGroup({
      title: new AppFormControl("Title", "title", "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])),
      tags: new AppFormControl("Tags", "tags", "",
        Validators.compose([,
          MinTagValidator(2, this.tags$),
          MaxTagValidator(5, this.tags$)
        ])),
      body: new AppFormControl("Body", "body", "",
        Validators.compose([
          Validators.required,
        ]))
    })
  }

  tagListener(event: any): void {
    if (event.key == " ") {
      const nextTagToAdd = event.target.value.trim();
      const tags = [...this.tags$.value];

      if (!tags.find(t => t == nextTagToAdd) && nextTagToAdd.length > 0) {
        const updatedTags = [...tags, nextTagToAdd]
        this.tags$.next(updatedTags);
      }

      event.target.value = "";
    }
  }
  removeTag(index: number): void {
    const updatedTags = [...this.tags$.value];
    updatedTags.splice(index, 1);
    this.tags$.next(updatedTags);
  }
  addArticle(): void {
    if (this.articleFormGroup.valid &&
      this.editorData.length > 0 &&
      this.tags$.value.length > 0) {

      let newArticle: Article = {
        title: this.articleFormGroup.controls['title'].value,
        body: this.editorData
      }

      this.userId$.pipe(take(1)).subscribe(userId =>
        newArticle.userId = userId);

      let articleTags: Tag[] = [];
      this.tags$.value.forEach(t => {
        articleTags.push({
          name: t
        });
      });
    };

  }
}

