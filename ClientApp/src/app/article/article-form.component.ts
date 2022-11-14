import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '../ckeditor-classic-custom-build/build/ckeditor.js';
import { REST_URL } from '../services/articles.service.js';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  public Editor = ClassicEditor;

  private url: string = "https://localhost:7095/api/image";

  public config = {
    placeholder: 'Write your article here!',
    simpleUpload: {
      uploadUrl: this.url
    },
    imageRemoveEvent: {
      callback: (imagesSrc: any, nodeObjects: any) => {
        // note: imagesSrc is array of src & nodeObjects is array of nodeObject
        // node object api: https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_node-Node.html
        this.http.request<any>("DELETE", `${imagesSrc[0]}`).subscribe(response => {
          console.log(response);
        });
      }
    }
  }

  ngOnInit(): void {
  }

}
